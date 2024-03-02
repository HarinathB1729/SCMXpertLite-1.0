from pydantic import BaseModel


class Device(BaseModel):
    deviceid: str
    batterylevel: str
    firstsensortemp: str
    routefrom: str
    routeto: str
    timestamp: str
