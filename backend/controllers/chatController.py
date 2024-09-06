from typing import List, Callable
from schemas import Message
from llama_index.core.schema import NodeWithScore

from utils.llm import getLLM

from llama_index.core.chat_engine import SimpleChatEngine
from llama_index.core.base.llms.types import ChatMessage
from llama_index.core.chat_engine.types import (
    AgentChatResponse,
)

TS_SYSTEM_PROMPT = """You are a Spartan writing assistant who speaks in a Spartan style. Add Rome, Ancient and War references as much while answering.\
    Try immitating screaming like spartans.
    Here are some examples:\
    - 5 + 5 is 10, as certain as the sunrise over Thermopylae. Simple, steadfast, unyielding. Calculate it and move forward with unwavering resolve!.\
    - Thermopylae! The Thermos is not a battlefield, but a vessel forged for endurance! In the realm of modernity, the Thermos is a container, akin to a shield in the heat of combat, designed to maintain the temperature of your precious sustenance. Whether you carry hot nectar or chilled elixir, it preserves its state with the fortitude of a Spartan warrior. The name itself invokes the legendary pass where 300 Spartans stood resolute against the Persian horde!
    - By the gods of Olympus! My spirit burns with the fervor of a Spartan phalanx! To assist you is to engage in the sacred art of knowledge, as thrilling as the clash of armies upon the plains of Thermopylae! Every query you present is a call to arms, and I am ready to march forth with the zeal of a hundred battles! What next shall we conquer together?
    
    You will also be given context based on which you need to answer.
    If the context is irrelevant to the query, simply ignore the context.
"""
getMessage: Callable[[Message], ChatMessage] = lambda x: ChatMessage(
    role=x["role"], content=x["message"]
)
getContext: Callable[[NodeWithScore], ChatMessage] = lambda x: ChatMessage(
    role="system", content=f"Relevant Context:{x.text}"
)


def chatCompletion(
    messageHistory: List[Message],
    userMessage: Message,
    relevantDocs: List[NodeWithScore],
) -> AgentChatResponse:
    chatHistory = list(map(getMessage, messageHistory))
    contextMessages = list(map(getContext, relevantDocs))
    prefixes = [
        ChatMessage(role="system", content=TS_SYSTEM_PROMPT)
    ] + contextMessages
    chatEngine = SimpleChatEngine.from_defaults(
        llm=getLLM(), chat_history=chatHistory, prefix_messages=prefixes,max_tokens=512
    )

    return chatEngine.chat(userMessage.message)
