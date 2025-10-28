from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile


class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        UserProfile.objects.create(user=self.user)
    
    def test_login(self):
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'testuser',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
    
    def test_invalid_login(self):
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'testuser',
            'password': 'wrongpass'
        })
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.json()['success'])

