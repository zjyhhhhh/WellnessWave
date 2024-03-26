from datetime import datetime
import os
from bson import ObjectId
from fastapi import FastAPI, Body, HTTPException, Request, status, Query
from dotenv import load_dotenv
import motor.motor_asyncio
from models import PostContentModel, PostModel, UserModel, DietModel, SportsModel
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


app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])

db = client["WellnessWave"]
userCollections = db.get_collection("users")
postCollections = db.get_collection("posts")
dietCollections = db.get_collection("diets")
sportCollections = db.get_collection("sports")

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
            # request.state.username = payload["sub"]
            username = payload["sub"]
            user_dict = await userCollections.find_one({"_id": username})
            if not user_dict:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
            request.state.username = username
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

    del posts["comments"]

    return {
        "posts": posts
    }

# get a single post


@app.get("/get_post/{postId}", response_model_by_alias=True)
async def get_post(postId: str):
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    post["_id"] = str(post["_id"])
    return post

# comment


@app.post("/post_comments/{postId}",  status_code=status.HTTP_201_CREATED)
async def post_comment(request: Request, postId: str, comment: str = Body(...)):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    comment = {
        "author": username,
        "comment": comment,
        "commentDate": datetime.now()
    }
    await postCollections.update_one(
        {"_id": ObjectId(postId)}, {"$push": {"comments": comment}})
    return {"message": "Comment posted successfully."}


@app.get("/get_comments/{postId}", response_model_by_alias=True)
async def get_comments(postId: str):
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    comments = post.get("comments", [])
    return {"comments": comments}

# like


@app.post("/like/{postId}", status_code=status.HTTP_201_CREATED)
async def like_post(request: Request, postId: str):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    await postCollections.update_one({"_id": ObjectId(postId)}, {"$inc": {"likeCount": 1}})
    return {"message": "Post liked successfully."}


@app.post("/unlike/{postId}", status_code=status.HTTP_201_CREATED)
async def unlike_post(request: Request, postId: str):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    await postCollections.update_one({"_id": ObjectId(postId)}, {"$inc": {"likeCount": -1}})
    return {"message": "Post unliked successfully."}

# dislike


@app.post("/dislike/{postId}", status_code=status.HTTP_201_CREATED)
async def dislike_post(request: Request, postId: str):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    await postCollections.update_one({"_id": ObjectId(postId)}, {"$inc": {"dislikeCount": 1}})
    return {"message": "Post disliked successfully."}


@app.post("/undislike/{postId}", status_code=status.HTTP_201_CREATED)
async def undislike_post(request: Request, postId: str):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    await postCollections.update_one({"_id": ObjectId(postId)}, {"$inc": {"dislikeCount": -1}})
    return {"message": "Post undisliked successfully."}

# follow


@app.post("/follow/{userId}", status_code=status.HTTP_201_CREATED)
async def follow(request: Request, userId: str):
    follower = getattr(request.state, 'username', None)
    user = await userCollections.find_one({"_id": userId})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await userCollections.update_one({"_id": userId}, {"$push": {"followerList": follower}})
    await userCollections.update_one({"_id": follower}, {"$push": {"followingList": userId}})
    return {"message": "User followed successfully."}

# unfollow


@app.post("/unfollow/{userId}", status_code=status.HTTP_201_CREATED)
async def unfollow(request: Request, userId: str):
    follower = getattr(request.state, 'username', None)
    user = await userCollections.find_one({"_id": userId})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await userCollections.update_one({"_id": userId}, {"$pull": {"followerList": follower}})
    await userCollections.update_one({"_id": follower}, {"$pull": {"followingList": userId}})
    return {"message": "User unfollowed successfully."}

# get focus posts


