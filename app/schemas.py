"""
ref:
# Types avail in pydantic https://docs.pydantic.dev/usage/types/
"""
from beanie import PydanticObjectId
from fastapi_users import schemas
from fastapi_users.db import BaseOAuthAccount, BeanieBaseUser
from pydantic import Field, EmailStr
from typing import List, Optional
from datetime import datetime


class OAuthAccount(BaseOAuthAccount):
    pass


class User(BeanieBaseUser[PydanticObjectId]):
    # id: str = Field(default_factory=PydanticObjectId)
    oauthAccounts: List[OAuthAccount] = Field(
        default_factory=list,
        title="Linked OAuth accounts",
        description="List of OAuth accounts linked to the user",
    )
 
    lastLogin: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the last login of the user",
        description="Date and time must be in UTC format",
    )
    userRole: int = Field(
        default=int(0),
        title="Role of the user",
        description="0 = customer, 1 = admin",
        ge=0,
        le=1,
    )
    userName: str = Field(
        default_factory=str,
        title="Name of the user",
        description="Length of the username must be greater than 2 and less than 256",
        # #min_length=2,
        # #max_length=256,
    )
    firstName: str = Field(
        default_factory=str,
        title="First name of the user",
        description="Length of the firstname must be greater than 2 and less than 256",
        # #min_length=2,
        # #max_length=256,
    )
    lastName: str = Field(
        default_factory=str,
        title="Last name of the user",
        description="Length of the lastname must be greater than 8 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    email: EmailStr = Field(
        title="Email ID of the user",
        description="Length of the email Id must be greater than 3 and less than 64",
    )
    address: str = Field(
        default_factory=str,
        title="Address of the user",
        description="Length of the address must be greater than 1 and less than 256",
        # #min_length=1,
        # #max_length=256,
    )
    createdAt: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the creation of the user",
        description="Date and time must be in UTC format",
    )


class UserRead(schemas.BaseUser[PydanticObjectId]):
   
    lastLogin: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the last login of the user",
        description="Date and time must be in UTC format",
    )
    userRole: int = Field(
        default=int(0),
        title="Role of the user",
        description="0 = customer, 1 = admin",
        ge=0,
        le=1,
    )
    userName: str = Field(
        default_factory=str,
        title="Name of the user",
        description="Length of the username must be greater than 2 and less than 256",
        #min_length=2,
        # #max_length=256,
    )
    firstName: str = Field(
        default_factory=str,
        title="First name of the user",
        description="Length of the firstname must be greater than 2 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    lastName: str = Field(
        default_factory=str,
        title="Last name of the user",
        description="Length of the lastname must be greater than 8 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    email: EmailStr = Field(
        title="Email ID of the user",
        description="Length of the email Id must be greater than 3 and less than 64",
    )
    address: str = Field(
        default_factory=str,
        title="Address of the user",
        description="Length of the address must be greater than 1 and less than 256",
        #min_length=1,
        #max_length=256,
    )
    createdAt: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the creation of the user",
        description="Date and time must be in UTC format",
    )


class UserCreate(schemas.BaseUserCreate):
  
    lastLogin: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the last login of the user",
        description="Date and time must be in UTC format",
    )
    userRole: int = Field(
        default=int(0),
        title="Role of the user",
        description="0 = customer, 1 = admin",
        ge=0,
        le=1,
    )
    userName: str = Field(
        default_factory=str,
        title="Name of the user",
        description="Length of the username must be greater than 2 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    firstName: str = Field(
        default_factory=str,
        title="First name of the user",
        description="Length of the firstname must be greater than 2 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    lastName: str = Field(
        default_factory=str,
        title="Last name of the user",
        description="Length of the lastname must be greater than 8 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    email: EmailStr = Field(
        title="Email ID of the user",
        description="Length of the email Id must be greater than 3 and less than 64",
    )
    address: str = Field(
        default_factory=str,
        title="Address of the user",
        description="Length of the address must be greater than 1 and less than 256",
        #min_length=1,
        #max_length=256,
    )
    createdAt: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the creation of the user",
        description="Date and time must be in UTC format",
    )

    class Config:
        schema_extra = {
            "example": {
                "userName": "Foo",
                "password": "password",
                "email": "JohnDoe@gmail.com",
                "address": "Washington st",
            }
        }


class UserUpdate(schemas.BaseUserUpdate):
 
    lastLogin: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the last login of the user",
        description="Date and time must be in UTC format",
    )
    userRole: int = Field(
        default=int(0),
        title="Role of the user",
        description="0 = customer, 1 = admin",
        ge=0,
        le=1,
    )
    userName: str = Field(
        default_factory=str,
        title="Name of the user",
        description="Length of the username must be greater than 2 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    firstName: str = Field(
        default_factory=str,
        title="First name of the user",
        description="Length of the firstname must be greater than 2 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    lastName: str = Field(
        default_factory=str,
        title="Last name of the user",
        description="Length of the lastname must be greater than 8 and less than 256",
        #min_length=2,
        #max_length=256,
    )
    email: EmailStr = Field(
        title="Email ID of the user",
        description="Length of the email Id must be greater than 3 and less than 64",
    )
    address: str = Field(
        default_factory=str,
        title="Address of the user",
        description="Length of the address must be greater than 1 and less than 256",
        #min_length=1,
        #max_length=256,
    )
    createdAt: datetime = Field(
        default=datetime.now(),
        title="Date and Time of the creation of the user",
        description="Date and time must be in UTC format",
    )

    class Config:
        schema_extra = {
            "example": {
                "userName": "Foo",
                "email": "JohnDoe@gmail.com",
                "address": "Washington st",
                "password": "password",
            }
        }
