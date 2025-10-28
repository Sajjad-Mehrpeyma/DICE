"""
Standard API response formats
"""

from rest_framework.response import Response
from rest_framework import status


def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """
    Standard success response format
    """
    return Response({
        'success': True,
        'message': message,
        'data': data
    }, status=status_code)


def error_response(message="An error occurred", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Standard error response format
    """
    return Response({
        'success': False,
        'message': message,
        'errors': errors
    }, status=status_code)


def paginated_response(data, page, total_pages, total_count, message="Success"):
    """
    Standard paginated response format
    """
    return Response({
        'success': True,
        'message': message,
        'data': data,
        'pagination': {
            'page': page,
            'total_pages': total_pages,
            'total_count': total_count
        }
    })

