.PHONY: build up down logs migrate seed test shell createsuperuser clean help

help:
	@echo "DICE - Data Intelligence & Copilot Engine"
	@echo ""
	@echo "Available commands:"
	@echo "  make build            - Build Docker images"
	@echo "  make up               - Start all services"
	@echo "  make down             - Stop all services"
	@echo "  make logs             - View logs"
	@echo "  make migrate          - Run database migrations"
	@echo "  make seed             - Seed initial data"
	@echo "  make test             - Run tests"
	@echo "  make shell            - Open Django shell"
	@echo "  make createsuperuser  - Create Django superuser"
	@echo "  make clean            - Clean volumes and containers"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "Services started! Access the application at:"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend:  http://localhost:8000"
	@echo "  Admin:    http://localhost:8000/admin"

down:
	docker-compose down

logs:
	docker-compose logs -f

migrate:
	docker-compose exec backend python manage.py migrate

seed:
	docker-compose exec backend python manage.py seed_connectors
	docker-compose exec backend python manage.py seed_analytics
	docker-compose exec backend python manage.py load_news --sample

test:
	docker-compose exec backend python manage.py test

shell:
	docker-compose exec backend python manage.py shell

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

clean:
	docker-compose down -v
	@echo "All containers and volumes removed!"

# Development commands (without Docker)
dev-install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

dev-migrate:
	cd backend && python manage.py migrate

dev-seed:
	cd backend && python manage.py seed_connectors
	cd backend && python manage.py seed_analytics
	cd backend && python manage.py load_news --sample

dev-backend:
	cd backend && python manage.py runserver

dev-frontend:
	cd frontend && npm run dev

