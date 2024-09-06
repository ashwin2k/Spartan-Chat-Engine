from llama_index.core import Document
from typing import List
from db import chroma
from utils.llm import getEmbeddingModel
from llama_index.core import Settings


def createDocument(x: str, name: str) -> Document:
    return Document(text=x, metadata={"file": name, "type": "FILE"})


def addPdfdocs(extractedText: List[str], fileName: str, uid: str):
    embed_model = getEmbeddingModel()
    docs = [createDocument(text, fileName) for text in extractedText]
    Settings.chunk_size = 512
    Settings.chunk_overlap = 50
    vectorIndex = chroma.getVectorStoreIndex(uid)
    vectorIndex = vectorIndex.from_documents(
        docs,
        storage_context=chroma.getStorageContext(uid),
        embed_model=embed_model,
    )
