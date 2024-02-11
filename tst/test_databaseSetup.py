import unittest
from unittest.mock import patch, MagicMock
import mysql.connector
from src.databaseSetup import create_connection, create_database, show_databases,\
insert_value_to_table


# Mock the mysql.connector.connect function
@patch('mysql.connector.connect')
def test_create_connection(mock_connect):
    # Configure a return value for the connection
    mock_connection = MagicMock(name='connection_return', return_value=None)
    mock_connect.return_value = mock_connection

    # Call the create_connection function
    connection = create_connection("localhost", "user", "password", "test_db")

    # Assertions
    mock_connect.assert_called_with(
        host="localhost",
        user="user",
        passwd="password",
        database="test_db"
    )
    assert connection == mock_connection


# Test creating a database
def test_create_database():
    # Mock the cursor and execute method
    mock_cursor = MagicMock()
    mock_connection = MagicMock()
    mock_connection.cursor.return_value = mock_cursor

    # Call the create_database function
    create_database(mock_connection, "CREATE DATABASE test_db")

    # Assertions
    mock_cursor.execute.assert_called_with("CREATE DATABASE test_db")


def test_show_databases_success():
    # Mock the cursor and execute method
    mock_cursor = MagicMock()
    mock_connection = MagicMock()
    mock_connection.cursor.return_value = mock_cursor

    # Call the show_databases function
    show_databases(mock_connection)

    # Assertions
    mock_cursor.execute.assert_called_with("SHOW DATABASES")
    print("Test passed: Databases listed successfully")


