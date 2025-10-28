from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login endpoint - creates a session
    """
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'message': 'Invalid credentials',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        user_serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': 'Login successful',
            'data': {
                'user': user_serializer.data
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'success': False,
            'message': 'Invalid username or password'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Logout endpoint - destroys the session
    """
    logout(request)
    return Response({
        'success': True,
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """
    Get current user profile
    """
    serializer = UserSerializer(request.user)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """
    Update current user profile
    """
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Profile updated successfully',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'message': 'Failed to update profile',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    User registration endpoint
    """
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': 'Registration successful',
            'data': user_serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Registration failed',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth_view(request):
    """
    Check if user is authenticated
    """
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({
            'success': True,
            'authenticated': True,
            'data': serializer.data
        })
    
    return Response({
        'success': True,
        'authenticated': False
    })

