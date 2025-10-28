"""
Management command to load news data into Elasticsearch
"""

from django.core.management.base import BaseCommand
from sources.elasticsearch_service import get_elasticsearch_service
from sources.embedding_service import get_embedding_service
from sources.models import DataSource, Document
from django.conf import settings
import gzip
import json
import os


class Command(BaseCommand):
    help = 'Load news data from JSONL.GZ files into Elasticsearch'

    def add_arguments(self, parser):
        parser.add_argument(
            '--sample',
            action='store_true',
            help='Load only a small sample of data',
        )
        parser.add_argument(
            '--source',
            type=str,
            default='ahannews',
            help='Source directory name (default: ahannews)',
        )

    def handle(self, *args, **options):
        sample_mode = options['sample']
        source_name = options['source']
        
        self.stdout.write(f'Loading news data from {source_name}...')
        
        # Get or create data source
        source, created = DataSource.objects.get_or_create(
            id='news-feed',
            defaults={
                'name': 'News Feed',
                'connector_type': 'news',
                'status': 'connected',
                'is_enabled': True
            }
        )
        
        # Initialize services
        es_service = get_elasticsearch_service()
        embedding_service = get_embedding_service()
        
        # Create Elasticsearch index
        try:
            es_service.create_index(settings.ES_INDEX_NEWS)
            self.stdout.write(self.style.SUCCESS('✓ Elasticsearch index ready'))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Index may already exist: {str(e)}'))
        
        # Find news files
        data_path = os.path.join(os.path.dirname(settings.BASE_DIR), 'data', 'TLPC_sample', source_name)
        
        if not os.path.exists(data_path):
            self.stdout.write(self.style.ERROR(f'✗ Data path not found: {data_path}'))
            self.stdout.write('Creating sample data instead...')
            self.create_sample_data(es_service, embedding_service, source)
            return
        
        # Load files
        files = [f for f in os.listdir(data_path) if f.endswith('.jsonl.gz')]
        
        if not files:
            self.stdout.write(self.style.WARNING('No JSONL.GZ files found. Creating sample data...'))
            self.create_sample_data(es_service, embedding_service, source)
            return
        
        total_loaded = 0
        max_docs = 50 if sample_mode else 1000
        
        for filename in files[:3 if sample_mode else None]:  # Limit files in sample mode
            filepath = os.path.join(data_path, filename)
            loaded = self.load_file(filepath, es_service, embedding_service, source, max_docs - total_loaded)
            total_loaded += loaded
            
            if total_loaded >= max_docs:
                break
        
        self.stdout.write(
            self.style.SUCCESS(f'\n✓ Completed! Loaded {total_loaded} documents into Elasticsearch.')
        )
    
    def load_file(self, filepath, es_service, embedding_service, source, max_docs):
        """
        Load a single JSONL.GZ file
        """
        self.stdout.write(f'Loading file: {os.path.basename(filepath)}')
        
        loaded_count = 0
        
        try:
            with gzip.open(filepath, 'rt', encoding='utf-8') as f:
                for line in f:
                    if loaded_count >= max_docs:
                        break
                    
                    try:
                        data = json.loads(line)
                        
                        # Extract fields
                        title = data.get('title', '')
                        content = data.get('content', data.get('text', ''))
                        
                        if not title or not content:
                            continue
                        
                        # Generate embedding
                        text_for_embedding = f"{title} {content[:500]}"
                        embedding = embedding_service.embed_text(text_for_embedding)
                        
                        # Create document
                        doc_id = f"news_{loaded_count}_{hash(title) % 1000000}"
                        
                        doc = {
                            'title': title,
                            'text': content[:1000],  # Limit content size
                            'embedding': embedding,
                            'source': source.id,
                            'timestamp': data.get('date', data.get('published_at', '')),
                            'metadata': {
                                'category': data.get('category', ''),
                                'source_name': source.name
                            }
                        }
                        
                        # Index to Elasticsearch
                        es_service.index_document(settings.ES_INDEX_NEWS, doc_id, doc)
                        
                        # Save to database
                        Document.objects.update_or_create(
                            elasticsearch_id=doc_id,
                            defaults={
                                'source': source,
                                'title': title,
                                'content': content[:1000],
                                'metadata': doc['metadata']
                            }
                        )
                        
                        loaded_count += 1
                        
                        if loaded_count % 10 == 0:
                            self.stdout.write(f'  → Loaded {loaded_count} documents...')
                    
                    except json.JSONDecodeError:
                        continue
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f'  Error processing document: {str(e)}'))
                        continue
        
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading file: {str(e)}'))
        
        return loaded_count
    
    def create_sample_data(self, es_service, embedding_service, source):
        """
        Create sample documents when no data files exist
        """
        self.stdout.write('Creating sample documents...')
        
        sample_docs = [
            {
                'title': 'E-commerce Sales Surge in Q4',
                'text': 'Online retail sales experienced significant growth in the fourth quarter, driven by holiday shopping and improved digital marketing strategies. Industry experts attribute this success to better customer targeting and personalized recommendations.'
            },
            {
                'title': 'Digital Marketing Trends for 2024',
                'text': 'Businesses are increasingly focusing on AI-powered marketing automation, personalization at scale, and omnichannel customer experiences. Data-driven decision making is becoming essential for competitive advantage.'
            },
            {
                'title': 'Customer Retention Strategies',
                'text': 'Companies are investing heavily in customer loyalty programs and retention strategies. Research shows that retaining existing customers is significantly more cost-effective than acquiring new ones.'
            },
            {
                'title': 'The Rise of Social Commerce',
                'text': 'Social media platforms are becoming major shopping destinations. Brands are leveraging influencer partnerships and shoppable posts to reach younger demographics and drive conversions.'
            },
            {
                'title': 'Analytics Transform Business Decisions',
                'text': 'Advanced analytics and business intelligence tools are enabling companies to make faster, data-driven decisions. Real-time dashboards and predictive analytics are becoming standard across industries.'
            }
        ]
        
        for i, doc_data in enumerate(sample_docs):
            doc_id = f"sample_{i}"
            
            # Generate embedding
            text_for_embedding = f"{doc_data['title']} {doc_data['text']}"
            embedding = embedding_service.embed_text(text_for_embedding)
            
            doc = {
                'title': doc_data['title'],
                'text': doc_data['text'],
                'embedding': embedding,
                'source': source.id,
                'timestamp': timezone.now().isoformat(),
                'metadata': {
                    'category': 'business',
                    'source_name': source.name
                }
            }
            
            es_service.index_document(settings.ES_INDEX_NEWS, doc_id, doc)
            
            Document.objects.update_or_create(
                elasticsearch_id=doc_id,
                defaults={
                    'source': source,
                    'title': doc_data['title'],
                    'content': doc_data['text'],
                    'metadata': doc['metadata']
                }
            )
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(sample_docs)} sample documents'))


from django.utils import timezone

