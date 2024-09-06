from fastapi import Cookie, UploadFile, APIRouter
from typing import Annotated, Union
from services import firebaseAdmin
from models.mongo.uploads import FileUpload
from utils import pdfReader
from models.chroma.embedding import addPdfdocs

router = APIRouter()


@router.post("/upload")
async def fileUpload(file: UploadFile, token: Annotated[Union[str, None], Cookie()]):
    uid, _, email = firebaseAdmin.verifyJWTToken(token)
    extractedText = pdfReader.parsePdf(file.file)
    FileUpload(email=email, text=extractedText, name=file.filename).save()
    addPdfdocs(extractedText, file.filename, uid)
    return {"text": extractedText}
