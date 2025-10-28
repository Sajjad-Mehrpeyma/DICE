from django.test import TestCase
from django.utils import timezone
from .models import KPI, Metric, Insight
from datetime import timedelta


class DashboardTestCase(TestCase):
    def setUp(self):
        self.kpi = KPI.objects.create(
            kpi_id='test-kpi',
            title='Test KPI',
            category='revenue',
            current_value='$10,000',
            change_percent=5.5,
            change_type='positive'
        )
    
    def test_kpi_creation(self):
        self.assertEqual(self.kpi.title, 'Test KPI')
        self.assertEqual(self.kpi.category, 'revenue')
    
    def test_metric_creation(self):
        metric = Metric.objects.create(
            kpi=self.kpi,
            timestamp=timezone.now(),
            value=10000.0
        )
        self.assertEqual(metric.kpi, self.kpi)
        self.assertEqual(metric.value, 10000.0)
    
    def test_insight_creation(self):
        insight = Insight.objects.create(
            kpi=self.kpi,
            content='Test insight content',
            confidence=0.8
        )
        self.assertEqual(insight.kpi, self.kpi)
        self.assertEqual(insight.confidence, 0.8)

