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

- **AI-Powered Chat:** Engage with your data using natural language to get insights and suggestions.
- **Scenario Simulation:** Forecast the impact of your marketing decisions before you make them.
- **KPI Monitoring:** Keep a close eye on your key performance indicators with a comprehensive dashboard.
- **Anomaly Detection:** Get alerted to unexpected changes in your data and receive root-cause analysis.
- **Seamless Data Integration:** Connect to various data sources, including Google Analytics, Google Ads, and Meta Ads.

## Tech Stack

### Frontend

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **State Management:** TanStack Query
- **Routing:** React Router
- **Testing:** Vitest, React Testing Library

### Backend

- **Framework:** Django, Django REST Framework
- **Database:** SQLite (for development)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Python (v3.9 or higher)
- pip

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a `requirements.txt` file with the following content:
    ```
    Django
    djangorestframework
    ```
3.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Start the development server:
    ```bash
    python manage.py runserver
    ```
    The backend will be available at `http://localhost:8000`.

## Running Tests

To run the frontend unit tests, navigate to the `frontend` directory and run the following command:

```bash
npx vitest run
```

## Project Structure

- `frontend/`: Contains the React/Vite frontend application.
- `backend/`: Contains the Django/DRF backend application.
- `docs/`: Contains project documentation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

