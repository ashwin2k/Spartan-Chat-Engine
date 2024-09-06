from fastapi import APIRouter, status, Response
from schemas import GoogleLoginSchema
from fastapi.responses import JSONResponse
from services import firebaseAdmin
from models.mongo import messages
import json

router = APIRouter()


@router.post("/google")
async def verifyGoogleLogin(credentials: GoogleLoginSchema):
    tokenUid, name, email = firebaseAdmin.verifyJWTToken(credentials.token)
    chatHistory = json.loads(messages.getAllMessages(email=email))
    if tokenUid == credentials.uid:
        response = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"status": status.HTTP_200_OK, "message": "Token Valid!", "chatHistory":chatHistory},
        )
        response.set_cookie(key="name", value=name)
        response.set_cookie(key="email", value=email)
        return response

    else:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": status.HTTP_400_BAD_REQUEST,
                "errors": ["Invalid token/uid!"],
            },
        )
