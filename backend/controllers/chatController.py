from langchain_ollama import ChatOllama
from typing import List, Callable, AsyncIterator
from schemas import Message
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOllama(
    model="llama3.1",
    temperature=0.5,
)

getMessage: Callable[[Message], tuple] = lambda x: (x.userType.value, x.message)


def chatCompletion(
    messageHistory: List[Message], userMessage: Message
) -> AsyncIterator:
    chatList = list(map(getMessage, messageHistory))
    chatList.append(getMessage(userMessage))
    prompts = ChatPromptTemplate.from_messages(chatList)

    chain = prompts | llm

    # ai_msg = llm.invoke(chatList)
    # print(ai_msg)
    chunks = []
    return chain.astream({})
    # async for chunk in chain.astream({}):
    #     chunks.append(chunk)
    #     print(chunk.content, end="|", flush=True)
