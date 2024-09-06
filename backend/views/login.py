from fastapi import APIRouter, status, Cookie
from schemas import GoogleLoginSchema
from fastapi.responses import JSONResponse
from services import firebaseAdmin
from models.mongo import messages,uploads
from utils.dataUtils import serializeMessage,serializeUpload
from typing import Annotated, Union

router = APIRouter()


@router.post("/google")
async def verifyGoogleLogin(credentials: GoogleLoginSchema):
    tokenUid, name, email = firebaseAdmin.verifyJWTToken(credentials.token)
    chatHistory = serializeMessage(messages.getAllMessages(email=email))
    fileUploads = serializeUpload(uploads.getAllUploads(email=email))
    
    if tokenUid == credentials.uid:
        response = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": status.HTTP_200_OK,
                "message": "Token Valid!",
                "chatHistory": chatHistory,
                "fileUploads": fileUploads
            },
        )
        response.set_cookie(key="name", value=name)
        response.set_cookie(key="email", value=email)
        response.set_cookie(key="token", value=credentials.token)
        response.set_cookie(key="uid", value=tokenUid)

        return response

    else:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": status.HTTP_400_BAD_REQUEST,
                "errors": ["Invalid token/uid!"],
            },
        )


@router.post("/google/verify")
async def verify(
    token: Annotated[Union[str, None], Cookie()],
    uid: Annotated[Union[str, None], Cookie()],
):
    try:

        tokenUid, _, email = firebaseAdmin.verifyJWTToken(token)
        assert tokenUid == uid
        assert tokenUid != None
        chatHistory = serializeMessage(messages.getAllMessages(email=email))
        fileUploads = serializeUpload(uploads.getAllUploads(email=email))
        
        response = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": status.HTTP_200_OK,
                "message": "Token Valid!",
                "chatHistory": chatHistory,
                "fileUploads": fileUploads
            },
        )
        return response
    except:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": status.HTTP_400_BAD_REQUEST,
                "errors": ["Invalid token/uid!"],
            },
        )
