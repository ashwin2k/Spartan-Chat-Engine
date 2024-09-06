from bson import ObjectId
from datetime import datetime


def serializeMessage(data_list):
    def serializeObject(obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, datetime):
            return obj.isoformat()
        else:
            raise TypeError(f"Type {type(obj)} not serializable")

    return [
        {
            "_id": serializeObject(item["_id"]),
            "contentType": item["contentType"],
            "role": item["role"],
            "timestamp": serializeObject(item["timestamp"]),
            "message": item["message"],
            "email": item["email"],
            "isCurrentMessage": False,
        }
        for item in data_list
    ]


def serializeUpload(data_list):
    def serializeObject(obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, datetime):
            return obj.isoformat()
        else:
            raise TypeError(f"Type {type(obj)} not serializable")

    return [
        {
            "_id": serializeObject(item["_id"]),
            "name": item["name"],
            "timestamp": serializeObject(item["timestamp"]),
            "text": item["text"],
            "email": item["email"],
        }
        for item in data_list
    ]
