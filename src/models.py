import base64
from datetime import datetime, date
from io import BytesIO
import os
from typing import Optional, List, Dict
from bson import ObjectId
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from passlib.context import CryptContext
import uuid
# from customized_datatype import Sport
import json
# import boto3

PyObjectId = Annotated[str, BeforeValidator(str)]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
# S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')

# s3_client = boto3.client(
#     's3',
#     aws_access_key_id=AWS_ACCESS_KEY_ID,
#     aws_secret_access_key=AWS_SECRET_ACCESS_KEY
# )


class UserModel(BaseModel):
    """
    Container for a single user.
    """

    def hash_password(self):
        self.password = pwd_context.hash(self.password)
    username: PyObjectId = Field(alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    nickname: str = Field(default=None)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "nickname": "Yahh",
                "username": "example-user",
                "email": "12345678@gmail.com",
                "password": "12345678",
            }
        },
    )


class PostContentModel(BaseModel):
    """
    Container for the content of a post.
    """

    contextText: str = Field(default=None)
    contextImage: List[str] = Field(default=None)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "contextText": "I'm happy today!",
                "contextImage": ["example_user/2020-07-17T00:00:00/image1.jpg", "example_user/2020-07-17T00:00:00/image2.jpg"],
            }
        },
    )


class UserInformationModel(BaseModel):
    """
    Container for a single user's information.
    """
    username: PyObjectId = Field
    nickname: str = Field
    avatar: str = Field
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "nickname": "Yahh",
                "avatar": "example-user/avatar.jpg",
            }
        }
    )


class CommentModel(BaseModel):
    """
    Container for a single comment.
    """
    contentText: str = Field(...)
    author: PyObjectId = Field(...)
    authorInfo: UserInformationModel = Field(default=None)
    postDate: datetime = Field(default_factory=datetime.now)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "contentText": "I'm happy today!",
                "auther": "example-user",
                "autherNickname": "Yahh",
                "autherAvatar": "example-user/avatar.jpg",
                "postDate": "2020-07-17T00:00:00"
            }
        },
    )
# PostModel
    # PostContentModel PosterID CommentList LikeList DislikeList PostDate


class PostModel(BaseModel):
    """
    Container for a single post.
    """

    # def upload_imgageList_to_s3(self):
    #     for i, image in enumerate(self.postContent.contextImage):
    #         image_s3_path = f"{self.auther}/post_images/{self.postDate}/image_{i}.jpg"
    #         s3_client.upload_fileobj(
    #             image,
    #             S3_BUCKET_NAME,
    #             image_s3_path,
    #             ExtraArgs={'ContentType': 'image/jpeg'}  # 或根据实际图片类型调整
    #         )
    #         self.ContextImage[i] = image_s3_path

    # def get_imageList_from_s3(self):
    #     for i, image_s3_path in enumerate(self.postContent.contextImage):
    #         image = BytesIO()
    #         s3_client.download_fileobj(S3_BUCKET_NAME, image_s3_path, image)
    #         self.ContextImage[i] = image

    postContent: PostContentModel = Field(...)
    author: PyObjectId = Field(...)
    authorInfo: UserInformationModel = Field(...)
    postDate: datetime = Field(default_factory=datetime.now)
    commentList: List[CommentModel] = Field(default=[])
    # likeCount: int = Field(default=0)
    # dislikeCount: int = Field(default=0)
    likes: List[str] = Field(default=[])
    dislikes: List[str] = Field(default=[])
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "postContent": {
                    "contentText": "I'm happy today!",
                    "contextImage": ["example-user/post_images/2020-07-17T00:00:00/image1.jpg", "example-user/post_images/2020-07-17T00:00:00/image2.jpg"]
                },
                "auther": "example-user",
                "autherNickname": "Yahh",
                "autherAvatar": "example-user/avatar.jpg",
                "commentList": [
                    {
                        "contentText": "I'm happy today!",
                        "auther": "example-user",
                        "autherNickname": "Yahh",
                        "autherAvatar": "example-user/avatar.jpg",
                    }
                ],
                "likeCount": 0,
                "dislikeCount": 0,
                "postDate": "2020-07-17T00:00:00"
            }
        },
    )

# UserProfileModel
    # UserPostList UserLikeList UserFollowList UserFollowerList Introduction Avatar Sex Age Nickname


class UserProfileModel(BaseModel):
    """
    Container for a single user's profile.
    """
    username: PyObjectId = Field(alias="_id")
    userInfo: UserInformationModel = Field
    introduction: str = Field(default=None)
    sex: str = Field(default=None)
    age: int = Field(default=None)
    postList: List[str] = Field(default=[])
    likeList: List[str] = Field(default=[])
    followingList: List[UserInformationModel] = Field(default=[])
    followerList: List[UserInformationModel] = Field(default=[])
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class Diets(BaseModel):
    breakfast: List[str] = Field(default_factory=list)
    lunch: List[str] = Field(default_factory=list)
    dinner: List[str] = Field(default_factory=list)
    snack: List[str] = Field(default_factory=list)


class DietModel(BaseModel):
    """
    Container for user's daily diet
    """
    username: PyObjectId = Field(...)
    log_date: datetime = Field(...)
    diets: Diets

    class Config:
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "username": "example-user",
                "log_date": "2024-02-23",
                "diets": {
                    "breakfast": ["eggs", "salad"],
                    "lunch": ["steak"],
                    "dinner": ["salad"],
                    "snack": []  # 假设snack可以为空
                }
            }
        }


class Sport(BaseModel):
    name: str
    duration: int


class SportsModel(BaseModel):
    """
    Container for user's daily sports
    """
    username: PyObjectId = Field(...)
    log_date: datetime = Field(...)
    sports: List[Sport] = Field(default_factory=list)

    class Config:
        orm_mode = True  # 如果使用ORM模式
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "username": "example-user",
                "log_date": "2024-02-23",
                "sports": [{"name": "swimming", "duration": 30}]
            }
        }


class BasicInfo(BaseModel):
    height: Optional[float] = Field(None, example=170)
    weight: Optional[float] = Field(None, example=60)
    bmi: Optional[float] = Field(default=None, example=20.76)


class HealthIndex(BaseModel):
    heartRate: Optional[int] = Field(None, example=60)
    bloodSugar: Optional[float] = Field(None, example=3.5)
    bloodPressure: Optional[List[int]] = Field(None, example=[80, 120])


class BodyMeasurement(BaseModel):
    chest: Optional[float] = Field(None, example=90)
    waist: Optional[float] = Field(None, example=70)
    hip: Optional[float] = Field(None, example=90)


class HealthInfoModel(BaseModel):
    username: str = Field(...)
    log_date: Optional[datetime] = Field(default_factory=datetime.now)
    basicInfo: Optional[BasicInfo]
    healthIndex: Optional[HealthIndex]
    bodyMeasurement: Optional[BodyMeasurement]
