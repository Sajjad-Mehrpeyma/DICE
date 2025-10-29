#!/bin/bash

echo "Setting up DICE development environment..."

echo
echo "1. Starting PostgreSQL..."
docker run --name dice-postgres -e POSTGRES_DB=dice_db -e POSTGRES_USER=dice_user -e POSTGRES_PASSWORD=dice_password -p 5432:5432 -d postgres:16-alpine

echo
echo "2. Starting Elasticsearch..."
docker run --name dice-elasticsearch -e "discovery.type=single-node" -e "xpack.security.enabled=false" -p 9200:9200 -d elasticsearch:8.11.1

echo
echo "3. Waiting for services to start..."
sleep 10

echo
echo "4. Setting up backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp env.example .env
python manage.py migrate
python manage.py seed_connectors
python manage.py seed_analytics
python manage.py load_news --sample

echo
echo "5. Setting up frontend..."
cd ../frontend
npm install

echo
echo "Setup complete!"
echo
echo "To start development:"
echo "  Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "  Frontend: cd frontend && npm run dev"
echo
echo "Services:"
echo "  PostgreSQL: localhost:5432"
echo "  Elasticsearch: localhost:9200"
echo "  Backend: localhost:8000"
echo "  Frontend: localhost:5173"

