import firebase_admin
from firebase_admin import credentials, auth
from typing import Union
from utils.logger import logger
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred)


def verifyJWTToken(token: str) -> Union[str, None]:
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"], decoded_token["name"], decoded_token["email"]
    except Exception as e:
        logger.error(e)
        return None, None, None
