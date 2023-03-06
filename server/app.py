from beanie import init_beanie
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import User, db
from schemas import UserCreate, UserRead, UserUpdate
from product import product_router
from users import (
    SECRET,
    jwt_backend,
    current_active_user,
    fastapi_users,
    get_enabled_backends,
    google_oauth_client,
)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_user = fastapi_users.current_user()
current_active_user = fastapi_users.current_user(active=True)
current_active_user_auth = fastapi_users.current_user(
    active=True, get_enabled_backends=get_enabled_backends
)
current_active_verified_user = fastapi_users.current_user(active=True, verified=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)



@app.on_event("startup")
async def on_startup():
    await init_beanie(
        database=db,
        document_models=[
            User,
        ],
    )


@app.on_event("shutdown")
async def shutdown_event():
    if not app.state.db:
        await app.state.db.close()


# Product CRUD operations
app.include_router(
    product_router,
    prefix="/product",
    tags=["product"],
)

# Auth router to generate /login and /logout
app.include_router(
    fastapi_users.get_auth_router(jwt_backend, requires_verification=False),
    prefix="/auth/jwt",
    tags=["auth"],
)

# Registration router to generate /register
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

# Reset password router to generate /reset-password or /forgot-password
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

# Verify router to generate /request-verify-token or /verify
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)

# Users router to generate CRUD for /me or /{user_id}
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate, requires_verification=True),
    prefix="/users",
    tags=["users"],
)

# OAuth association router to generate /authorize /callback
# Note: For multiple OAuth providers, you need to create multiple routers
app.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        jwt_backend,
        SECRET,
        # associate_by_email= True, # to automatically link this OAuth account to the existing user account with the same email(security risk)
    ),
    prefix="/auth/google",
    tags=["auth"],
)

# OAuth association router to associate already authenticated user with OAuth account
# app.include_router(
#     fastapi_users.get_oauth_associate_router(google_oauth_client, UserRead, "SECRET"),
#     prefix="/auth/associate/google",
#     tags=["auth"],
# )


# To check if user is authenticated
@app.get("/authenticated-route", tags=["auth"])
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


# To check if user is authenticated with a cookie or a JWT
@app.get("/protected-route", tags=["auth"])
def protected_route(user: User = Depends(current_active_user_auth)):
    return f"Hello, {user.email}. You are authenticated with a cookie or a JWT."


# To check if user is authenticated with a JWT
@app.get("/protected-route-only-jwt", tags=["auth"])
def protected_route_jwt(user: User = Depends(current_active_user_auth)):
    return f"Hello, {user.email}. You are authenticated with a JWT."


# To get if current user is active or not
@app.get("/protected-route/status", tags=["auth"])
def protected_route_status(user: User = Depends(current_user)):
    return f"Hello, {user.email}"


# To get all currently active users
@app.get("/protected-route/active", tags=["auth"])
def protected_route_active(user: User = Depends(current_active_user)):
    return f"Hello, {user.email}"


# To get all currently active and verified users
@app.get("/protected-route/verified", tags=["auth"])
def protected_route_verify(user: User = Depends(current_active_verified_user)):
    return f"Hello, {user.email}"


# To get all currently active superusers
@app.get("/protected-route/superuser", tags=["auth"])
def protected_route_superuser(user: User = Depends(current_superuser)):
    return f"Hello, {user.email}"
