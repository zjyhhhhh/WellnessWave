import asyncio
import base64
from datetime import datetime
import os
from bson import ObjectId
from fastapi import FastAPI, Body, Form, HTTPException, Request, status, Query
from dotenv import load_dotenv
import motor.motor_asyncio
from image_handler import ImageHandler
from models import CommentModel, PostContentModel, PostModel, UserModel, DietModel, SportsModel, UserProfileModel, UserInformationModel
from passlib.context import CryptContext
from pydantic import ConfigDict, BaseModel, Field, EmailStr
import jwt
import requests

load_dotenv()

imageHanlder = ImageHandler()


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
userProfileCollections = db.get_collection("user_profiles")

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

    # def encode_avatar_base64(image_path):
    #     with open(image_path, "rb") as image_file:
    #         encoded_string = base64.b64encode(image_file.read())
    #     return encoded_string

    # new user profile and user infomation model
    user_info = UserInformationModel(
        username=created_user["_id"],
        nickname="User" + str(int(datetime.now().timestamp()))[-6:],
        # avatar=encode_avatar_base64("assets/images/default_avatar.jpg"),
        avatar="user_avatars/default_avatar.jpg"
    )
    user_profile = UserProfileModel(
        username=created_user["_id"],
        userInfo=user_info
    )
    await userProfileCollections.insert_one(
        user_profile.model_dump(by_alias=True)
    )


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

    # get user profile
    user_profile = await userProfileCollections.find_one(
        {"_id": user_dict["_id"]})

    # encode the downloaded image to base64
    avatar = imageHanlder.fetch_image_url_from_s3(
        "wellnesswave-storage", user_profile["userInfo"]["avatar"])

    def get_image_as_base64(url):
        # 发送 GET 请求获取图片数据
        response = requests.get(url)

        # 确保请求成功
        if response.status_code == 200:
            # 将图片数据转换为 Base64 编码
            return base64.b64encode(response.content).decode('utf-8')
        else:
            raise Exception(
                f"Failed to fetch image. Status code: {response.status_code}")
    avatar_base64 = get_image_as_base64(avatar)

    return {"access_token": token, "token_type": "bearer", "username": user_dict["_id"],
            "nickname": user_profile["userInfo"]["nickname"], "avatar": user_profile["userInfo"]["avatar"],
            "local_avatar": avatar_base64}

# post a new post


@app.post("/send_posts/", status_code=status.HTTP_201_CREATED)
async def create_post(request: Request, postContent: PostModel = Body(...)):
    try:
        # save in aws and store the path in the post
        username = getattr(request.state, 'username', None)
        post = postContent.model_dump(by_alias=True)
        aws_path = f"post_images/{str(datetime.now())}/image1.jpg"
        imageHanlder.decode_save_img_to_s3(
            post["postContent"]["contextImage"][0], "wellnesswave-storage", aws_path)
        post["postContent"]["contextImage"][0] = aws_path

        created_post = await postCollections.insert_one(post)

        await userProfileCollections.update_one(
            {"_id": post["author"]}, {"$push": {"postList": str(created_post.inserted_id)}})
        return {"post_id": str(created_post.inserted_id)}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# get all posts


# @app.get("/get_posts/", response_model_by_alias=True)
# async def get_posts(last_post_date: datetime = None, limit: int = 10):
#     # two types of get requests
#     # refresh: get the latest posts, no page number is sent in the request
#     # load more: get more posts, the page number is sent in the request
#     query = {}
#     if last_post_date:
#         query = {"postDate": {"$lt": last_post_date}}
#     cursor = postCollections.find(query).sort("postDate", -1).limit(limit)
#     posts = await cursor.to_list(length=limit)
#     for post in posts:
#         post["_id"] = str(post["_id"])

#     del posts["comments"]

#     return {
#         "posts": posts
#     }

@app.get("/get_posts/", response_model_by_alias=True)
async def get_posts(request: Request):
    username = getattr(request.state, 'username', None)
    user = await userProfileCollections.find_one(
        {"_id": username}, {"followingList": 1}
    )
    cursor = postCollections.find().sort("postDate", -1)
    posts = await cursor.to_list(length=10)
    for post in posts:
        post["_id"] = str(post["_id"])
        post["followed"] = post["author"] in user.get("followingList", [])
        post["postContent"]["contextImage"][0] = imageHanlder.fetch_image_url_from_s3(
            "wellnesswave-storage", post["postContent"]["contextImage"][0])
        post["authorInfo"]["avatar"] = imageHanlder.fetch_image_url_from_s3(
            "wellnesswave-storage", post["authorInfo"]["avatar"])
    return {
        "posts": posts
    }


