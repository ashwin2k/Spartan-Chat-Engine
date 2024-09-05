from llama_index.llms.ollama import Ollama
from llama_index.postprocessor.rankgpt_rerank import RankGPTRerank
from llama_index.core import QueryBundle
from llama_index.core.schema import NodeWithScore
from typing import List


def reRankDocuments(
    retrievedNodes: List[NodeWithScore], queryBundle: QueryBundle, llm: Ollama
):
    reranker = RankGPTRerank(
        llm=llm,
        top_n=5,
        verbose=False,
    )
    reRankedNodes = reranker.postprocess_nodes(retrievedNodes, queryBundle)

    return reRankedNodes
