from fastapi import APIRouter
from models.todo import Todo
from config.database import collection
from schema.schemas import list_todos
from bson import ObjectId

router= APIRouter()

@router.get('/')
async def get_todos():
    todos= list_todos(collection.find())
    return todos




@router.post("/")
async def post_todo(todo:Todo):
    collection.insert_one(dict(todo))



@router.put("/{id}")

async def put_todo(id:str, todo:Todo):
    collection.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(todo)})


@router.delete("/{id}")
async def delete_todo(id:str):
    collection.delete_one({"_id":id})   