from schemas import Message
from controllers.webSearchController import searchWeb
from llama_index.core import VectorStoreIndex,Settings,QueryBundle
from db import chroma
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.retrievers import VectorIndexRetriever
from .reRank import reRankDocuments
from .ragFusion import generateQueries
from llama_index.llms.ollama import Ollama
from llama_index.core.schema import NodeWithScore
from typing import List

def getEmbeddingModel():
    llm = OllamaEmbedding(
        model_name="llama3.1",
        base_url="http://localhost:11434",
        ollama_additional_kwargs={"mirostat": 0},
    )
    Settings.embed_model = llm

    return llm

def getLLM():
    llm = Ollama(
        model="mistral",
        request_timeout=60.0
    )
    Settings.llm = llm

    return llm
    
def loadDocuments(prompts: List[str]):
    docs = []
    for prompt in prompts:   
        webDocuments = searchWeb(prompt)
        docs.extend(webDocuments)
    return docs


def getContextAugmentation(prompt: Message):
    embed_model= getEmbeddingModel()
    llm= getLLM()
    additionalQueries = generateQueries(llm,prompt)
    
    documents = loadDocuments(additionalQueries)

    vectorIndex = VectorStoreIndex.from_documents(
        documents, storage_context=chroma.getStorageContext(), embed_model=embed_model
    )
    queryBundle = QueryBundle(prompt.message)
    retriever = VectorIndexRetriever(
        embed_model=embed_model,
        index=vectorIndex,
        similarity_top_k=10,
    )
    retrievedNodes:List[NodeWithScore] = retriever.retrieve(queryBundle)
    reRankedNodes = reRankDocuments(retrievedNodes,queryBundle,llm)
    return reRankedNodes
