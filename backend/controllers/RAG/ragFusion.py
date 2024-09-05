from llama_index.core import PromptTemplate
from schemas import Message
from typing import List

baseQuery = (
    "You are a helpful assistant that generates multiple search queries based on a "
    "single input query. Generate {numQueries} search queries, one on each line, "
    "related to the following input query:\n"
    "Query: {query}\n"
    "Queries:\n"
)
baseTemplate = PromptTemplate(baseQuery)


def generateQueries(llm, query: Message, numQueries=3) -> List[str]:
    formattedPrompt = baseTemplate.format(
        numQueries=numQueries - 1, query=query.message
    )
    response = llm.complete(formattedPrompt)
    queries: List[str] = response.text.split("\n")
    queries.append(query.message)
    return queries
