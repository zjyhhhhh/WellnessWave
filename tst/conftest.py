import asyncio
import httpx
import pytest
import os
import sys

import pytest_asyncio
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))
from mongodb_data_receiver import app
from httpx import AsyncClient

@pytest_asyncio.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest_asyncio.fixture(scope="session")
async def client():
    async with AsyncClient(app=app, base_url="http://127.0.0.1") as ac:
        yield ac

@pytest.fixture(scope="session")
def event_loop():
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
    yield loop
    loop.close()

        
