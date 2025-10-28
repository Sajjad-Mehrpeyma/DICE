from django.db import models
from django.contrib.auth.models import User


class DataSource(models.Model):
    """
    Represents a data connector/source
    """
    CONNECTOR_TYPES = [
        ('google-analytics', 'Google Analytics'),
        ('google-ads', 'Google Ads'),
        ('facebook-ads', 'Facebook Ads'),
        ('shopify', 'Shopify'),
        ('csv', 'CSV Upload'),
        ('webhook', 'Generic Webhook'),
        ('news', 'News Feed'),
    ]
    
    STATUS_CHOICES = [
        ('connected', 'Connected'),
        ('disconnected', 'Disconnected'),
        ('error', 'Error'),
        ('pending', 'Pending'),
    ]
    
    HEALTH_CHOICES = [
        ('good', 'Good'),
        ('warning', 'Warning'),
        ('error', 'Error'),
        ('unknown', 'Unknown'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=200)
    connector_type = models.CharField(max_length=50, choices=CONNECTOR_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    health = models.CharField(max_length=20, choices=HEALTH_CHOICES, default='unknown')
    last_sync = models.DateTimeField(null=True, blank=True)
    config = models.JSONField(default=dict, blank=True)  # API keys, settings
    is_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.connector_type})"

    class Meta:
        db_table = 'data_sources'


class Document(models.Model):
    """
    Represents a document indexed in Elasticsearch
    """
    source = models.ForeignKey(DataSource, on_delete=models.CASCADE, related_name='documents')
    content = models.TextField()
    title = models.CharField(max_length=500)
    metadata = models.JSONField(default=dict, blank=True)
    elasticsearch_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'documents'
        ordering = ['-created_at']


class UploadedFile(models.Model):
    """
    Represents an uploaded file for processing
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    processed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.filename} ({self.status})"

    class Meta:
        db_table = 'uploaded_files'
        ordering = ['-created_at']

