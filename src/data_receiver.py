from typing import Union, Optional

from fastapi import FastAPI
from pydantic import BaseModel
from databaseSetup import insert_value_to_table, get_customer_from_table
from datetime import datetime
import uvicorn

app = FastAPI()


class Customer(BaseModel):
    ID: Optional[int] = None
    USER_NAME: str
    AGE: Optional[int] = None
    SEX: Optional[str] = None
    PASSWORD: str
    EMAIL: str


class CustomerTrainingInfo(BaseModel):
    ID: int
    TRAINING_DATE: str
    EXERCISES: str


class CustomerDietInfo(BaseModel):
    ID: int
    REPORTED_DATE: str
    BREAKFAST: Optional[str] = None
    SNACK_1: Optional[str] = None
    LUNCH: Optional[str] = None
    SNACK_2: Optional[str] = None
    DINNER: Optional[str] = None
    SNACK_3: Optional[str] = None
    SCORE: Optional[str] = None


@app.post("/create_customer/")
async def create_customer(customer: Customer):
    insert_customer_query = "INSERT INTO CUSTOMER_INFO (USER_NAME, AGE, SEX, PASSWORD, EMAIL) " \
                            "VALUES (%s, %s, %s, %s, %s)"
    customer_formatted = (customer.USER_NAME, customer.AGE, customer.SEX, customer.PASSWORD, customer.EMAIL)
    insert_value_to_table(insert_customer_query, customer_formatted)
    return customer


@app.get("/get_customer/{id}")
def get_customer(id: int):
    get_customer_query = f"SELECT * FROM CUSTOMER_INFO WHERE ID = {id}"
    fetched_customer = get_customer_from_table(get_customer_query)
    return fetched_customer


@app.post("/log_training_info/")
async def log_training_info(training_info: CustomerTrainingInfo):
    datetime_formatted = datetime.strptime(training_info.TRAINING_DATE, '%Y/%m/%d')
    insert_training_query = "INSERT INTO CUSTOMER_TRAINING_INFO (ID, TRAINING_DATE, EXERCISES) " \
                            "VALUES (%s, %s, %s)"
    training_formatted = (training_info.ID, datetime_formatted, training_info.EXERCISES)
    insert_value_to_table(insert_training_query, training_formatted)
    return training_info


@app.get("/get_customer_training_info/{id}")
def get_customer_training_info(id: int):
    get_customer_training_info_query = f"SELECT * FROM CUSTOMER_TRAINING_INFO WHERE ID = {id}"
    fetched_customer_training_info = get_customer_from_table(get_customer_training_info_query)
    return fetched_customer_training_info


@app.post("/log_diet/")
async def log_training_info(customer_diet: CustomerDietInfo):
    datetime_formatted = datetime.strptime(customer_diet.REPORTED_DATE, '%Y/%m/%d')
    insert_diet_query = "INSERT INTO CUSTOMER_DIET_INFO (ID, REPORTED_DATE, BREAKFAST, SNACK_1, " \
                        "LUNCH, SNACK_2, DINNER, SNACK_3) " \
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    diet_formatted = (customer_diet.ID, datetime_formatted, customer_diet.BREAKFAST,
                      customer_diet.SNACK_1, customer_diet.LUNCH, customer_diet.SNACK_2,
                      customer_diet.DINNER, customer_diet.SNACK_3)
    insert_value_to_table(insert_diet_query, diet_formatted)
    return customer_diet


@app.get("/get_customer_diet_info/{id}")
def get_customer_training_info(id: int):
    get_customer_diet_info_query = f"SELECT * FROM CUSTOMER_DIET_INFO WHERE ID = {id}"
    fetched_customer_diet_info = get_customer_from_table(get_customer_diet_info_query)
    return fetched_customer_diet_info


@app.get("/verify_userId/{user_id}_{email}")
def verify_userid(user_id: str, email: str):
    check_userid_query = f"SELECT * FROM CUSTOMER_INFO WHERE CUSTOMER_INFO.USER_NAME LIKE '{user_id}'"
    check_email_query = f"SELECT * FROM CUSTOMER_INFO WHERE CUSTOMER_INFO.USER_NAME LIKE '{email}'"
    customer_with_given_name = get_customer_from_table(check_userid_query)
    customer_with_given_email = get_customer_from_table(check_email_query)
    # bug, logic not work properly
    if len(customer_with_given_name) > 0 or len(customer_with_given_email) > 0:
        return False
    return True