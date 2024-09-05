from schemas import Message
from webSearchController import searchWeb
from llama_index.core import VectorStoreIndex, Document, StorageContext
from db import chroma


def loadDocuments(prompt: Message):
    webDocuments = searchWeb(prompt)
    return webDocuments


def getContextAugmentation(prompt: Message):
    documents = loadDocuments(prompt)
    vectorIndex = VectorStoreIndex.from_documents(
        documents, storage_context=chroma.getStorageContext()
    )
    query_engine = vectorIndex.as_query_engine()
    streaming_response = query_engine.query("Who is Elon Musk.")
    streaming_response.print_response_stream()
