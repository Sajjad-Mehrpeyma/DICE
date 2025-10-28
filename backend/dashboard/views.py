from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import KPI, Metric, Insight
from .serializers import KPISerializer, KPIListSerializer, InsightSerializer
from .kpi_service import get_kpi_service
from .insight_generator import get_insight_generator
from core.responses import success_response, error_response
import logging

logger = logging.getLogger(__name__)


class KPIViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for KPIs
    """
    queryset = KPI.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return KPIListSerializer
        return KPISerializer
    
    def list(self, request):
        """
        List all KPIs grouped by category
        """
        kpi_service = get_kpi_service()
        kpis_by_category = kpi_service.get_all_kpis()
        return success_response(kpis_by_category)
    
    def retrieve(self, request, pk=None):
        """
        Get detailed KPI with metrics and insights
        """
        try:
            kpi = self.get_queryset().get(kpi_id=pk)
            serializer = self.get_serializer(kpi)
            return success_response(serializer.data)
        except KPI.DoesNotExist:
            return error_response("KPI not found", status_code=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['get'])
    def sparkline(self, request, pk=None):
        """
        Get KPI with sparkline data
        """
        days = int(request.query_params.get('days', 7))
        kpi_service = get_kpi_service()
        data = kpi_service.get_kpi_with_sparkline(pk, days=days)
        
        if data:
            return success_response(data)
        else:
            return error_response("KPI not found", status_code=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['get'])
    def trend(self, request, pk=None):
        """
        Get trend analysis for KPI
        """
        days = int(request.query_params.get('days', 30))
        kpi_service = get_kpi_service()
        trend = kpi_service.calculate_trend(pk, days=days)
        
        return success_response({'kpi_id': pk, 'trend': trend})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_overview_view(request):
    """
    Get dashboard overview with summary statistics
    """
    kpi_service = get_kpi_service()
    kpis = kpi_service.get_all_kpis()
    
    # Calculate summary stats
    total_kpis = sum(len(kpis_list) for kpis_list in kpis.values())
    
    overview = {
        'total_kpis': total_kpis,
        'kpis_by_category': kpis,
        'last_updated': KPI.objects.latest('updated_at').updated_at if KPI.objects.exists() else None
    }
    
    return success_response(overview)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def kpi_insight_view(request, kpi_id):
    """
    Get or generate insight for a KPI
    """
    if request.method == 'GET':
        # Get latest insight
        try:
            kpi = KPI.objects.get(kpi_id=kpi_id)
            insight = kpi.insights.first()
            
            if insight:
                serializer = InsightSerializer(insight)
                return success_response(serializer.data)
            else:
                return success_response({'message': 'No insights available yet'})
        
        except KPI.DoesNotExist:
            return error_response("KPI not found", status_code=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        # Generate new insight
        try:
            insight_generator = get_insight_generator()
            result = insight_generator.generate_insight_for_kpi(kpi_id)
            
            if result:
                return success_response(result, message="Insight generated successfully")
            else:
                return error_response("Failed to generate insight")
        
        except Exception as e:
            logger.error(f"Error generating insight: {str(e)}")
            return error_response("Failed to generate insight", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def kpi_metrics_view(request, kpi_id):
    """
    Get time-series metrics for a KPI
    """
    try:
        kpi = KPI.objects.get(kpi_id=kpi_id)
        
        days = int(request.query_params.get('days', 30))
        dimension = request.query_params.get('dimension')
        
        kpi_service = get_kpi_service()
        
        if dimension:
            # Get aggregated metrics by dimension
            data = kpi_service.get_aggregated_metrics(kpi_id, dimension=dimension, days=days)
        else:
            # Get all metrics
            from django.utils import timezone
            from datetime import timedelta
            
            end_date = timezone.now()
            start_date = end_date - timedelta(days=days)
            
            metrics = Metric.objects.filter(
                kpi=kpi,
                timestamp__gte=start_date
            ).order_by('timestamp')
            
            data = [
                {
                    'timestamp': m.timestamp.isoformat(),
                    'value': m.value,
                    'dimensions': m.dimensions
                }
                for m in metrics
            ]
        
        return success_response(data)
    
    except KPI.DoesNotExist:
        return error_response("KPI not found", status_code=status.HTTP_404_NOT_FOUND)

