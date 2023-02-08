from schemas import OAuthAccount, User
import motor.motor_asyncio
from fastapi_users.db import BeanieUserDatabase


DATABASE_URL = "mongodb+srv://sivaraamtest:helloworld123@devtest-cluster.wprw0mv.mongodb.net/?retryWrites=true&w=majority"
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["vrap_test_db"]
products_collection = db["Products"]


async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)
