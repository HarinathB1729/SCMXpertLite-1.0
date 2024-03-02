from routes.authentication import get_password_hash,  verify_password, verify_token, create_access_token
from fastapi import APIRouter, HTTPException, Depends
from models.users import UsersBM, UserAuth, UserName, UserEmailRole, TokenData
from schemas.users import user_entity, users_entity
from db import db_connection
import jwt
from datetime import timedelta
from dotenv import dotenv_values
ENV_VAR = dotenv_values(".env")


users_route = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = int(ENV_VAR["ACCESS_TOKEN_EXPIRE_MINUTES"])
USER_NOT_FOUND = "User not found"
EMAIL_NOT_FOUND = "Email Not Found"
UNAUTH_ACCESS = "Unauthorized Access"

# DATABASE-COLLECTION CONNECTIVITY
db = db_connection[ENV_VAR["DATABASE"]]
db_col_users = db[ENV_VAR["COLL_USERS"]]

# Endpoint for user signup


@users_route.post("/signup")
async def signup_user(user: UsersBM):

    existing_user = db_col_users.find_one({'email': user.email})

    if (existing_user):
        raise HTTPException(status_code=401, detail="User already Exists")
    else:
        # Hash the password
        hashed_password = get_password_hash(user.password)
        user.password = hashed_password

        # Save the user data to the database
        db_col_users.insert_one(dict(user))

        return {"message": "User signup successful"}


# Endpoint for user authentication
@users_route.post("/authentication")
async def authentication(formdata: UserAuth):
    # print("authentication ",formdata)

    user = db_col_users.find_one({'email': formdata.email})
    # print("user", user)

    if not user or not verify_password(formdata.password, user.get('password')):
        raise HTTPException(
            status_code=401, detail="Incorrect Email or Password")
    else:
        # Create access token (optional)
        access_token = create_access_token(
            data={'email': formdata.email,
                  'role': user['role'], 'name': user['name']},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


# Endpoint for user authentication
@users_route.get("/users")
async def all_users(token: TokenData = Depends(verify_token)):
    # print("token", token)
    user = db_col_users.find_one({'email': token.email})
    # print("user",user)

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:
        if (user['role'] == 'admin'):
            return (users_entity(db_col_users.find({}, {'_id': 0}).sort({'role': 1})))
        else:
            raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)


# Endpoint for Password change
@users_route.post("/pwdreset")
async def change_password(formdata: UserAuth, token: TokenData = Depends(verify_token)):
    # print("token",token)
    # print("changepwd data ",formdata)
    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=EMAIL_NOT_FOUND)
    else:
        # Hash the password
        hashed_password = get_password_hash(formdata.password)

        filterquery = {"email": formdata.email}

        # Define the update operation (set a new value)
        update = {"$set": {"password": hashed_password}}

        # Perform the conditional update
        result = db_col_users.update_one(filterquery, update)
        # print("Result ",result)

        # Check if the update was successful
        if result.acknowledged == True:
            return {'message': 'Password Updation Succesful'}
        else:
            # If no document matched the condition, raise an HTTPException with status code 404
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)


# Endpoint for Password change
@users_route.post("/forgotpwd")
async def change_password(formdata: UserAuth):
    # print("changepwd data ",formdata)

    user = db_col_users.find_one({'email': formdata.email})

    if not user:
        raise HTTPException(status_code=401, detail=EMAIL_NOT_FOUND)
    else:

        # Hash the password
        hashed_password = get_password_hash(formdata.password)

        filterquery = {"email": formdata.email}

        # Define the update operation (set a new value)
        update = {"$set": {"password": hashed_password}}

        # Perform the conditional update
        result = db_col_users.update_one(filterquery, update)
        # print("Result ",result)

        # Check if the update was successful
        if result.acknowledged == True:
            return {'message': 'Password Updation Succesful'}
        else:
            # If no document matched the condition, raise an HTTPException with status code 404
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)


# Endpoint for Username change
@users_route.post("/changename")
async def change_name(formdata: UserName, token: TokenData = Depends(verify_token)):
    # print("current user",token)

    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=EMAIL_NOT_FOUND)
    else:

        filterquery = {"email": formdata.email}

        # Define the update operation (set a new value)
        update = {"$set": {"name": formdata.name}}

        # Perform the conditional update
        result = db_col_users.update_one(filterquery, update)
        # print("Result ",result)

        # Check if the update was successful
        if result.acknowledged == True:
            return {'message': 'User - Name Updation Succesful'}
        else:
            # If no document matched the condition, raise an HTTPException with status code 404
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)


# Endpoint for Making User as Admin
@users_route.post("/makeadmin")
async def user_as_admin(formdata: UserEmailRole, token: TokenData = Depends(verify_token)):
    # print("current user",token)

    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=EMAIL_NOT_FOUND)
    else:
        # print("formdata", formdata)
        if (user['role'] == 'admin'):

            filterquery = {"email": formdata.email}

            # Define the update operation (set a new value)
            update = {"$set": {"role": formdata.role}}

            # Perform the conditional update
            result = db_col_users.update_one(filterquery, update)
            # print("Result ",result)

            # Check if the update was successful
            if result.acknowledged == True:
                return {'message': 'User - Role Updation Succesful'}
            else:
                # If no document matched the condition, raise an HTTPException with status code 404
                raise HTTPException(status_code=404, detail=USER_NOT_FOUND)

        else:
            raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
