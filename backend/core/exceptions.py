"""
Custom exception classes for the DICE backend
"""

from rest_framework.exceptions import APIException
from rest_framework import status


class ServiceUnavailableException(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = 'Service temporarily unavailable, please try again later.'
    default_code = 'service_unavailable'


class ElasticsearchConnectionError(ServiceUnavailableException):
    default_detail = 'Cannot connect to search service.'
    default_code = 'elasticsearch_connection_error'


class OpenAIAPIError(ServiceUnavailableException):
    default_detail = 'AI service temporarily unavailable.'
    default_code = 'openai_api_error'


class FileProcessingError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Error processing uploaded file.'
    default_code = 'file_processing_error'


class InsufficientDataError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Insufficient data to complete the request.'
    default_code = 'insufficient_data'

