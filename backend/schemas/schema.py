from pydantic import BaseModel
from enum import Enum


class MessageType(str, Enum):
    TEXT = "text"
    FILE = "file"


class UserType(str, Enum):
    USER = "user"
    AI = "ai"


class Message(BaseModel):
    contentType: MessageType
    userType: UserType
    message: str


class DDGWebSearchResult:
    title: str
    href: str
    body: str
