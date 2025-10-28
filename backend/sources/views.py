from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, parser_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.utils import timezone
from .models import DataSource, Document, UploadedFile
from .serializers import DataSourceSerializer, DocumentSerializer, UploadedFileSerializer, FileUploadSerializer
from core.responses import success_response, error_response
from core.pagination import StandardPagination
import logging

logger = logging.getLogger(__name__)


class DataSourceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing data sources
    """
    queryset = DataSource.objects.all()
    serializer_class = DataSourceSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination
    
    def list(self, request):
        """
        List all data sources
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(serializer.data)
    
    def retrieve(self, request, pk=None):
        """
        Get a specific data source
        """
        try:
            source = self.get_object()
            serializer = self.get_serializer(source)
            return success_response(serializer.data)
        except DataSource.DoesNotExist:
            return error_response("Data source not found", status_code=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['post'])
    def sync(self, request, pk=None):
        """
        Trigger sync for a data source
        """
        try:
            source = self.get_object()
            source.last_sync = timezone.now()
            source.status = 'connected'
            source.save()
            return success_response(message=f"Sync triggered for {source.name}")
        except DataSource.DoesNotExist:
            return error_response("Data source not found", status_code=status.HTTP_404_NOT_FOUND)


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing documents
    """
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination
    
    def list(self, request):
        """
        List all documents
        """
        queryset = self.get_queryset()
        
        # Filter by source if provided
        source_id = request.query_params.get('source')
        if source_id:
            queryset = queryset.filter(source_id=source_id)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return success_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_file_view(request):
    """
    Upload and process a file
    """
    serializer = FileUploadSerializer(data=request.data)
    
    if not serializer.is_valid():
        return error_response("Invalid file upload", errors=serializer.errors)
    
    uploaded_file = serializer.validated_data['file']
    source_id = serializer.validated_data.get('source_id', 'csv-upload')
    
    # Validate file type
    allowed_types = ['text/csv', 'application/json', 'text/plain', 'application/pdf']
    if uploaded_file.content_type not in allowed_types:
        return error_response(f"File type {uploaded_file.content_type} not supported")
    
    # Get or create data source
    try:
        source = DataSource.objects.get(id=source_id)
    except DataSource.DoesNotExist:
        source = DataSource.objects.create(
            id=source_id,
            name='CSV Upload',
            connector_type='csv',
            status='connected',
            is_enabled=True
        )
    
    # Create uploaded file record
    file_record = UploadedFile.objects.create(
        user=request.user,
        file=uploaded_file,
        filename=uploaded_file.name,
        file_type=uploaded_file.content_type,
        status='pending'
    )
    
    # TODO: Trigger async processing (for V1, just mark as completed)
    file_record.status = 'processing'
    file_record.save()
    
    logger.info(f"File uploaded: {uploaded_file.name} by user {request.user.username}")
    
    return success_response(
        data={
            'file_id': file_record.id,
            'filename': file_record.filename,
            'status': file_record.status
        },
        message="File uploaded successfully",
        status_code=status.HTTP_201_CREATED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def uploaded_files_view(request):
    """
    List uploaded files for current user
    """
    files = UploadedFile.objects.filter(user=request.user)
    serializer = UploadedFileSerializer(files, many=True)
    return success_response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def n8n_webhook_view(request):
    """
    Webhook endpoint for n8n integration
    """
    from django.conf import settings
    from core.permissions import IsAuthenticatedOrWebhook
    
    # Validate webhook secret
    webhook_secret = request.META.get('HTTP_X_WEBHOOK_SECRET')
    if webhook_secret != settings.N8N_WEBHOOK_SECRET:
        return error_response("Invalid webhook secret", status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Process webhook data
    data = request.data
    logger.info(f"Received n8n webhook data: {data}")
    
    # TODO: Process and store webhook data
    
    return success_response(message="Webhook received successfully")

