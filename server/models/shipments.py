from pydantic import BaseModel, EmailStr


class ShipmentBM(BaseModel):
    email: EmailStr
    shipmentno: int
    routedetails: str
    device: str
    ponumber: str
    ndcnumber: str
    snogoods: str
    containerno: str
    goodstype: str
    expdeliverydate: str
    deliveryno: str
    batchid: str
    shipmentdescr: str
