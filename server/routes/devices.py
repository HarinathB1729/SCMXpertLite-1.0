from fastapi import APIRouter, HTTPException, Depends
from models.users import TokenData
from routes.users import verify_token
from db import db_connection
from schemas.devices import devices_entity
from dotenv import dotenv_values
ENV_VAR = dotenv_values(".env")

devices_route = APIRouter()

# DATABASE-COLLECTION CONNECTIVITY
db = db_connection[ENV_VAR["DATABASE"]]
db_col_devices = db[ENV_VAR["COLL_DEVICES"]]
db_col_users = db[ENV_VAR["COLL_USERS"]]

UNAUTH_ACCESS = "Unauthorized Access"


# GET ALL DEVICES DATA
@devices_route.get("/devices")
async def device_details(currentuser: TokenData = Depends(verify_token)):
    # print("currentuser",currentuser)
    user = db_col_users.find_one({'email': currentuser.email})
    # print("user",user)

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:
        return db_col_devices.distinct('deviceid')


# GET DEVICE DATA
@devices_route.get("/device/{dev_id}")
async def device_details(dev_id: int, currentuser: TokenData = Depends(verify_token)):
    user = db_col_users.find_one({'email': currentuser.email})
    # print("user",user)

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:
        if (user['role'] == 'admin'):
            return devices_entity(db_col_devices.find({'deviceid': dev_id}, {'_id': 0}))
        else:
            raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
