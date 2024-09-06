from llama_index.core import Settings
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.ollama import Ollama


def getEmbeddingModel():
    llm = OllamaEmbedding(
        model_name="llama3.1",
        base_url="http://localhost:11434",
        ollama_additional_kwargs={"mirostat": 0},
    )
    Settings.embed_model = llm

    return llm


def getLLM():
    llm = Ollama(model="mistral", request_timeout=60.0)
    Settings.llm = llm

    return llm
