"""
Management command to seed initial data source connectors
"""

from django.core.management.base import BaseCommand
from sources.models import DataSource
from django.utils import timezone


class Command(BaseCommand):
    help = 'Seed initial data source connectors'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data source connectors...')
        
        connectors = [
            {
                'id': 'google-analytics-1',
                'name': 'Google Analytics',
                'connector_type': 'google-analytics',
                'status': 'connected',
                'health': 'good',
                'is_enabled': True,
                'last_sync': timezone.now(),
                'config': {}
            },
            {
                'id': 'google-ads-1',
                'name': 'Google Ads',
                'connector_type': 'google-ads',
                'status': 'pending',
                'health': 'unknown',
                'is_enabled': False,
                'config': {}
            },
            {
                'id': 'facebook-ads-1',
                'name': 'Meta Ads',
                'connector_type': 'facebook-ads',
                'status': 'disconnected',
                'health': 'unknown',
                'is_enabled': False,
                'config': {}
            },
            {
                'id': 'shopify-1',
                'name': 'Shopify Store',
                'connector_type': 'shopify',
                'status': 'pending',
                'health': 'unknown',
                'is_enabled': False,
                'config': {}
            },
            {
                'id': 'csv-upload',
                'name': 'CSV Upload',
                'connector_type': 'csv',
                'status': 'connected',
                'health': 'good',
                'is_enabled': True,
                'config': {}
            },
            {
                'id': 'news-feed',
                'name': 'News Feed',
                'connector_type': 'news',
                'status': 'connected',
                'health': 'good',
                'is_enabled': True,
                'last_sync': timezone.now(),
                'config': {}
            }
        ]
        
        created_count = 0
        updated_count = 0
        
        for connector_data in connectors:
            connector, created = DataSource.objects.update_or_create(
                id=connector_data['id'],
                defaults=connector_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Created: {connector.name}'))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'↻ Updated: {connector.name}'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\nCompleted! Created {created_count}, Updated {updated_count} connectors.'
            )
        )

