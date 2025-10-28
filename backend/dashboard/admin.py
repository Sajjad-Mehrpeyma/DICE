from django.contrib import admin
from .models import KPI, Metric, Insight


class MetricInline(admin.TabularInline):
    model = Metric
    extra = 0
    readonly_fields = ['timestamp']


class InsightInline(admin.TabularInline):
    model = Insight
    extra = 0
    readonly_fields = ['generated_at']


@admin.register(KPI)
class KPIAdmin(admin.ModelAdmin):
    list_display = ['kpi_id', 'title', 'category', 'current_value', 'change_percent', 'change_type', 'updated_at']
    list_filter = ['category', 'change_type']
    search_fields = ['kpi_id', 'title']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [MetricInline, InsightInline]


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ['id', 'kpi', 'value', 'timestamp']
    list_filter = ['kpi', 'timestamp']
    search_fields = ['kpi__kpi_id', 'kpi__title']
    readonly_fields = ['timestamp']


@admin.register(Insight)
class InsightAdmin(admin.ModelAdmin):
    list_display = ['id', 'kpi', 'content_preview', 'confidence', 'generated_at']
    list_filter = ['generated_at', 'kpi']
    search_fields = ['kpi__kpi_id', 'content']
    readonly_fields = ['generated_at']
    
    def content_preview(self, obj):
        return obj.content[:100] + ('...' if len(obj.content) > 100 else '')
    content_preview.short_description = 'Content'

