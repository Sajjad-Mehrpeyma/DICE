from django.contrib import admin
from .models import ChatSession, ChatMessage


class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ['timestamp']


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['user__username', 'title']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [ChatMessageInline]


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'session', 'role', 'content_preview', 'timestamp']
    list_filter = ['role', 'timestamp']
    search_fields = ['content', 'session__user__username']
    readonly_fields = ['timestamp']
    
    def content_preview(self, obj):
        return obj.content[:100] + ('...' if len(obj.content) > 100 else '')
    content_preview.short_description = 'Content'

