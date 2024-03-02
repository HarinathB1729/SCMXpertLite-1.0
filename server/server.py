from fastapi import FastAPI
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

# Add CORS middleware with appropriate configuration
origins = [
    ENV_VAR['ORIGIN1'],
    ENV_VAR['ORIGIN2'],  # Add the origin of your frontend app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Ganesha.. Server Connected!!"}
