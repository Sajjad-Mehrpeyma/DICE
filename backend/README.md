# DICE Backend - V1 Implementation

## Overview

This is the backend for DICE (Data Intelligence & Copilot Engine), a comprehensive business intelligence platform with AI-powered analytics, RAG-based chat, and scenario simulation capabilities.

## Architecture

### Technology Stack

-   **Framework**: Django 5.2.7 + Django REST Framework
-   **Database**: PostgreSQL 16
-   **Search**: Elasticsearch 8.11.1 (with vector search)
-   **AI/ML**:
    -   OpenAI GPT-3.5-turbo for LLM
    -   Sentence Transformers (all-MiniLM-L6-v2) for embeddings
    -   LangChain for RAG orchestration
-   **Authentication**: Session-based with CORS support

### Modules

1. **Authentication** (`authentication/`)

    - User authentication and profile management
    - Session-based auth with CSRF protection

2. **Copilot** (`copilot/`)

    - RAG-based chat interface
    - OpenAI integration for responses
    - Vector similarity search for context retrieval

3. **Sources** (`sources/`)

    - Data source connectors (Google Analytics, CSV, News, etc.)
    - File upload and processing
    - Elasticsearch integration

4. **Dashboard** (`dashboard/`)

    - KPI tracking and visualization
    - Time-series metrics
    - AI-generated insights

5. **Scenarios** (`scenarios/`)

    - Business scenario simulation
    - Elasticity-based modeling
    - What-if analysis

6. **Core** (`core/`)
    - Shared utilities, exceptions, permissions
    - Response formatters and pagination

## Setup

### Prerequisites

-   Python 3.11+
-   PostgreSQL 16
-   Elasticsearch 8.11.1
-   OpenAI API key

### Installation (Local Development)

1. **Create virtual environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

3. **Configure environment**:

    ```bash
    cp env.example .env
    # Edit .env with your settings
    ```

4. **Run migrations**:

    ```bash
    python manage.py migrate
    ```

5. **Seed initial data**:

    ```bash
    python manage.py seed_connectors
    python manage.py seed_analytics
    python manage.py load_news --sample
    ```

6. **Create superuser**:

    ```bash
    python manage.py createsuperuser
    ```

7. **Run development server**:
    ```bash
    python manage.py runserver
    ```

### Installation (Docker)

See main README.md in project root.

## API Endpoints

### Authentication

-   `POST /api/v1/auth/login/` - User login
-   `POST /api/v1/auth/logout/` - User logout
-   `GET /api/v1/auth/profile/` - Get user profile
-   `POST /api/v1/auth/register/` - User registration

### Copilot

-   `POST /api/v1/copilot/query/` - Send chat query
-   `GET /api/v1/copilot/sessions/` - List chat sessions
-   `GET /api/v1/copilot/history/<id>/` - Get session history

### Sources

-   `GET /api/v1/sources/datasources/` - List data sources
-   `POST /api/v1/sources/upload/` - Upload file
-   `GET /api/v1/sources/documents/` - List documents

### Dashboard

-   `GET /api/v1/dashboard/kpis/` - List all KPIs
-   `GET /api/v1/dashboard/kpis/<id>/` - Get KPI details
-   `POST /api/v1/dashboard/kpis/<id>/insight/` - Generate insight

### Scenarios

-   `POST /api/v1/scenarios/simulate/` - Run simulation
-   `GET /api/v1/scenarios/` - List scenarios
-   `GET /api/v1/scenarios/<id>/results/` - Get simulation results

### Health

-   `GET /api/v1/health/` - System health check

## Configuration

### Environment Variables

See `env.example` for all configuration options.

Key variables:

-   `SECRET_KEY` - Django secret key
-   `DEBUG` - Debug mode (True/False)
-   `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database credentials
-   `OPENAI_API_KEY` - OpenAI API key
-   `ES_HOST` - Elasticsearch host URL

### Settings Structure

Settings are split into:

-   `backend/settings/base.py` - Base settings
-   `backend/settings/development.py` - Development overrides
-   `backend/settings/production.py` - Production settings

## Management Commands

### Seed Data

```bash
python manage.py seed_connectors    # Create data source connectors
python manage.py seed_analytics     # Create KPIs and metrics
python manage.py load_news --sample # Load sample news articles
```

## Testing

Run tests:

```bash
python manage.py test
```

Run specific app tests:

```bash
python manage.py test authentication
python manage.py test copilot
python manage.py test dashboard
```

## Development

### Code Style

-   Follow PEP 8
-   Use Black for formatting
-   Use isort for imports

### Adding New Models

1. Define model in `models.py`
2. Run migrations: `python manage.py makemigrations && python manage.py migrate`
3. Register in `admin.py`
4. Create serializers
5. Add API views

### Adding New Endpoints

1. Create view in `views.py`
2. Add URL pattern in `urls.py`
3. Update permissions if needed
4. Document in API reference

## Troubleshooting

### Elasticsearch Connection Issues

```bash
# Check Elasticsearch status
curl http://localhost:9200/_cluster/health

# Restart Elasticsearch
docker-compose restart elasticsearch
```

### Database Issues

```bash
# Reset database
python manage.py flush
python manage.py migrate
python manage.py seed_connectors
python manage.py seed_analytics
```

### OpenAI API Issues

-   Check API key is set: `echo $OPENAI_API_KEY`
-   Verify API quota and billing
-   Check rate limits

## Production Deployment

1. Set `DEBUG=False` in production
2. Use strong `SECRET_KEY`
3. Configure proper `ALLOWED_HOSTS`
4. Use HTTPS (`SESSION_COOKIE_SECURE=True`)
5. Set up proper logging
6. Use gunicorn with multiple workers
7. Set up monitoring (e.g., Sentry)

## License

MIT License - see LICENSE file for details
