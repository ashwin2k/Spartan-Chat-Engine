from schemas import Message
from duckduckgo_search import DDGS
from schemas import DDGWebSearchResult
from llama_index.core import Document
from typing import List, Callable, AsyncIterator

createDocument: Callable[[DDGWebSearchResult], Document] = lambda x: Document(
    text=x.body, metadata={"title": x.title, "url": x.href}
)


def searchWeb(prompt: Message) -> List[Document]:
    results: List[DDGWebSearchResult] = DDGS().text(prompt.message, max_results=5)
    docs = list(map(createDocument, results))
    return docs
