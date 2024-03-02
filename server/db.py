from pymongo import MongoClient
from dotenv import dotenv_values
config = dotenv_values(".env")

# DATABASE CONNECTIVITY
db_connection = MongoClient(config["MONGO_URL"])
