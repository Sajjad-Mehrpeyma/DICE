"""
Embedding service using sentence-transformers
"""

from sentence_transformers import SentenceTransformer
from django.conf import settings
import logging
import numpy as np

logger = logging.getLogger(__name__)


class EmbeddingService:
    """
    Service for generating embeddings using sentence-transformers
    """
    
    def __init__(self):
        self.model = None
        self.model_name = settings.EMBEDDING_MODEL
        self.dimension = settings.EMBEDDING_DIMENSION
    
    def load_model(self):
        """
        Load the embedding model (lazy loading)
        """
        if self.model is None:
            try:
                logger.info(f"Loading embedding model: {self.model_name}")
                self.model = SentenceTransformer(self.model_name)
                logger.info("Embedding model loaded successfully")
            except Exception as e:
                logger.error(f"Error loading embedding model: {str(e)}")
                raise
    
    def embed_text(self, text):
        """
        Generate embedding for a single text
        """
        self.load_model()
        try:
            embedding = self.model.encode(text, convert_to_numpy=True)
            return embedding.tolist()
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
            raise
    
    def embed_batch(self, texts, batch_size=32):
        """
        Generate embeddings for multiple texts
        """
        self.load_model()
        try:
            embeddings = self.model.encode(
                texts,
                batch_size=batch_size,
                convert_to_numpy=True,
                show_progress_bar=True
            )
            return embeddings.tolist()
        except Exception as e:
            logger.error(f"Error generating batch embeddings: {str(e)}")
            raise
    
    def similarity(self, embedding1, embedding2):
        """
        Calculate cosine similarity between two embeddings
        """
        try:
            arr1 = np.array(embedding1)
            arr2 = np.array(embedding2)
            return np.dot(arr1, arr2) / (np.linalg.norm(arr1) * np.linalg.norm(arr2))
        except Exception as e:
            logger.error(f"Error calculating similarity: {str(e)}")
            raise


# Singleton instance
_embedding_service = None

def get_embedding_service():
    """
    Get singleton embedding service instance
    """
    global _embedding_service
    if _embedding_service is None:
        _embedding_service = EmbeddingService()
    return _embedding_service

