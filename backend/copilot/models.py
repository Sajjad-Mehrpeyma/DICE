from django.db import models
from django.contrib.auth.models import User


class ChatSession(models.Model):
    """
    Represents a chat session with the AI copilot
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    context = models.TextField(blank=True)
    title = models.CharField(max_length=200, blank=True, default='New Chat')

    def __str__(self):
        return f"Session {self.id} - {self.user.username}"

    class Meta:
        db_table = 'chat_sessions'
        ordering = ['-updated_at']


class ChatMessage(models.Model):
    """
    Represents a message in a chat session
    """
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    sources = models.JSONField(default=list, blank=True)  # Retrieved documents
    confidence = models.FloatField(null=True, blank=True)
    model_version = models.CharField(max_length=50, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role}: {self.content[:50]}"

    class Meta:
        db_table = 'chat_messages'
        ordering = ['timestamp']

