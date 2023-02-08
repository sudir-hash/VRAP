import os
from typing import Any, Dict, Optional, Union
from schemas import UserCreate

from beanie import PydanticObjectId
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, InvalidPasswordException
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import BeanieUserDatabase, ObjectIDIDMixin
from httpx_oauth.clients.google import GoogleOAuth2

from db import User, get_user_db

SECRET = "SECRET"

# PUBLIC_KEY = """-----BEGIN PUBLIC KEY-----
# # Your RSA public key in PEM format goes here
# -----END PUBLIC KEY-----"""

# PRIVATE_KEY = """-----BEGIN RSA PRIVATE KEY-----
# # Your RSA private key in PEM format goes here
# -----END RSA PRIVATE KEY-----"""

google_oauth_client = GoogleOAuth2(
    os.getenv("GOOGLE_OAUTH_CLIENT_ID", ""),
    os.getenv("GOOGLE_OAUTH_CLIENT_SECRET", ""),
)

# TODO: Add Google OAuth2 AND convert print statements to logging statements


class UserManager(ObjectIDIDMixin, BaseUserManager[User, PydanticObjectId]):
    reset_password_token_secret = SECRET
    # reset_password_token_lifetime_seconds = 3600

    verification_token_secret = SECRET
    # verification_token_lifetime_seconds = 3600

    async def validate_password(
        self,
        password: str,
        user: Union[UserCreate, User],
    ) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(reason="Password should not contain e-mail")

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_login(
        self,
        user: User,
        request: Optional[Request] = None,
    ):
        print(f"User {user.id} logged in.")

    async def on_after_update(
        self,
        user: User,
        update_dict: Dict[str, Any],
        request: Optional[Request] = None,
    ):
        print(f"User {user.id} has been updated with {update_dict}.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_reset_password(
        self, user: User, request: Optional[Request] = None
    ):
        print(f"User {user.id} has reset their password.")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_verify(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has been verified")

    async def on_before_delete(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} is going to be deleted")

    async def on_after_delete(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} is successfully deleted")


async def get_user_manager(user_db: BeanieUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

cookie_transport = CookieTransport(cookie_max_age=3600)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=SECRET,
        # secret=PRIVATE_KEY,
        # public_key=PUBLIC_KEY,
        lifetime_seconds=3600,
        algorithm="HS256",
    )


jwt_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

cookie_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)


async def get_enabled_backends(request: Request):
    """Return the enabled dependencies following custom logic."""
    if request.url.path == "/protected-route-only-jwt":
        return [jwt_backend]
    else:
        return [cookie_backend, jwt_backend]


fastapi_users = FastAPIUsers[User, PydanticObjectId](get_user_manager, [jwt_backend])

current_active_user = fastapi_users.current_user(active=True)
