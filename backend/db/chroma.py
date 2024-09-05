from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
import chromadb

db = chromadb.PersistentClient(path="./vectors")
defaultCollection = db.get_or_create_collection("RAG")

vectorStore = ChromaVectorStore(chroma_collection=defaultCollection)
storageContext = StorageContext.from_defaults(vector_store=vectorStore)


def getStorageContext():
    return storageContext


def getVectorStore():
    return vectorStore
