import mysql.connector
from mysql.connector import Error
from tabulate import tabulate


def create_connection(host_name, user_name, user_password, database_name=None):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=database_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection


def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")


def show_databases(connection):
    cursor = connection.cursor()
    query = "SHOW DATABASES"
    try:
        cursor.execute(query)
        for database_name in cursor: print(database_name)
        print("Database created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")


def create_table(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Table created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")


def print_full_table(table_name):
    connection = create_connection("localhost", "root", "dentaltree123", "wellnessWave")
    cursor = connection.cursor()
    select_customer_info_query = "SELECT ID, USER_NAME, AGE, SEX, PASSWORD, EMAIL FROM CUSTOMER_INFO"
    select_training_info_query = "SELECT ID, TRAINING_DATE, EXERCISES FROM CUSTOMER_TRAINING_INFO"
    select_diet_info_query = "SELECT ID, REPORTED_DATE, BREAKFAST, SNACK_1, LUNCH, SNACK_2, DINNER, SNACK_3, SCORE  " \
                             "FROM CUSTOMER_DIET_INFO"
    table_queries = {"CUSTOMER_INFO": select_customer_info_query,
                     "CUSTOMER_TRAINING_INFO": select_training_info_query,
                     "CUSTOMER_DIET_INFO": select_diet_info_query}
    table_vars = {"CUSTOMER_INFO": ['ID', 'USER_NAME', 'AGE', 'SEX', 'PASSWORD', 'EMAIL'],
                  "CUSTOMER_TRAINING_INFO": ['ID', 'TRAINING_DATE', 'EXERCISES'],
                  "CUSTOMER_DIET_INFO": ['ID', 'REPORTED_DATE', 'BREAKFAST', 'SNACK_1', 'LUNCH', 'SNACK_2', 'DINNER',
                                         'SNACK_3', 'SCORE']}

    cursor.execute(table_queries[table_name])
    table = cursor.fetchall()
    print(tabulate(table,
                   headers=table_vars[table_name], tablefmt='psql'))


def insert_value_to_table(query, input_data):
    connection = create_connection("localhost", "root", "dentaltree123", "wellnessWave")
    cursor = connection.cursor()
    try:
        cursor.execute(query, input_data)
        connection.commit()
        print("Customer created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")


def get_customer_from_table(query):
    connection = create_connection("localhost", "root", "dentaltree123", "wellnessWave")
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        data = cursor.fetchall()
        return data
    except Error as e:
        print(f"The error '{e}' occurred")

# create_table(connection, sql_query_diet_table)
# show_databases(connection)
# create_database_query = "CREATE DATABASE wellnessWave"
# create_database(connection, create_database_query)


# insert_customer_query = "INSERT INTO CUSTOMER_INFO (USER_NAME, AGE, SEX, PASSWORD, EMAIL) VALUES (%s, %s, %s, %s, %s)"
# sample_customer = ("x53ding", 28, "F", "123456abc", "x53ding@uwaterloo.ca")
# cursor.execute(insert_customer_query, sample_customer)
#
# # commit insert query, otherwirse wont save the change
# connection.commit()
