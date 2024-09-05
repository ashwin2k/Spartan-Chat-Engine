from fastapi import APIRouter, WebSocket
from schemas import Message
from pydantic import ValidationError
from controllers.chatController import chatCompletion
from controllers.RAG import RAG

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data: dict = await websocket.receive_json()
        try:
            validatedData = Message(**data)
            asyncIterator = chatCompletion([validatedData], validatedData)
            RAG.getContextAugmentation(validatedData)
            async for chunk in asyncIterator:
                await websocket.send_text(chunk.content)

        except ValidationError as e:
            await websocket.send_json(
                {
                    "status": 400,
                    "errors": e.errors(
                        include_url=False, include_context=False, include_input=False
                    ),
                }
            )
