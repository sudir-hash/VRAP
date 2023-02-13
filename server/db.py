from schemas import OAuthAccount, User
import motor.motor_asyncio
from fastapi_users.db import BeanieUserDatabase
from dotenv import load_dotenv
import os
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["vrap_test_db"]
products_collection = db["Products"]


async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)
