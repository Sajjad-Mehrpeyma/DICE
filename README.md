<p align="center">
  <img src="https://img.shields.io/badge/Version-0.1.0-blue.svg" alt="version"/>
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen.svg" alt="build"/>
</p>

<div align="center">
  <img src="./frontend/src/assets/logo.svg" alt="DICE logo" width="150" style="margin-bottom: 20px;">
  <h1 style="margin: 0;">DICE (Decision Intelligence Copilot)</h1>
</div>

> Transform your marketing data into **actionable decisions**!

---

## Features

-   **AI-Powered Chat:** Engage with your data using natural language to get insights and suggestions.
-   **Scenario Simulation:** Forecast the impact of your marketing decisions before you make them.
-   **KPI Monitoring:** Keep a close eye on your key performance indicators with a comprehensive dashboard.
-   **Anomaly Detection:** Get alerted to unexpected changes in your data and receive root-cause analysis.
-   **Seamless Data Integration:** Connect to various data sources, including Google Analytics, Google Ads, and Meta Ads.

## Dashboard Preview

<p align="center">
  <img src="./docs/gallery/dashboard.png" alt="DICE Dashboard Preview" width="800" style="border-radius: 10px; margin-top: 10px;">
</p>

## Tech Stack

### Frontend

-   **Framework:** React 18
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Component Library:** shadcn/ui
-   **State Management:** TanStack Query
-   **Routing:** React Router
-   **Testing:** Vitest, React Testing Library

### Backend (V1 - Production Ready)

-   **Framework:** Django 5.2.7 + Django REST Framework
-   **Database:** PostgreSQL 16
-   **Search Engine:** Elasticsearch 8.11.1 (with vector search)
-   **AI/ML:**
    -   OpenAI GPT-3.5-turbo for LLM
    -   Sentence Transformers for embeddings (384 dimensions)
    -   LangChain for RAG orchestration
-   **Authentication:** Session-based with CSRF protection
-   **Server:** Gunicorn with multiple workers
-   **Containerization:** Docker + Docker Compose

## Getting Started

### Prerequisites

-   **Docker & Docker Compose** (recommended)
    -   Docker Desktop 20.10+
    -   Docker Compose 2.0+

**OR** for local development without Docker:

-   Node.js v18+
-   Python 3.11+
-   PostgreSQL 16
-   Elasticsearch 8.11.1

### Quick Start with Docker (Recommended)

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd DICE
    ```

2. **Create environment file**:

    ```bash
    cp backend/env.example .env
    # Edit .env with your OpenAI API key and other settings
    ```

3. **Start all services**:

    ```bash
    make build
    make up
    ```

4. **Access the application**:
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:8000
    - Admin Panel: http://localhost:8000/admin (admin/admin123)

That's it! The backend will automatically:

-   Run database migrations
-   Seed initial data sources
-   Create sample KPIs and metrics
-   Load sample news articles for RAG

### Manual Setup (Without Docker)

#### Backend Setup

1. **Navigate to backend**:

    ```bash
    cd backend
    ```

2. **Create virtual environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment**:

    ```bash
    cp env.example .env
    # Edit .env with your settings
    ```

5. **Run migrations and seed data**:

    ```bash
    python manage.py migrate
    python manage.py seed_connectors
    python manage.py seed_analytics
    python manage.py load_news --sample
    python manage.py createsuperuser
    ```

6. **Start server**:
    ```bash
    python manage.py runserver
    ```

#### Frontend Setup

1. **Navigate to frontend**:

    ```bash
    cd frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create environment file**:

    ```bash
    cp .env.example .env
    ```

4. **Start development server**:
    ```bash
    npm run dev
    ```

## Architecture

### Backend Modules

1. **Authentication** - User authentication and profile management
2. **Copilot** - RAG-based AI chat with vector search
3. **Sources** - Data connectors and file processing
4. **Dashboard** - KPIs, metrics, and AI-generated insights
5. **Scenarios** - Business scenario simulation engine

### Key Features

-   ✅ **RAG Pipeline**: Retrieval-Augmented Generation with Elasticsearch vector search
-   ✅ **LLM Integration**: OpenAI GPT-3.5-turbo for intelligent responses
-   ✅ **KPI Dashboard**: Real-time metrics with trend analysis
-   ✅ **AI Insights**: LLM-powered business insights for KPIs
-   ✅ **Scenario Simulation**: Elasticity-based what-if analysis
-   ✅ **Data Connectors**: Google Analytics, CSV upload, News feeds
-   ✅ **Session Auth**: Secure session-based authentication with CORS
-   ✅ **Health Monitoring**: Health check endpoints for all services

