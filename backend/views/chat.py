from fastapi import APIRouter, WebSocket
from schemas import Message
from pydantic import ValidationError
from controllers.chatController import chatCompletion
from controllers.RAG import RAG
from models.mongo import messages
from utils.dataUtils import serializeMessage
from services import firebaseAdmin

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    tokenUid, _, email = None, None, None
    while True:
        data: dict = await websocket.receive_json()
        try:
            validatedData = Message(**data)
            if not tokenUid:
                tokenUid, _, email = firebaseAdmin.verifyJWTToken(
                    validatedData.metaData.token
                )
            messages.Message(
                contentType=validatedData.contentType,
                role=validatedData.role,
                timestamp=validatedData.timestamp,
                message=validatedData.message,
                email=email,
            ).save()
            chatHistory = serializeMessage(messages.getAllMessages(email=email))
            relevantDocs = RAG.getContextAugmentation(validatedData, tokenUid)
            response = chatCompletion(chatHistory, validatedData, relevantDocs)
            messages.Message(
                contentType="text",
                role="assistant",
                message=response.response,
                email=email,
            ).save()
            await websocket.send_text(response.response)

        except ValidationError as e:
            await websocket.send_json(
                {
                    "status": 400,
                    "errors": e.errors(
                        include_url=False, include_context=False, include_input=False
                    ),
                }
            )
