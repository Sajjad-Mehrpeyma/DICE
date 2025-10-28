"""
Service for calculating and aggregating KPIs
"""

from django.db.models import Avg, Sum, Count, Max, Min
from django.utils import timezone
from datetime import timedelta
from .models import KPI, Metric
import logging

logger = logging.getLogger(__name__)


class KPIService:
    """
    Service for KPI calculations and aggregations
    """
    
    def get_kpi_with_sparkline(self, kpi_id, days=7):
        """
        Get KPI with sparkline data
        """
        try:
            kpi = KPI.objects.get(kpi_id=kpi_id)
            
            # Get sparkline data (last N days)
            end_date = timezone.now()
            start_date = end_date - timedelta(days=days)
            
            metrics = Metric.objects.filter(
                kpi=kpi,
                timestamp__gte=start_date,
                timestamp__lte=end_date
            ).order_by('timestamp')
            
            sparkline_data = [
                {
                    'timestamp': m.timestamp.isoformat(),
                    'value': m.value
                }
                for m in metrics
            ]
            
            return {
                'id': kpi.kpi_id,
                'title': kpi.title,
                'category': kpi.category,
                'value': kpi.current_value,
                'change': float(kpi.change_percent),
                'changeType': kpi.change_type,
                'sparklineData': sparkline_data,
                'unit': kpi.unit
            }
        
        except KPI.DoesNotExist:
            logger.error(f"KPI not found: {kpi_id}")
            return None
    
    def get_all_kpis(self):
        """
        Get all KPIs grouped by category
        """
        kpis = KPI.objects.all()
        
        result = {}
        for kpi in kpis:
            category = kpi.category
            if category not in result:
                result[category] = []
            
            result[category].append({
                'id': kpi.kpi_id,
                'title': kpi.title,
                'value': kpi.current_value,
                'change': float(kpi.change_percent),
                'changeType': kpi.change_type,
                'unit': kpi.unit
            })
        
        return result
    
    def calculate_trend(self, kpi_id, days=30):
        """
        Calculate trend for a KPI
        """
        end_date = timezone.now()
        start_date = end_date - timedelta(days=days)
        
        metrics = Metric.objects.filter(
            kpi_id=kpi_id,
            timestamp__gte=start_date
        ).order_by('timestamp')
        
        if metrics.count() < 2:
            return 'stable'
        
        values = [m.value for m in metrics]
        
        # Simple trend detection
        first_half_avg = sum(values[:len(values)//2]) / (len(values)//2)
        second_half_avg = sum(values[len(values)//2:]) / (len(values) - len(values)//2)
        
        change_percent = ((second_half_avg - first_half_avg) / first_half_avg) * 100 if first_half_avg != 0 else 0
        
        if change_percent > 5:
            return 'increasing'
        elif change_percent < -5:
            return 'decreasing'
        else:
            return 'stable'
    
    def get_aggregated_metrics(self, kpi_id, dimension=None, days=30):
        """
        Get aggregated metrics by dimension
        """
        end_date = timezone.now()
        start_date = end_date - timedelta(days=days)
        
        metrics = Metric.objects.filter(
            kpi_id=kpi_id,
            timestamp__gte=start_date
        )
        
        if dimension:
            # Group by dimension (e.g., channel, product)
            result = {}
            for metric in metrics:
                dim_value = metric.dimensions.get(dimension, 'Unknown')
                if dim_value not in result:
                    result[dim_value] = []
                result[dim_value].append(metric.value)
            
            # Calculate averages
            return {
                dim: sum(values) / len(values) if values else 0
                for dim, values in result.items()
            }
        else:
            # Overall average
            avg = metrics.aggregate(Avg('value'))
            return avg['value__avg'] or 0


# Singleton instance
_kpi_service = None

def get_kpi_service():
    """
    Get singleton KPI service instance
    """
    global _kpi_service
    if _kpi_service is None:
        _kpi_service = KPIService()
    return _kpi_service

