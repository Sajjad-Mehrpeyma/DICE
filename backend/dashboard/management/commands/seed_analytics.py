"""
Management command to seed mock analytics data (KPIs and metrics)
"""

from django.core.management.base import BaseCommand
from dashboard.models import KPI, Metric
from django.utils import timezone
from datetime import timedelta
import random


class Command(BaseCommand):
    help = 'Seed mock analytics data for dashboard'

    def handle(self, *args, **options):
        self.stdout.write('Seeding analytics data...')
        
        # Define KPIs
        kpis_data = [
            {
                'kpi_id': 'total-revenue',
                'title': 'Total Revenue',
                'category': 'revenue',
                'description': 'Total revenue across all channels',
                'current_value': '$127,458',
                'previous_value': '$121,000',
                'change_percent': 5.3,
                'change_type': 'positive',
                'unit': '$',
                'base_value': 127458
            },
            {
                'kpi_id': 'roas',
                'title': 'ROAS',
                'category': 'marketing',
                'description': 'Return on Ad Spend',
                'current_value': '4.2x',
                'previous_value': '3.8x',
                'change_percent': 10.5,
                'change_type': 'positive',
                'unit': 'x',
                'base_value': 4.2
            },
            {
                'kpi_id': 'cac',
                'title': 'CAC',
                'category': 'marketing',
                'description': 'Customer Acquisition Cost',
                'current_value': '$32',
                'previous_value': '$35',
                'change_percent': -8.6,
                'change_type': 'positive',
                'unit': '$',
                'base_value': 32
            },
            {
                'kpi_id': 'conversion-rate',
                'title': 'Conversion Rate',
                'category': 'marketing',
                'description': 'Overall conversion rate',
                'current_value': '2.8%',
                'previous_value': '2.5%',
                'change_percent': 12.0,
                'change_type': 'positive',
                'unit': '%',
                'base_value': 2.8
            },
            {
                'kpi_id': 'email-ctr',
                'title': 'Email CTR',
                'category': 'marketing',
                'description': 'Email Click-Through Rate',
                'current_value': '4.5%',
                'previous_value': '5.2%',
                'change_percent': -13.5,
                'change_type': 'negative',
                'unit': '%',
                'base_value': 4.5
            },
            {
                'kpi_id': 'clv',
                'title': 'CLV',
                'category': 'customer',
                'description': 'Customer Lifetime Value',
                'current_value': '$542',
                'previous_value': '$520',
                'change_percent': 4.2,
                'change_type': 'positive',
                'unit': '$',
                'base_value': 542
            },
            {
                'kpi_id': 'lead-conversion',
                'title': 'Lead Conversion',
                'category': 'customer',
                'description': 'Lead to customer conversion rate',
                'current_value': '18%',
                'previous_value': '16%',
                'change_percent': 12.5,
                'change_type': 'positive',
                'unit': '%',
                'base_value': 18
            },
            {
                'kpi_id': 'funnel-dropoff',
                'title': 'Funnel Drop-off',
                'category': 'customer',
                'description': 'Percentage of users dropping off in funnel',
                'current_value': '45%',
                'previous_value': '52%',
                'change_percent': -13.5,
                'change_type': 'positive',
                'unit': '%',
                'base_value': 45
            }
        ]
        
        created_kpis = 0
        updated_kpis = 0
        
        for kpi_data in kpis_data:
            base_value = kpi_data.pop('base_value')
            kpi, created = KPI.objects.update_or_create(
                kpi_id=kpi_data['kpi_id'],
                defaults=kpi_data
            )
            
            if created:
                created_kpis += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Created KPI: {kpi.title}'))
                
                # Create time-series metrics for the last 30 days
                self.create_metrics(kpi, base_value)
            else:
                updated_kpis += 1
                self.stdout.write(self.style.WARNING(f'↻ Updated KPI: {kpi.title}'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\nCompleted! Created {created_kpis}, Updated {updated_kpis} KPIs.'
            )
        )
    
    def create_metrics(self, kpi, base_value):
        """
        Create time-series metrics for a KPI
        """
        # Delete existing metrics
        Metric.objects.filter(kpi=kpi).delete()
        
        now = timezone.now()
        metrics_created = 0
        
        # Create data for the last 30 days
        for i in range(30, -1, -1):
            timestamp = now - timedelta(days=i)
            
            # Add some random variation
            variation = random.uniform(-0.1, 0.1)
            value = base_value * (1 + variation)
            
            Metric.objects.create(
                kpi=kpi,
                timestamp=timestamp,
                value=value,
                dimensions={}
            )
            metrics_created += 1
        
        self.stdout.write(f'  → Created {metrics_created} metrics for {kpi.title}')

