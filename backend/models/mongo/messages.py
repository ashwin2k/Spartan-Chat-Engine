from mongoengine import (
    Document,
    StringField,
    EnumField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    DateTimeField,
)
from datetime import datetime
from schemas import MessageType, UserType
from db import mongo
from typing import List


class GoogleLoginSchema(EmbeddedDocument):
    token = StringField(required=True)
    uid = StringField(required=True)


class Message(Document):
    contentType = EnumField(MessageType, required=True)
    role = EnumField(UserType, required=True)
    timestamp = DateTimeField(default=datetime.now, required=True)
    message = StringField(required=True)
    email = StringField(required=True)


def getAllMessages(email: str):
    messages = Message.objects(email=email)
    return [message.to_mongo().to_dict() for message in messages]
