from rest_framework import serializers
from .models import KPI, Metric, Insight


class MetricSerializer(serializers.ModelSerializer):
    """
    Serializer for Metric model
    """
    class Meta:
        model = Metric
        fields = ['id', 'timestamp', 'value', 'dimensions']


class InsightSerializer(serializers.ModelSerializer):
    """
    Serializer for Insight model
    """
    class Meta:
        model = Insight
        fields = ['id', 'content', 'generated_at', 'confidence', 'model_version']


class KPISerializer(serializers.ModelSerializer):
    """
    Serializer for KPI model
    """
    recent_metrics = serializers.SerializerMethodField()
    latest_insight = serializers.SerializerMethodField()
    
    class Meta:
        model = KPI
        fields = ['kpi_id', 'title', 'category', 'description', 'current_value', 
                  'previous_value', 'change_percent', 'change_type', 'unit', 
                  'updated_at', 'recent_metrics', 'latest_insight']
    
    def get_recent_metrics(self, obj):
        metrics = obj.metrics.all()[:7]
        return MetricSerializer(metrics, many=True).data
    
    def get_latest_insight(self, obj):
        insight = obj.insights.first()
        return InsightSerializer(insight).data if insight else None


class KPIListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for KPI list
    """
    class Meta:
        model = KPI
        fields = ['kpi_id', 'title', 'category', 'current_value', 'change_percent', 
                  'change_type', 'unit', 'updated_at']