@app.get("/get_focused_posts/", response_model_by_alias=True)
async def get_focused_posts(request: Request):
    username = getattr(request.state, 'username', None)
    user = await userCollections.find_one({"_id": username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    followingList = user.get("followingList", [])
    posts = await postCollections.find({"author": {"$in": followingList}}).sort("postDate", -1)
    for post in posts:
        post["_id"] = str(post["_id"])
    return {
        "posts": posts
    }

# get user profile


@app.get("/get_user_profile/{userId}", response_model_by_alias=True)
async def get_user_profile(userId: str):
    user = await userCollections.find_one({"_id": userId})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user["_id"] = str(user["_id"])
    return user


@app.post("/post_user_diet/", response_model_by_alias=True, status_code=status.HTTP_201_CREATED)
async def post_user_diet(diets_request: DietModel = Body(...)):
    username = getattr(diets_request, 'username', None)
    date = getattr(diets_request, 'log_date', None)

    diet_record = await dietCollections.find_one({"username": username, "log_date": date})

    if not diet_record:
        await dietCollections.insert_one(diets_request.model_dump(by_alias=True))
        return {"message": "Deit record successfully."}
    else:
        update_diets = diets_request.model_dump(by_alias=True)
        for meal in update_diets["diets"]:
            if update_diets["diets"][meal] != []:
                diet_record["diets"][meal] = update_diets["diets"][meal]

        await dietCollections.update_one({"username": username, "log_date": date}, {"$set":
                                                                                    diet_record
                                                                                    })
        return {"message": "Deit update successfully."}


@app.get("/get_user_diet/{date}", response_model_by_alias=True)
async def get_user_diet(date: str, request: Request):
    userId = getattr(request.state, 'username')
    formatted_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
    document = await dietCollections.find_one({"username": userId, "log_date": formatted_date})

    if document:
        document['_id'] = str(document['_id'])
        return document
    else:
        return {
            "username": userId,
            "log_date": formatted_date,
            "diets": {
                "breakfast": [],
                "lunch": [],
                "dinner": []
            }
        }


@app.get("/get_user_diets/", response_model_by_alias=True)
async def get_user_diet(request: Request):
    userId = getattr(request.state, 'username')
    cursor = dietCollections.find({"username": userId})
    documents = await cursor.to_list(length=None)
    if documents:
        documents_formatted = []
        for document in documents:
            document['_id'] = str(document['_id'])
            documents_formatted.append(document)
        return documents_formatted
    else:
        return []


@app.post("/post_user_sport/", response_model_by_alias=True, status_code=status.HTTP_201_CREATED)
async def post_user_diet(request: Request, sports_request: SportsModel = Body(...)):
    username = getattr(request.state, 'username', None)
    log_date = getattr(sports_request, 'log_date', None)

    sport_record = await sportCollections.find_one({"username": username, "log_date": log_date})

    if not sport_record:
        await sportCollections.insert_one(sports_request.model_dump(by_alias=True))
        return {"message": "Sports record successfully."}
    else:
        update_sports = sports_request.model_dump(by_alias=True)
        recorded_sports = [logged_sport["name"]
                           for logged_sport in sport_record["sports"]]
        for sport in update_sports["sports"]:
            if sport["name"] not in recorded_sports:
                sport_record["sports"].append(sport)

        await sportCollections.update_many({"username": username, "log_date": log_date}, {"$set":
                                                                                          sport_record
                                                                                          })
        return {"message": "Sports update successfully."}


@app.get("/get_user_sport/{date}", response_model_by_alias=True)
async def get_user_sport(date: str, request: Request):
    userId = getattr(request.state, 'username')
    formatted_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
    document = await sportCollections.find_one({"username": userId, "log_date": formatted_date})

    if document:
        document['_id'] = str(document['_id'])
        return document
    else:
        return {}


@app.get("/get_user_sports/", response_model_by_alias=True)
async def get_user_sports(
    request: Request,
    startDate: str = Query(None, alias="startDate"),
    endDate: str = Query(None, alias="endDate")
):
    userId = getattr(request.state, 'username')

    if startDate and endDate:
        try:
            start_date_formatted = datetime.strptime(startDate, "%Y-%m-%d")
            end_date_formatted = datetime.strptime(endDate, "%Y-%m-%d")
        except ValueError as e:
            return {"error": "Invalid date format, please use YYYY-MM-DD."}

        if start_date_formatted > end_date_formatted:
            return {"error": "Start date must not be after end date."}

        end_date_formatted = end_date_formatted.replace(
            hour=23, minute=59, second=59)

        query_filter = {
            "username": userId,
            "log_date": {
                "$gte": start_date_formatted,
                "$lte": end_date_formatted
            }
        }
    else:
        query_filter = {"username": userId}

    cursor = sportCollections.find(query_filter)
    documents = await cursor.to_list(length=None)

    if documents:
        documents_formatted = []
        for document in documents:
            document['_id'] = str(document['_id'])
            documents_formatted.append(document)
        print(documents_formatted)
        return documents_formatted
    else:
        return []


@app.get("/get_user_diets_sports/", response_model_by_alias=True)
async def get_user_diets_sports(request: Request):
    userId = getattr(request.state, 'username')

    # 获取饮食记录
    diet_cursor = dietCollections.find({"username": userId})
    diet_documents = await diet_cursor.to_list(length=None)

    sport_cursor = sportCollections.find({"username": userId})
    sport_documents = await sport_cursor.to_list(length=None)

    combined_data = {}
    for doc in diet_documents:
        date = doc['log_date'].strftime('%Y-%m-%d')
        if date not in combined_data:
            combined_data[date] = {"date": date, "diet": [], "sports": []}
        combined_data[date]["diet"] += [
            item for sublist in doc.get('diets', {}).values() for item in sublist
        ]

    for doc in sport_documents:
        date = doc['log_date'].strftime('%Y-%m-%d')
        if date not in combined_data:
            combined_data[date] = {"date": date, "diet": [], "sports": []}
        combined_data[date]["sports"] += [item['name']
                                          for item in doc.get('sports', []) if 'name' in item]

    data_list = sorted(combined_data.values(),
                       key=lambda x: x['date'], reverse=True)

    return data_list
