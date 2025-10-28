from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer, ChatQuerySerializer
from .rag_service import get_rag_service
from core.responses import success_response, error_response
from core.exceptions import OpenAIAPIError
import logging

logger = logging.getLogger(__name__)


class ChatSessionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing chat sessions
    """
    serializer_class = ChatSessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)
    
    def list(self, request):
        """
        List all chat sessions for current user
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(serializer.data)
    
    def create(self, request):
        """
        Create a new chat session
        """
        session = ChatSession.objects.create(user=request.user)
        serializer = self.get_serializer(session)
        return success_response(
            serializer.data,
            message="Chat session created",
            status_code=status.HTTP_201_CREATED
        )
    
    def retrieve(self, request, pk=None):
        """
        Get a specific chat session with messages
        """
        session = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(session)
        return success_response(serializer.data)
    
    def destroy(self, request, pk=None):
        """
        Delete a chat session
        """
        session = get_object_or_404(self.get_queryset(), pk=pk)
        session.delete()
        return success_response(message="Chat session deleted")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_query_view(request):
    """
    Process a chat query through RAG pipeline
    """
    serializer = ChatQuerySerializer(data=request.data)
    
    if not serializer.is_valid():
        return error_response("Invalid query", errors=serializer.errors)
    
    message = serializer.validated_data['message']
    session_id = serializer.validated_data.get('session_id')
    context = serializer.validated_data.get('context', '')
    
    # Get or create session
    if session_id:
        try:
            session = ChatSession.objects.get(id=session_id, user=request.user)
        except ChatSession.DoesNotExist:
            return error_response("Session not found", status_code=status.HTTP_404_NOT_FOUND)
    else:
        session = ChatSession.objects.create(user=request.user)
    
    # Save user message
    user_message = ChatMessage.objects.create(
        session=session,
        role='user',
        content=message
    )
    
    # Get session history
    history = list(session.messages.values('role', 'content'))
    
    # Process through RAG service
    try:
        rag_service = get_rag_service()
        result = rag_service.query(
            user_query=message,
            context=context,
            session_history=history[:-1]  # Exclude the current message
        )
        
        # Save assistant message
        assistant_message = ChatMessage.objects.create(
            session=session,
            role='assistant',
            content=result['answer'],
            sources=result['sources'],
            confidence=result['confidence'],
            model_version=result['model_version']
        )
        
        # Update session title if it's the first message
        if session.messages.count() == 2:  # user + assistant
            session.title = message[:50] + ('...' if len(message) > 50 else '')
            session.save()
        
        # Prepare response
        response_data = {
            'session_id': session.id,
            'message': ChatMessageSerializer(assistant_message).data
        }
        
        return success_response(response_data, message="Query processed successfully")
    
    except Exception as e:
        logger.error(f"Error processing chat query: {str(e)}")
        return error_response(
            "Failed to process query. Please try again.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_history_view(request, session_id):
    """
    Get chat history for a session
    """
    try:
        session = ChatSession.objects.get(id=session_id, user=request.user)
        messages = session.messages.all()
        serializer = ChatMessageSerializer(messages, many=True)
        return success_response(serializer.data)
    except ChatSession.DoesNotExist:
        return error_response("Session not found", status_code=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clear_session_view(request, session_id):
    """
    Clear all messages in a session
    """
    try:
        session = ChatSession.objects.get(id=session_id, user=request.user)
        session.messages.all().delete()
        return success_response(message="Session cleared")
    except ChatSession.DoesNotExist:
        return error_response("Session not found", status_code=status.HTTP_404_NOT_FOUND)

