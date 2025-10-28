"""
Health check endpoint for monitoring
"""

from django.http import JsonResponse
from django.db import connection
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def health_check(request):
    """
    Health check endpoint that verifies:
    - Database connectivity
    - Elasticsearch connectivity (optional)
    - Overall system health
    """
    health_status = {
        'status': 'healthy',
        'checks': {}
    }
    
    # Check database
    try:
        connection.ensure_connection()
        health_status['checks']['database'] = 'healthy'
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        health_status['checks']['database'] = 'unhealthy'
        health_status['status'] = 'unhealthy'
    
    # Check Elasticsearch (optional, don't fail if not available)
    try:
        from elasticsearch import Elasticsearch
        es = Elasticsearch([settings.ES_HOST])
        if es.ping():
            health_status['checks']['elasticsearch'] = 'healthy'
        else:
            health_status['checks']['elasticsearch'] = 'unhealthy'
            # Don't mark overall status as unhealthy for ES
    except Exception as e:
        logger.warning(f"Elasticsearch health check failed: {str(e)}")
        health_status['checks']['elasticsearch'] = 'unavailable'
    
    status_code = 200 if health_status['status'] == 'healthy' else 503
    
    return JsonResponse(health_status, status=status_code)

