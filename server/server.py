from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routes.users import users_route
from routes.devices import devices_route
from routes.shipments import shipments_route
from routes.authentication import users_auth_route
from dotenv import dotenv_values
ENV_VAR = dotenv_values(".env")


app = FastAPI()

app.include_router(users_route)
app.include_router(devices_route)
app.include_router(shipments_route)
app.include_router(users_auth_route)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Ganesha.. Server Connected!!"}

if __name__ == "__main__":
     uvicorn.run(app, host="127.0.0.1", port=8000)