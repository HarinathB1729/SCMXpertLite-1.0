from fastapi import APIRouter, Depends, HTTPException
from db import db_connection
from models.shipments import ShipmentBM
from models.users import TokenData
from routes.users import verify_token
from schemas.shipments import shipments_entity
from dotenv import dotenv_values
ENV_VAR = dotenv_values(".env")


shipments_route = APIRouter()

# DATABASE-COLLECTION CONNECTIVITY
db = db_connection[ENV_VAR["DATABASE"]]
db_col_users = db[ENV_VAR["COLL_USERS"]]
db_col_shipments = db[ENV_VAR["COLL_SHIPMENTS"]]

UNAUTH_ACCESS = "Unauthorized Access"


# get my shipments
@shipments_route.get("/shipmentno")
async def shipment_details(shipmentno: int, token: TokenData = Depends(verify_token)):
    # print("token",token)
    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:

        shipment = db_col_shipments.find_one({'shipmentno': shipmentno})

        if shipment:
            raise HTTPException(
                status_code=409, detail="Shipment no already exists")
        else:
            return {'message': 'Unique Shipment no'}


# get my shipments
@shipments_route.get("/myshipments")
async def shipment_details(token: TokenData = Depends(verify_token)):
    # print("token",token)

    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:
        return shipments_entity(db_col_shipments.find({'email': user['email']}, {'_id': 0}))


# get all shipments
@shipments_route.get("/allshipments")
async def all_shipment_details(token: TokenData = Depends(verify_token)):
    # print("token",token)
    user = db_col_users.find_one({'email': token.email})

    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:

        if (user['role'] == 'admin'):
            return shipments_entity(db_col_shipments.find({}, {'_id': 0}))
        else:
            raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)


# post new shipment
@shipments_route.post("/newshipment")
async def shipment_details(newshipment: ShipmentBM, token: TokenData = Depends(verify_token)):
    # print("new shipment data:",newshipment)
    # print("token",token)
    user = db_col_users.find_one({'email': token.email})
    # print("user",user)
    if not user:
        raise HTTPException(status_code=401, detail=UNAUTH_ACCESS)
    else:
        # print("existing user")
        shipment = db_col_shipments.find_one(
            {'shipmentno': newshipment.shipmentno})

        if shipment:
            raise HTTPException(
                status_code=409, detail="Shipment no already exists")
        else:
            db_col_shipments.insert_one(dict(newshipment))
            return {'message': 'New Shipment Created Succesfully!!'}
