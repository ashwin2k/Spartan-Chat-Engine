from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
)
from datetime import datetime

from db import mongo


class FileUpload(Document):
    timestamp = DateTimeField(default=datetime.now, required=True)
    email = StringField(required=True)
    text = ListField(StringField(), required=False)
    name = StringField(required=True)

def getAllUploads(email:str):
    uploads = FileUpload.objects(email=email)
    return [upload.to_mongo().to_dict() for upload in uploads]
