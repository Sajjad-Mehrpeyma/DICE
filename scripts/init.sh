#!/bin/bash

# Initialization script for DICE backend
# This script runs database migrations and seeds initial data

echo "🚀 Initializing DICE backend..."

# Wait for PostgreSQL
echo "⏳ Waiting for PostgreSQL..."
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done
echo "✅ PostgreSQL is ready!"

# Wait for Elasticsearch
echo "⏳ Waiting for Elasticsearch..."
until curl -f http://$ES_HOST/_cluster/health; do
  echo "Elasticsearch is unavailable - sleeping"
  sleep 2
done
echo "✅ Elasticsearch is ready!"

# Run migrations
echo "📦 Running database migrations..."
python manage.py migrate

# Create superuser if it doesn't exist
echo "👤 Creating superuser..."
python manage.py shell << END
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@dice.local', 'admin123')
    print('Superuser created: admin / admin123')
else:
    print('Superuser already exists')
END

# Seed connectors
echo "🔌 Seeding data connectors..."
python manage.py seed_connectors

# Seed analytics data
echo "📊 Seeding analytics data..."
python manage.py seed_analytics

# Load sample news data
echo "📰 Loading sample news data..."
python manage.py load_news --sample

echo "✅ Initialization complete!"
echo ""
echo "🎉 DICE is ready to use!"
echo "   Admin: http://localhost:8000/admin"
echo "   Username: admin"
echo "   Password: admin123"

