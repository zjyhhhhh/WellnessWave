from datetime import datetime
import os
from bson import ObjectId
from fastapi import FastAPI, Body, HTTPException, Request, status
from dotenv import load_dotenv
import motor.motor_asyncio
from models import PostContentModel, PostModel, UserModel
from passlib.context import CryptContext
from pydantic import ConfigDict, BaseModel, Field, EmailStr
import jwt

load_dotenv()


def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(
        to_encode, os.environ["SECRET_KEY"], algorithm=os.environ["ALGORITHM"])
    return encoded_jwt


def decode_token(token: str):
    try:
        decoded_jwt = jwt.decode(
            token, os.environ["SECRET_KEY"], algorithms=[os.environ["ALGORITHM"]])
        return decoded_jwt
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("Token expired.")
    except jwt.JWTError as e:
        raise jwt.JWTError("Token is invalid.")


def serialize_document(document):
    if isinstance(document, list):
        return [serialize_document(item) for item in document]
    if isinstance(document, dict):
        return {key: serialize_document(value) for key, value in document.items()}
    if isinstance(document, ObjectId):
        return str(document)
    return document


# async def get_posts(load_more: bool, last_post_date: datetime = None, limit: int = 10):
#     query = {}
#     if load_more and last_post_date:
#         print(last_post_date)
#         query = {"postDate": {"$lt": last_post_date}}
#     cursor = postCollections.find(query).sort("postDate", -1).limit(limit)
#     posts = await cursor.to_list(length=limit)
#     for post in posts:
#         post["_id"] = str(post["_id"])
#     return posts

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])

db = client["WellnessWave"]
userCollections = db.get_collection("users")
postCollections = db.get_collection("posts")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    skip_paths = ["/users/login", "/users/register"]
    path = request.url.path

    if path not in skip_paths:
        token = request.headers.get("Authorization")
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

        try:
            payload = jwt.decode(
                token, os.environ["SECRET_KEY"], algorithms=[os.environ["ALGORITHM"]])
            request.state.username = payload["sub"]
        except jwt.PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    response = await call_next(request)
    return response


@app.post(
    "/users/register",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=True,
)
async def create_user(user: UserModel = Body(...)):
    user.hash_password()
    new_user = await userCollections.insert_one(user.model_dump(by_alias=True))
    created_user = await userCollections.find_one({"_id": new_user.inserted_id})

    if created_user:
        del created_user["password"]
    return created_user


@app.post(
    "/users/login",
    response_model=None,
    status_code=status.HTTP_200_OK,
    response_model_by_alias=True
)
async def login(email: EmailStr = Body(...), password: str = Body(...)):
    user_dict = await userCollections.find_one({"email": email})
    if not user_dict:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not pwd_context.verify(password, user_dict["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")

    token = create_access_token({"sub": user_dict["_id"]})
    return {"access_token": token, "token_type": "bearer"}

# post a new post


@app.post("/send_posts/", status_code=status.HTTP_201_CREATED)
async def create_post(request: Request, postContent: PostContentModel = Body(...)):
    username = getattr(request.state, 'username', None)
    user_dict = await userCollections.find_one({"_id": username})
    if not user_dict:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    post = PostModel(postContent=postContent, author=username)
    try:
        created_post = await postCollections.insert_one(post.model_dump(by_alias=True))
        # post.upload_imgageList_to_s3()
        return {"post_id": str(created_post.inserted_id)}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# get all posts


@app.get("/get_posts/", response_model_by_alias=True)
async def get_posts(last_post_date: datetime = None, limit: int = 10):
    # two types of get requests
    # refresh: get the latest posts, no page number is sent in the request
    # load more: get more posts, the page number is sent in the request
    query = {}
    if last_post_date:
        query = {"postDate": {"$lt": last_post_date}}
    cursor = postCollections.find(query).sort("postDate", -1).limit(limit)
    posts = await cursor.to_list(length=limit)
    for post in posts:
        post["_id"] = str(post["_id"])
    return {
        "posts": posts
    }
# get posts by username
# get followed posts by username
# get liked posts by username
