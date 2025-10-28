"""
LLM-powered insight generator for KPIs
"""

from django.conf import settings
from .models import KPI, Metric, Insight
from django.utils import timezone
from datetime import timedelta
import openai
import logging

logger = logging.getLogger(__name__)


class InsightGenerator:
    """
    Generate AI-powered insights for KPIs
    """
    
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL
    
    def generate_insight_for_kpi(self, kpi_id):
        """
        Generate insight for a specific KPI
        """
        try:
            kpi = KPI.objects.get(kpi_id=kpi_id)
            
            # Get historical data
            end_date = timezone.now()
            start_date = end_date - timedelta(days=30)
            metrics = Metric.objects.filter(
                kpi=kpi,
                timestamp__gte=start_date
            ).order_by('-timestamp')[:30]
            
            if metrics.count() < 3:
                return self._create_generic_insight(kpi)
            
            # Build context
            values = [m.value for m in metrics]
            avg_value = sum(values) / len(values)
            trend = self._calculate_simple_trend(values)
            
            # Build prompt
            prompt = f"""Analyze this KPI and provide 2-3 sentence actionable insight:

KPI: {kpi.title}
Current Value: {kpi.current_value}
Change: {kpi.change_percent}% ({kpi.change_type})
Average (30 days): {avg_value:.2f}
Trend: {trend}

Provide actionable business insight focusing on:
1. What this change means
2. Potential causes
3. Recommended actions

Keep it concise and business-focused."""
            
            # Call OpenAI
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a business analytics expert providing actionable insights."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=150
            )
            
            insight_text = response.choices[0].message.content
            
            # Save insight
            insight = Insight.objects.create(
                kpi=kpi,
                content=insight_text,
                model_version=self.model,
                confidence=0.75
            )
            
            return {
                'kpi_id': kpi_id,
                'insight': insight_text,
                'generated_at': insight.generated_at.isoformat()
            }
        
        except KPI.DoesNotExist:
            logger.error(f"KPI not found: {kpi_id}")
            return None
        except Exception as e:
            logger.error(f"Error generating insight: {str(e)}")
            return self._create_fallback_insight(kpi_id)
    
    def _calculate_simple_trend(self, values):
        """
        Calculate simple trend direction
        """
        if len(values) < 2:
            return 'stable'
        
        first_half = values[:len(values)//2]
        second_half = values[len(values)//2:]
        
        first_avg = sum(first_half) / len(first_half)
        second_avg = sum(second_half) / len(second_half)
        
        if second_avg > first_avg * 1.05:
            return 'increasing'
        elif second_avg < first_avg * 0.95:
            return 'decreasing'
        else:
            return 'stable'
    
    def _create_generic_insight(self, kpi):
        """
        Create a generic insight when not enough data
        """
        insight_text = f"The {kpi.title} is currently at {kpi.current_value}. Continue monitoring this metric for trends."
        
        insight = Insight.objects.create(
            kpi=kpi,
            content=insight_text,
            confidence=0.3
        )
        
        return {
            'kpi_id': kpi.kpi_id,
            'insight': insight_text,
            'generated_at': insight.generated_at.isoformat()
        }
    
    def _create_fallback_insight(self, kpi_id):
        """
        Fallback insight if AI generation fails
        """
        return {
            'kpi_id': kpi_id,
            'insight': 'Insight generation temporarily unavailable. Please try again later.',
            'generated_at': timezone.now().isoformat()
        }


# Singleton instance
_insight_generator = None

def get_insight_generator():
    """
    Get singleton insight generator instance
    """
    global _insight_generator
    if _insight_generator is None:
        _insight_generator = InsightGenerator()
    return _insight_generator

