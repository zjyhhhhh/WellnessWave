import json
import pytest
from fastapi.testclient import TestClient
from src.data_receiver import app

client = TestClient(app)


def test_create_customer():
    data = {
        "USER_NAME": "testuser",
        "PASSWORD": "testpassword",
        "EMAIL": "test@example.com"
    }
    response = client.post("/create_customer/", json=data)
    assert response.status_code == 200
    assert response.json() == data


def test_get_customer():
    # Assuming there's a customer with ID 1 in the database
    response = client.get("/get_customer/1")
    assert response.status_code == 200
    assert "ID" in response.json()


def test_log_training_info():
    data = {
        "ID": 1,
        "TRAINING_DATE": "2024/01/01",
        "EXERCISES": "Running, Swimming"
    }
    response = client.post("/log_training_info/", json=data)
    assert response.status_code == 200
    assert response.json() == data


def test_get_customer_training_info():
    # Assuming there's training info with ID 1 in the database
    response = client.get("/get_customer_training_info/1")
    assert response.status_code == 200
    assert "ID" in response.json()


def test_log_diet():
    data = {
        "ID": 1,
        "REPORTED_DATE": "2024/01/01",
        "BREAKFAST": "Oatmeal",
        "LUNCH": "Salad",
        "DINNER": "Grilled Chicken"
    }
    response = client.post("/log_diet/", json=data)
    assert response.status_code == 200
    assert response.json() == data


def test_get_customer_diet_info():
    # Assuming there's diet info with ID 1 in the database
    response = client.get("/get_customer_diet_info/1")
    assert response.status_code == 200
    assert "ID" in response.json()


def test_verify_userid():
    # Assuming no user with the given user_id and email in the database
    response = client.get("/verify_userId/testuser_test@example.com")
    assert response.status_code == 200
    assert response.json() is True


