from rest_framework import serializers
from .models import ChatSession, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for ChatMessage model
    """
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'sources', 'confidence', 'timestamp']
        read_only_fields = ['id', 'timestamp']


class ChatSessionSerializer(serializers.ModelSerializer):
    """
    Serializer for ChatSession model
    """
    messages = ChatMessageSerializer(many=True, read_only=True)
    message_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ChatSession
        fields = ['id', 'title', 'created_at', 'updated_at', 'messages', 'message_count']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_message_count(self, obj):
        return obj.messages.count()


class ChatQuerySerializer(serializers.Serializer):
    """
    Serializer for chat query input
    """
    message = serializers.CharField(required=True)
    session_id = serializers.IntegerField(required=False, allow_null=True)
    context = serializers.CharField(required=False, allow_blank=True)