@app.get("/get_focus_posts/", response_model_by_alias=True)
async def get_posts(request: Request):
    username = getattr(request.state, 'username', None)
    user = await userProfileCollections.find_one(
        {"_id": username}, {"followingList": 1}
    )
    cursor = postCollections.find().sort("postDate", -1)
    posts = await cursor.to_list(length=10)
    user_following_list = user.get("followingList", [])

    posts = [post for post in posts if post["author"] in user_following_list]
    for post in posts:
        post["_id"] = str(post["_id"])
        post["followed"] = post["author"] in user.get("followingList", [])
        post["postContent"]["contextImage"][0] = imageHanlder.fetch_image_url_from_s3(
            "wellnesswave-storage", post["postContent"]["contextImage"][0])
        post["authorInfo"]["avatar"] = imageHanlder.fetch_image_url_from_s3(
            "wellnesswave-storage", post["authorInfo"]["avatar"])
    return {
        "posts": posts
    }


@app.get("/get_post/{postId}", response_model_by_alias=True)
async def get_post(postId: str):
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    post["_id"] = str(post["_id"])
    return post


@app.get("/get_profile", response_model_by_alias=True)
async def get_profile(request: Request):
    username = getattr(request.state, 'username', None)
    user = await userProfileCollections.find_one({"_id": username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    async def fetch_post(post_id):
        post = await postCollections.find_one({"_id": ObjectId(post_id)})
        if post is not None:
            post["_id"] = str(post["_id"])
            post["followed"] = post["author"] in user.get("followingList", [])
            post["postContent"]["contextImage"][0] = imageHanlder.fetch_image_url_from_s3(
                "wellnesswave-storage", post["postContent"]["contextImage"][0])
            post["authorInfo"]["avatar"] = imageHanlder.fetch_image_url_from_s3(
                "wellnesswave-storage", post["authorInfo"]["avatar"])
        return post

    postIds = user.get("postList", [])
    likedPostIds = user.get("likeList", [])

    userProfile = {
        "username": user["_id"],
        "followers": len(user.get("followerList", [])),
        "following": len(user.get("followingList", [])),
        "posts": await asyncio.gather(*(fetch_post(postId) for postId in postIds)),
        "likedPosts": await asyncio.gather(*(fetch_post(postId) for postId in likedPostIds))
    }
    print(userProfile["posts"])

    return userProfile

# comment


@app.post("/add_comment/{postId}", status_code=status.HTTP_201_CREATED)
async def add_comment(request: Request, postId: str, comment: CommentModel = Body(...)):
    username = getattr(request.state, 'username', None)
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    # await postCollections.update_one(
    #     {"_id": ObjectId(postId)}, {"$push": {"commentList": comment}})
    await postCollections.update_one(
        {"_id": ObjectId(postId)}, {"$push": {"commentList": comment.model_dump(by_alias=True)}})
    return {"message": "Comment posted successfully."}


@app.get("/get_comments/{postId}", response_model_by_alias=True)
async def get_comments(postId: str):
    post = await postCollections.find_one({"_id": ObjectId(postId)})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    comments = post["commentList"]
    for comment in comments:
        comment["authorInfo"]["avatar"] = imageHanlder.fetch_image_url_from_s3(
            "wellnesswave-storage", comment["authorInfo"]["avatar"])
    print(comments)
    return comments


@app.post("/update_posts/like_dislike/{postId}")
async def update_post_likes_dislikes(request: Request, postId: str, like: bool = Body(...), dislike: bool = Body(...)):
    username = getattr(request.state, 'username', None)
    update_operations = {}

    if like:
        update_operations["$addToSet"] = {"likes": username}
        update_operations["$pull"] = {"dislikes": username}
        # add user likelist
        await userProfileCollections.update_one({"_id": username}, {"$addToSet": {"likeList": postId}})
    elif dislike:
        update_operations["$addToSet"] = {"dislikes": username}
        update_operations["$pull"] = {"likes": username}
        # remove user likelist
        await userProfileCollections.update_one({"_id": username}, {"$pull": {"likeList": postId}})
    elif not like and not dislike:
        update_operations["$pull"] = {"likes": username, "dislikes": username}
        # remove user likelist
        await userProfileCollections.update_one({"_id": username}, {"$pull": {"likeList": postId}})

    if not update_operations:
        raise HTTPException(status_code=400, detail="Invalid reaction")

    update_result = await postCollections.update_one(
        {"_id": ObjectId(postId)}, update_operations)

    if update_result.matched_count == 0:
        raise HTTPException(
            status_code=404, detail=f"Post {postId} not found")

    return {"message": "Post reaction updated successfully"}


@app.post("/follow_unfollow/{userId}/{follow}")
async def follow(request: Request, userId: str, follow: bool):
    username = getattr(request.state, 'username', None)
    if follow:
        await userProfileCollections.update_one(
            {"_id": username}, {"$addToSet": {"followingList": userId}})
        await userProfileCollections.update_one(
            {"_id": userId}, {"$addToSet": {"followerList": username}})
    else:
        await userProfileCollections.update_one(
            {"_id": username}, {"$pull": {"followingList": userId}})
        await userProfileCollections.update_one(
            {"_id": userId}, {"$pull": {"followerList": username}})

    return {"message": "Follow status updated successfully."}

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
