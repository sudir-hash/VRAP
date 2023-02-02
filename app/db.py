from schemas import OAuthAccount, User
import motor.motor_asyncio
from fastapi_users.db import BeanieUserDatabase


DATABASE_URL = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["vrap_test_db"]


async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)
