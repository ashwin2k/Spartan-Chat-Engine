from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional
from datetime import datetime


class MessageType(str, Enum):
    TEXT = "text"
    FILE = "file"


class UserType(str, Enum):
    USER = "user"
    AI = "assistant"


class RAGSystemType(str, Enum):
    WEB = "web"
    FILE = "doc"


class GoogleLoginSchema(BaseModel):
    token: str
    uid: str


class Message(BaseModel):
    contentType: MessageType
    role: UserType
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    message: str
    metaData: GoogleLoginSchema
    rag: RAGSystemType


class DDGWebSearchResult:
    title: str
    href: str
    body: str
