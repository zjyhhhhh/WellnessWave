

import base64
import json
import pytest

authorInfo = {
    "username": "newuser",
    "nickname": "newuser",
    "avatar": "user_avatars/default_avatar.jpg"
}

credentials = {
    "email": "newuser@example.com",
    "password": "testpassword123"
}

async def get_token(client):
    response = await client.post("/users/login", data=json.dumps(credentials), headers={"Content-Type": "application/json"})
    token = response.json()["access_token"]
    return token 


async def get_post_id(client, token):
    posts_response = await client.get("/get_posts/", headers={"Authorization": f"{token}"})
    posts = posts_response.json()["posts"]
    if len(posts) != 0:
        post_id = posts[0]["_id"]
        return post_id

@pytest.mark.asyncio
async def test_create_user(client):
    user_data = {
        "username": "newuser",
        "password": "testpassword123",
        "email": "newuser@example.com"
    }
    response = await client.post("/users/register", data=json.dumps(user_data), headers={"Content-Type": "application/json"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_login(client):
    response = await client.post("/users/login", data=json.dumps(credentials), headers={"Content-Type": "application/json"})

    assert response.status_code == 200
    assert "access_token" in response.json()
    
@pytest.mark.asyncio
async def test_create_post(client):
    token = await get_token(client)

    def encode_avatar_base64(image_path):
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')  
        return encoded_string

    data = {
        "author": "newuser",  
        "authorInfo": {
            "username": "newuser", 
            "nickname": "newuser",
            "avatar": "user_avatars/default_avatar.jpg"
        },
        "postContent": {
            "contextText": "Example post text",
            "contextImage": [encode_avatar_base64(f"src/assets/images/default_avatar.jpg")] 
        },
    }

    response = await client.post("/send_posts/", data=json.dumps(data), headers={"Content-Type": "application/json", "Authorization": f"{token}"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_get_posts(client):
    token = await get_token(client)

    response = await client.get("/get_posts/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_focus_posts(client):
    token = await get_token(client)

    response = await client.get("/get_focus_posts/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_post(client):
    token = await get_token(client)
    post_id = await get_post_id(client, token)

    response = await client.get(f"/get_post/{post_id}", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_profile(client):
    token = await get_token(client)
    response = await client.get("/get_profile", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_add_comment(client):
    token = await get_token(client)
    post_id = await get_post_id(client, token)

    data = {
        "author": "newuser",
        "authorInfo": authorInfo,
        "contentText": "Example comment text"
    }
    response = await client.post(f"/add_comment/{post_id}", data=json.dumps(data), headers={"Content-Type": "application/json", "Authorization": f"{token}"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_get_comments(client):
    token = await get_token(client)
    post_id = await get_post_id(client, token)

    response = await client.get(f"/get_comments/{post_id}", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_like_dislike_post(client):
    token = await get_token(client)
    post_id = await get_post_id(client, token)

    data = {
        "like": True,
        "dislike": False
    }

    response = await client.post(f"/update_posts/like_dislike/{post_id}", data=json.dumps(data), headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_follow_unfollow_user(client):
    token = await get_token(client)

    userId = "Example-user"
    response = await client.post(f"/follow_unfollow/{userId}/{True}", headers={"Authorization": f"{token}"})
    assert response.status_code == 200
    response = await client.post(f"/follow_unfollow/{userId}/{False}", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_following(client):
    token = await get_token(client)

    response = await client.get("/get_user_followings/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_followers(client):
    token = await get_token(client)

    response = await client.get("/get_user_followers/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_focus_posts(client):
    token = await get_token(client)

    response = await client.get("/get_focus_posts/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_post_user_diet(client):
    token = await get_token(client)

    data = {
        "username": "newuser",
        "log_date": "2024-02-01T05:00:00.000+00:00",
        "diets": {
            "breakfast": ["Milk"],
            "lunch": [],
            "dinner": [],
            "snack": []
        }
    }

    response = await client.post("/post_user_diet/", data=json.dumps(data), headers={"Content-Type": "application/json", "Authorization": f"{token}"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_get_user_diet_by_date(client):
    token = await get_token(client)

    response = await client.get("/get_user_diet/2024-02-01T05:00:00", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_user_diets(client):
    token = await get_token(client)

    response = await client.get("/get_user_diets/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_post_user_sport(client):
    token = await get_token(client)

    data = {
        "username": "newuser",
        "log_date": "2024-02-01T05:00:00.000+00:00",
        "sports": [
            {
                "name": "swimming",
                "duration": 30
            }
        ]
    }

    response = await client.post("/post_user_sport/", data=json.dumps(data), headers={"Content-Type": "application/json", "Authorization": f"{token}"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_get_user_sport_by_date(client):
    token = await get_token(client)

    response = await client.get("/get_user_sport/2024-02-01T05:00:00", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_user_sports(client):
    token = await get_token(client)

    response = await client.get("/get_user_sports/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_user_diets_sports(client):
    token = await get_token(client)

    response = await client.get("/get_user_diets_sports/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200

@pytest.mark.asyncio
# post_user_health_info
async def test_post_user_health_info(client):
    token = await get_token(client)

    data = {
        "username": "newuser",
        "basicInfo": {
            "height": 180,
            "weight": 70,
            "bmi": 21.6
        },
        "bodyMeasurement": {
            "chest": 42,
            "waist": 35,
            "hip": 42
        },
        "healthIndex": {
            "heartRate": 60,
            "bloodSugar": 3.5,
            "bloodPressure": [80, 120]
        }
    }

    response = await client.post("/post_user_health_info/", data=json.dumps(data), headers={"Content-Type": "application/json", "Authorization": f"{token}"})
    assert response.status_code == 201

@pytest.mark.asyncio
async def test_get_user_health_info(client):
    token = await get_token(client)

    response = await client.get("/get_user_health_info/", headers={"Authorization": f"{token}"})
    assert response.status_code == 200