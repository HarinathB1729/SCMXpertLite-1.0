from pydantic import BaseModel, EmailStr


class UsersBM(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class UserResponse(BaseModel):
    name: str
    email: EmailStr
    role: str


class UserAuth(BaseModel):
    email: EmailStr
    password: str


class UserName(BaseModel):
    email: EmailStr
    name: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserEmailRole(BaseModel):
    email: EmailStr
    role: str


class TokenData(BaseModel):
    name: str
    email: EmailStr
    role: str
