import boto3
from io import BytesIO
import os
import base64
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
from PIL import Image

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
S3_REGION=os.getenv('S3_REGION')

print(S3_REGION)

class ImageHandler:

    def __init__(self):

        # Initialize a session using Amazon S3
        self.s3_session = boto3.Session(
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=S3_REGION
        )
        self.s3_client = self.s3_session.client('s3')

    def fetch_image_url_from_s3(self, bucket_name, image_key):

        try:
            presigned_url = self.s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': image_key},
                                                    ExpiresIn=3600)  # URL expires in 1 hour
          
        except NoCredentialsError:
            print("Credentials not available")
        except Exception as e:
            print(f"Failed to download image: {str(e)}")
        
        return presigned_url
    
    
    def decode_save_img_to_s3(self, encoded_image, bucket_name, object_name):

        im = Image.open(BytesIO(base64.b64decode(encoded_image)))
        img_byte_arr = BytesIO()
        im.save(img_byte_arr, format=im.format)
        img_byte_arr = img_byte_arr.getvalue()

        try:
            self.s3_client.put_object(Body=img_byte_arr, Bucket=bucket_name, Key=object_name)
            return True
        except NoCredentialsError:
            print("Credentials not available")
            return False
    
