"""
RAG (Retrieval-Augmented Generation) service using LangChain
"""

from django.conf import settings
from sources.elasticsearch_service import get_elasticsearch_service
from sources.embedding_service import get_embedding_service
import logging
import openai

logger = logging.getLogger(__name__)


class RAGService:
    """
    Service for RAG pipeline with LangChain
    """
    
    def __init__(self):
        self.es_service = get_elasticsearch_service()
        self.embedding_service = get_embedding_service()
        self.openai_model = settings.OPENAI_MODEL
        openai.api_key = settings.OPENAI_API_KEY
    
    def query(self, user_query, context="", session_history=None):
        """
        Process a query through the RAG pipeline
        
        Args:
            user_query: The user's question
            context: Additional context (optional)
            session_history: List of previous messages (optional)
        
        Returns:
            dict with answer, sources, confidence, model_version
        """
        try:
            # Step 1: Generate query embedding
            query_embedding = self.embedding_service.embed_text(user_query)
            
            # Step 2: Retrieve relevant documents from Elasticsearch
            try:
                docs = self.es_service.search_vector(
                    settings.ES_INDEX_NEWS,
                    query_embedding,
                    size=5
                )
            except Exception as e:
                logger.warning(f"Vector search failed, falling back to text search: {str(e)}")
                docs = self.es_service.search_text(
                    settings.ES_INDEX_NEWS,
                    user_query,
                    size=5
                )
            
            # Step 3: Build context from retrieved documents
            context_text = self._build_context(docs, context)
            
            # Step 4: Build conversation history
            messages = self._build_messages(user_query, context_text, session_history)
            
            # Step 5: Query OpenAI
            response = self._query_openai(messages)
            
            # Step 6: Format and return response
            return {
                'answer': response,
                'sources': self._format_sources(docs),
                'confidence': self._calculate_confidence(docs),
                'model_version': self.openai_model
            }
        
        except Exception as e:
            logger.error(f"RAG query error: {str(e)}")
            raise
    
    def _build_context(self, docs, additional_context=""):
        """
        Build context string from retrieved documents
        """
        if not docs:
            return additional_context
        
        context_parts = []
        
        for i, doc in enumerate(docs, 1):
            source = doc.get('_source', {})
            title = source.get('title', 'Untitled')
            text = source.get('text', source.get('content', ''))
            
            context_parts.append(f"[Document {i}]\nTitle: {title}\nContent: {text[:500]}...")
        
        context_text = "\n\n".join(context_parts)
        
        if additional_context:
            context_text = f"{additional_context}\n\n{context_text}"
        
        return context_text
    
    def _build_messages(self, user_query, context_text, session_history=None):
        """
        Build message array for OpenAI
        """
        messages = [
            {
                "role": "system",
                "content": """You are an intelligent business analytics assistant for DICE (Data Intelligence & Copilot Engine).
Your role is to help users understand their data, provide insights, and answer questions based on the available context.

Guidelines:
- Provide clear, concise, and actionable answers
- Always cite sources when using retrieved documents
- If you're uncertain, say so
- Focus on business impact and practical recommendations
- Use bullet points for clarity when appropriate"""
            }
        ]
        
        # Add session history if available
        if session_history:
            for msg in session_history[-5:]:  # Last 5 messages for context
                messages.append({
                    "role": msg.get('role', 'user'),
                    "content": msg.get('content', '')
                })
        
        # Add context and current query
        messages.append({
            "role": "user",
            "content": f"""Context from knowledge base:
{context_text}

Question: {user_query}

Please provide a helpful answer based on the context above. Include citations to specific documents when relevant."""
        })
        
        return messages
    
    def _query_openai(self, messages):
        """
        Query OpenAI API
        """
        try:
            response = openai.ChatCompletion.create(
                model=self.openai_model,
                messages=messages,
                temperature=0.7,
                max_tokens=500
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            # Fallback response if OpenAI fails
            return "I apologize, but I'm currently unable to process your request. Please try again later."
    
    def _format_sources(self, docs):
        """
        Format retrieved documents as sources
        """
        sources = []
        
        for doc in docs:
            source_data = doc.get('_source', {})
            sources.append({
                'id': doc.get('_id'),
                'title': source_data.get('title', 'Untitled'),
                'snippet': source_data.get('text', source_data.get('content', ''))[:200] + '...',
                'source': source_data.get('source', 'Unknown'),
                'relevance': doc.get('_score', 0)
            })
        
        return sources
    
    def _calculate_confidence(self, docs):
        """
        Calculate confidence score based on retrieval scores
        """
        if not docs:
            return 0.3
        
        # Use the top document's score as confidence
        top_score = docs[0].get('_score', 0)
        
        # Normalize score to 0-1 range (ES scores can vary widely)
        # This is a simple heuristic
        confidence = min(top_score / 10.0, 1.0)
        confidence = max(confidence, 0.3)  # Minimum confidence of 0.3
        
        return round(confidence, 2)


# Singleton instance
_rag_service = None

def get_rag_service():
    """
    Get singleton RAG service instance
    """
    global _rag_service
    if _rag_service is None:
        _rag_service = RAGService()
    return _rag_service

