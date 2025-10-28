from django.contrib import admin
from .models import DataSource, Document, UploadedFile


@admin.register(DataSource)
class DataSourceAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'connector_type', 'status', 'health', 'is_enabled', 'last_sync']
    list_filter = ['connector_type', 'status', 'health', 'is_enabled']
    search_fields = ['id', 'name']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'source', 'created_at']
    list_filter = ['source', 'created_at']
    search_fields = ['title', 'content', 'elasticsearch_id']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'filename', 'user', 'file_type', 'status', 'created_at']
    list_filter = ['status', 'file_type', 'created_at']
    search_fields = ['filename', 'user__username']
    readonly_fields = ['created_at']

