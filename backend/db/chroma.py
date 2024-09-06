from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext, VectorStoreIndex
import chromadb
from utils.llm import getEmbeddingModel

db = chromadb.PersistentClient(path="./vectors")


def getStorageContext(uid):
    defaultCollection = db.get_or_create_collection(f"RAG-{uid}")
    vectorStore = ChromaVectorStore(chroma_collection=defaultCollection)

    storageContext = StorageContext.from_defaults(vector_store=vectorStore)
    return storageContext


def getVectorStoreIndex(uid):
    defaultCollection = db.get_or_create_collection(f"RAG-{uid}")
    vectorStore = ChromaVectorStore(chroma_collection=defaultCollection)
    index = VectorStoreIndex.from_vector_store(
        vectorStore, embed_model=getEmbeddingModel()
    )
    return index
