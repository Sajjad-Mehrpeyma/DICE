"""
Custom permission classes
"""

from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner
        return obj.user == request.user


class IsAuthenticatedOrWebhook(permissions.BasePermission):
    """
    Allow authenticated users or valid webhook requests
    """

    def has_permission(self, request, view):
        # Check if user is authenticated
        if request.user and request.user.is_authenticated:
            return True
        
        # Check for webhook secret in headers
        from django.conf import settings
        webhook_secret = request.META.get('HTTP_X_WEBHOOK_SECRET')
        if webhook_secret and webhook_secret == settings.N8N_WEBHOOK_SECRET:
            return True
        
        return False

