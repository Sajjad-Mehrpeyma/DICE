from rest_framework import serializers
from .models import DataSource, Document, UploadedFile


class DataSourceSerializer(serializers.ModelSerializer):
    """
    Serializer for DataSource model
    """
    class Meta:
        model = DataSource
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class DocumentSerializer(serializers.ModelSerializer):
    """
    Serializer for Document model
    """
    source_name = serializers.CharField(source='source.name', read_only=True)
    
    class Meta:
        model = Document
        fields = ['id', 'source', 'source_name', 'title', 'content', 'metadata', 'elasticsearch_id', 'created_at']
        read_only_fields = ['created_at', 'updated_at']


class UploadedFileSerializer(serializers.ModelSerializer):
    """
    Serializer for UploadedFile model
    """
    class Meta:
        model = UploadedFile
        fields = ['id', 'filename', 'file_type', 'status', 'error_message', 'created_at', 'processed_at']
        read_only_fields = ['id', 'created_at', 'processed_at', 'status', 'error_message']


class FileUploadSerializer(serializers.Serializer):
    """
    Serializer for file upload
    """
    file = serializers.FileField(required=True)
    source_id = serializers.CharField(required=False, allow_blank=True)

