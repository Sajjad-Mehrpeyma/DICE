from django.test import TestCase
from django.contrib.auth.models import User
from .models import ChatSession, ChatMessage


class CopilotTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.session = ChatSession.objects.create(user=self.user)
    
    def test_session_creation(self):
        self.assertEqual(self.session.user, self.user)
        self.assertEqual(self.session.messages.count(), 0)
    
    def test_message_creation(self):
        message = ChatMessage.objects.create(
            session=self.session,
            role='user',
            content='Test message'
        )
        self.assertEqual(message.role, 'user')
        self.assertEqual(self.session.messages.count(), 1)

