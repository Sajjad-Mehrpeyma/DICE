"""
Elasticsearch service for indexing and searching documents
"""

from elasticsearch import Elasticsearch
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class ElasticsearchService:
    """
    Service for managing Elasticsearch operations
    """
    
    def __init__(self):
        self.es = Elasticsearch([settings.ES_HOST])
        self.news_index = settings.ES_INDEX_NEWS
        self.docs_index = settings.ES_INDEX_DOCS
    
    def create_index(self, index_name, mapping=None):
        """
        Create an index with specified mapping
        """
        if mapping is None:
            mapping = self._get_default_mapping()
        
        try:
            if not self.es.indices.exists(index=index_name):
                self.es.indices.create(index=index_name, body=mapping)
                logger.info(f"Created index: {index_name}")
            else:
                logger.info(f"Index already exists: {index_name}")
        except Exception as e:
            logger.error(f"Error creating index {index_name}: {str(e)}")
            raise
    
    def _get_default_mapping(self):
        """
        Get default mapping for document index with vector search
        """
        return {
            "mappings": {
                "properties": {
                    "text": {"type": "text"},
                    "title": {"type": "text"},
                    "embedding": {
                        "type": "dense_vector",
                        "dims": settings.EMBEDDING_DIMENSION,
                        "index": True,
                        "similarity": "cosine"
                    },
                    "source": {"type": "keyword"},
                    "source_id": {"type": "keyword"},
                    "timestamp": {"type": "date"},
                    "metadata": {"type": "object", "enabled": False}
                }
            }
        }
    
    def index_document(self, index_name, doc_id, document):
        """
        Index a single document
        """
        try:
            response = self.es.index(
                index=index_name,
                id=doc_id,
                body=document
            )
            return response
        except Exception as e:
            logger.error(f"Error indexing document {doc_id}: {str(e)}")
            raise
    
    def bulk_index(self, index_name, documents):
        """
        Bulk index multiple documents
        """
        from elasticsearch.helpers import bulk
        
        actions = [
            {
                "_index": index_name,
                "_id": doc.get('id'),
                "_source": doc
            }
            for doc in documents
        ]
        
        try:
            success, errors = bulk(self.es, actions)
            logger.info(f"Bulk indexed {success} documents")
            if errors:
                logger.error(f"Bulk index errors: {errors}")
            return success, errors
        except Exception as e:
            logger.error(f"Error bulk indexing: {str(e)}")
            raise
    
    def search_text(self, index_name, query, size=10):
        """
        Full-text search
        """
        body = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["title^2", "text"]
                }
            },
            "size": size
        }
        
        try:
            response = self.es.search(index=index_name, body=body)
            return response['hits']['hits']
        except Exception as e:
            logger.error(f"Error searching text: {str(e)}")
            raise
    
    def search_vector(self, index_name, query_vector, size=10):
        """
        Vector similarity search (kNN)
        """
        body = {
            "knn": {
                "field": "embedding",
                "query_vector": query_vector,
                "k": size,
                "num_candidates": size * 10
            }
        }
        
        try:
            response = self.es.search(index=index_name, body=body)
            return response['hits']['hits']
        except Exception as e:
            logger.error(f"Error searching vector: {str(e)}")
            raise
    
    def hybrid_search(self, index_name, query_text, query_vector, size=10):
        """
        Hybrid search combining text and vector search
        """
        body = {
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": query_text,
                                "fields": ["title^2", "text"]
                            }
                        }
                    ]
                }
            },
            "knn": {
                "field": "embedding",
                "query_vector": query_vector,
                "k": size,
                "num_candidates": size * 10
            },
            "size": size
        }
        
        try:
            response = self.es.search(index=index_name, body=body)
            return response['hits']['hits']
        except Exception as e:
            logger.error(f"Error hybrid search: {str(e)}")
            raise
    
    def delete_document(self, index_name, doc_id):
        """
        Delete a document by ID
        """
        try:
            response = self.es.delete(index=index_name, id=doc_id)
            return response
        except Exception as e:
            logger.error(f"Error deleting document {doc_id}: {str(e)}")
            raise
    
    def check_connection(self):
        """
        Check if Elasticsearch is connected
        """
        try:
            return self.es.ping()
        except Exception as e:
            logger.error(f"Elasticsearch connection check failed: {str(e)}")
            return False


# Singleton instance
_es_service = None

def get_elasticsearch_service():
    """
    Get singleton Elasticsearch service instance
    """
    global _es_service
    if _es_service is None:
        _es_service = ElasticsearchService()
    return _es_service