## API Documentation

### Authentication

-   `POST /api/v1/auth/login/` - User login
-   `POST /api/v1/auth/logout/` - User logout
-   `GET /api/v1/auth/profile/` - Get user profile

### Copilot (RAG Chat)

-   `POST /api/v1/copilot/query/` - Send chat query with RAG
-   `GET /api/v1/copilot/sessions/` - List chat sessions
-   `GET /api/v1/copilot/history/<id>/` - Get chat history

### Dashboard

-   `GET /api/v1/dashboard/kpis/` - List all KPIs
-   `GET /api/v1/dashboard/kpis/<id>/` - Get KPI details
-   `POST /api/v1/dashboard/kpis/<id>/insight/` - Generate AI insight

### Scenarios

-   `POST /api/v1/scenarios/simulate/` - Run simulation
-   `GET /api/v1/scenarios/` - List saved scenarios

### Sources

-   `GET /api/v1/sources/datasources/` - List data sources
-   `POST /api/v1/sources/upload/` - Upload files

See `docs/api-reference.md` for complete API documentation.

## Development Commands

### Using Make (Docker)

```bash
make build             # Build Docker images
make up                # Start all services
make down              # Stop all services
make logs              # View logs
make migrate           # Run migrations
make seed              # Seed sample data
make shell             # Open Django shell
make createsuperuser   # Create admin user
make test              # Run tests
make clean             # Remove all containers and volumes
```

### Using Django Commands

```bash
# Data seeding
python manage.py seed_connectors    # Create data sources
python manage.py seed_analytics     # Create KPIs and metrics
python manage.py load_news --sample # Load sample news

# Database
python manage.py migrate
python manage.py makemigrations
python manage.py flush

# Testing
python manage.py test
python manage.py test authentication
python manage.py test copilot
```

## Running Tests

### Backend Tests

```bash
make test
# OR
cd backend && python manage.py test
```

### Frontend Tests

```bash
cd frontend && npx vitest run
```

## Configuration

### Environment Variables

Key configuration options (see `backend/env.example` for all):

-   `SECRET_KEY` - Django secret key
-   `DEBUG` - Enable debug mode (False in production)
-   `OPENAI_API_KEY` - OpenAI API key (required for RAG)
-   `DB_NAME`, `DB_USER`, `DB_PASSWORD` - PostgreSQL credentials
-   `ES_HOST` - Elasticsearch URL
-   `CORS_ALLOWED_ORIGINS` - Allowed frontend origins

## Project Structure

```
DICE/
├── backend/                 # Django backend
│   ├── authentication/      # User auth module
│   ├── copilot/            # RAG chat module
│   ├── sources/            # Data connectors
│   ├── dashboard/          # KPIs and analytics
│   ├── scenarios/          # Simulation engine
│   ├── core/               # Shared utilities
│   └── backend/            # Django settings
├── frontend/               # React frontend
├── data/                   # Sample data files
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── docker-compose.yml      # Docker orchestration
└── Makefile               # Development commands
```

## Troubleshooting

### Elasticsearch Connection Issues

```bash
# Check Elasticsearch
curl http://localhost:9200/_cluster/health
docker-compose restart elasticsearch
```

### Database Issues

```bash
# Reset database
make down
make up
make migrate
make seed
```

### OpenAI API Issues

-   Verify API key is set in `.env`
-   Check API quota and billing at platform.openai.com
-   Ensure rate limits are not exceeded

## Production Deployment

1. Set `DEBUG=False` in production
2. Use strong `SECRET_KEY` (generate with Django)
3. Configure `ALLOWED_HOSTS` properly
4. Enable HTTPS (`SESSION_COOKIE_SECURE=True`)
5. Use production-grade PostgreSQL and Elasticsearch
6. Set up monitoring (e.g., Sentry, Prometheus)
7. Configure proper logging
8. Use Redis for caching (future enhancement)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

See `docs/CONTRIBUTING.md` for detailed guidelines.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

-   Open an issue on GitHub
-   Check the documentation in `docs/`
-   Review the API reference at `docs/api-reference.md`
