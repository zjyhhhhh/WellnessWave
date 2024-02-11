import base64
from datetime import datetime
from io import BytesIO
import os
from typing import Optional, List
from bson import ObjectId
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from passlib.context import CryptContext
import boto3

PyObjectId = Annotated[str, BeforeValidator(str)]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)


class UserModel(BaseModel):
    """
    Container for a single user.
    """

    def hash_password(self):
        self.password = pwd_context.hash(self.password)
    username: Optional[PyObjectId] = Field(alias="_id")
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


class CommentModel(BaseModel):
    """
    Container for a single comment.
    """
    contentText: str = Field(...)
    auther: PyObjectId = Field(...)
    postDate: datetime = Field(default_factory=datetime.now)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "ContentText": "I'm happy today!",
                "PosterID": "5f0f6e3e8e3b3e3e3e3e3e3e"
            }
        },
    )
# PostModel
    # PostContentModel PosterID CommentList LikeList DislikeList PostDate


class PostModel(BaseModel):
    """
    Container for a single post.
    """

    def upload_imgageList_to_s3(self):
        for i, image in enumerate(self.postContent.contextImage):
            image_s3_path = f"post_images/{self.auther}/{self.postDate}/image_{i}.jpg"
            s3_client.upload_fileobj(
                image,
                S3_BUCKET_NAME,
                image_s3_path,
                ExtraArgs={'ContentType': 'image/jpeg'}  # 或根据实际图片类型调整
            )
            self.ContextImage[i] = image_s3_path

    def get_imageList_from_s3(self):
        for i, image_s3_path in enumerate(self.postContent.contextImage):
            image = BytesIO()
            s3_client.download_fileobj(S3_BUCKET_NAME, image_s3_path, image)
            self.ContextImage[i] = image

    postContent: PostContentModel = Field(...)
    author: PyObjectId = Field(...)
    postDate: datetime = Field(default_factory=datetime.now)
    commentList: List[CommentModel] = Field(default=[])
    likeCount: int = Field(default=0)
    dislikeCount: int = Field(default=0)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "PostContent": {
                    "ContextText": "I'm happy today!",
                    "ContextImage": ["post_images/example-user/2020-07-17T00:00:00/image1.jpg", "post_images/example-user/2020-07-17T00:00:00/image2.jpg"]
                },
                "PosterID": "example-user",
                "CommentList": [
                    {
                        "ContentText": "I'm happy today!",
                        "PosterID": "example-user"
                    }
                ],
                "LikeCount": 0,
                "DislikeCount": 0,
                "PostDate": "2020-07-17T00:00:00"
            }
        },
    )

# PostModel
    # PostContentModel PosterID CommentList LikeList DislikeList PostDate

# UserProfileModel
    # UserPostList UserLikeList UserFollowList UserFollowerList Introduction Avatar Sex Age Nickname
