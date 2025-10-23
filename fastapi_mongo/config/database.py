from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://ammarsiddiqui377_db_user:wBgNCdno1FGrZ0oS@cluster0.w8kknck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client=MongoClient(uri,server_api=ServerApi("1"))
db=client.todo_db
collection=db["todo_collection"]