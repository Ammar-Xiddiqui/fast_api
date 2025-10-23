def individual_serial(todo) -> dict :
    return {
        "id" : str(todo["_id"]),
        "name": str(todo["name"]),
        "description": str(todo["description"]),
        "complete": todo["complete"],
    }



def list_todos(todos) -> list:
    return [individual_serial(todo) for todo in todos]