from fastapi import APIRouter, HTTPException, Depends, status
from models.users import UserResponse
from schemas.users import user_entity, users_entity
from db import db_connection
from typing import Annotated
import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from dotenv import dotenv_values
ENV_VAR = dotenv_values(".env")


users_auth_route = APIRouter()

# DATABASE-COLLECTION CONNECTIVITY
db = db_connection[ENV_VAR["DATABASE"]]
db_col = db[ENV_VAR["COLL_USERS"]]


# Define a secret key for JWT token
SECRET_KEY = ENV_VAR["SECRET_KEY"]
# Define the algorithm used for JWT token
ALGORITHM = ENV_VAR["ALGORITHM"]
# Define the token expiration time (in minutes)
ACCESS_TOKEN_EXPIRE_MINUTES = int(ENV_VAR["ACCESS_TOKEN_EXPIRE_MINUTES"])
USER_NOT_FOUND = "User not found"

# Password hashing
pwd_context = CryptContext(schemes=["sha256_crypt", "md5_crypt"])

# OAuth2 PasswordBearer for token retrieval
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Function to Hash password


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user_details(email: str):
    user = db_col.find_one({'email': email})
    if user is None:
        raise HTTPException(status_code=404, detail=USER_NOT_FOUND)
    return user_entity(user)

# Token functions


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(token: Annotated[str, Depends(oauth2_scheme)]):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # print("payload",payload)
        token_auth = UserResponse(email=payload.get('email'),
                                  role=payload.get('role'),
                                  name=payload.get('name')
                                  )

        if token_auth.email is None:
            print("Token verification error")
            raise credentials_exception

    except jwt.PyJWTError:
        print("Token verification error in PyJWTError")
        raise credentials_exception

    return token_auth


# Protected route
@users_auth_route.get("/protected")
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    # print("token", token)

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # print("entered try")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # print("payload", payload)
        token_auth = UserResponse(email=payload.get('email'),
                                  role=payload.get('role'),
                                  name=payload.get('name')
                                  )

        if token_auth.email is None:
            print("Token verification error")
            raise credentials_exception

    except jwt.PyJWTError:
        print("Token verification error in PyJWTError")
        raise credentials_exception

    return token_auth
