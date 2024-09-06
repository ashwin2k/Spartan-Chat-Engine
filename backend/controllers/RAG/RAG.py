from schemas import Message
from controllers.webSearchController import searchWeb
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
    return []


def getContextAugmentation(prompt: Message, uid: str):
    embed_model = getEmbeddingModel()
    llm = getLLM()

    documents = loadDocuments(prompt)

    vectorIndex = chroma.getVectorStoreIndex(uid)

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
        verbose=True,
    )

    retriever = QueryFusionRetriever(
        [baseRetriever, autoMergingRetriever],
        similarity_top_k=5,
        num_queries=4,  # set this to 1 to disable query generation
        mode="reciprocal_rerank",
        use_async=False,
        verbose=True,
    )

    retrievedNodes = retriever.retrieve(queryBundle)

    return retrievedNodes
