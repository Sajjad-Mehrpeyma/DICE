from django.test import TestCase
from django.contrib.auth.models import User
from .models import DataSource, Document, UploadedFile


class SourcesTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.source = DataSource.objects.create(
            id='test-source',
            name='Test Source',
            connector_type='csv',
            status='connected'
        )
    
    def test_data_source_creation(self):
        self.assertEqual(self.source.name, 'Test Source')
        self.assertEqual(self.source.connector_type, 'csv')
    
    def test_document_creation(self):
        doc = Document.objects.create(
            source=self.source,
            title='Test Document',
            content='This is a test document',
            elasticsearch_id='test-doc-1'
        )
        self.assertEqual(doc.title, 'Test Document')
        self.assertEqual(doc.source, self.source)

