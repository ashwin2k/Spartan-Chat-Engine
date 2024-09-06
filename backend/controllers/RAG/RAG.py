from schemas import Message, RAGSystemType
from services.webSearchService import searchWeb
from llama_index.core import Settings, QueryBundle
from db import chroma
from llama_index.core.retrievers import AutoMergingRetriever
from typing import List
from utils.llm import getEmbeddingModel, getLLM
from llama_index.core.retrievers import QueryFusionRetriever

Settings.chunk_size = 128
Settings.chunk_overlap = 20


def loadDocuments(prompt: Message):
    docs = []
    if prompt.message.strip() != "":
        webDocuments = searchWeb(prompt.message)
        docs.extend(webDocuments)
    return docs


def getContextAugmentation(prompt: Message, uid: str):
    embed_model = getEmbeddingModel()
    llm = getLLM()
    documents = []
    vectorIndex = chroma.getVectorStoreIndex(uid)

    if prompt.rag == RAGSystemType.WEB:
        documents = loadDocuments(prompt)
        vectorIndex = vectorIndex.from_documents(
            documents,
            embed_model=embed_model,
        )
    else:
        vectorIndex = vectorIndex.from_documents(
            documents,
            storage_context=chroma.getStorageContext(uid),
            embed_model=embed_model,
        )

    queryBundle = QueryBundle(prompt.message)
    baseRetriever = vectorIndex.as_retriever(similarity_top_k=5)
    autoMergingRetriever = AutoMergingRetriever(
        baseRetriever,
        chroma.getStorageContext(uid),
        verbose=False,
    )

    retreivers = [baseRetriever]
    if prompt.rag == RAGSystemType.FILE:
        retreivers.append(autoMergingRetriever)

    retriever = QueryFusionRetriever(
        retreivers,
        similarity_top_k=5,
        num_queries=4,  # set this to 1 to disable query generation
        mode="reciprocal_rerank",
        use_async=False,
        verbose=False,
        llm=llm,
    )

    retrievedNodes = retriever.retrieve(queryBundle)

    return retrievedNodes
