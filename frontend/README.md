# DICE Frontend

Decision Intelligence Copilot Engine (DICE) - Frontend Application

A modern, responsive React application built with TypeScript, TailwindCSS, and React Query for data management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/                 # Images, icons, SVGs
│   ├── components/             # Reusable UI components
│   │   ├── Layout/            # Layout components (Sidebar, Header, Footer)
│   │   ├── widgets/           # Widget components (KPI, Charts, etc.)
│   │   └── forms/             # Form components
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components (one per route)
│   ├── services/              # API client and services
│   ├── styles/                # Global styles
│   ├── App.tsx                # Main app component with routing
│   └── main.tsx               # Application entry point
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .eslintrc.js
└── .prettierrc
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Lucide React** - Icon library
- **ESLint + Prettier** - Code quality and formatting

## 📱 Features

### Layout & Navigation

- Responsive sidebar navigation (desktop) / drawer menu (mobile)
- Top header with user menu and notifications
- Mobile-first responsive design

### Pages

- **Onboarding** - 3-step setup process for new users
- **Dashboard** - KPI widgets and chart placeholders
- **Copilot Chat** - AI-powered chat interface
- **Scenario Builder** - Dynamic form for creating business scenarios
- **Data Sources** - Manage connected data sources
- **Alerts** - Configure and manage data alerts
- **Reports** - View and download generated reports

### Components

- **KPIWidget** - Display key performance indicators with trend data
- **ChartPlaceholder** - Placeholder for future chart implementations
- **ChatBubble** - Chat message component with source attribution
- **FileUpload** - Drag-and-drop file upload with validation
- **ScenarioForm** - Dynamic form with add/remove parameter rows
- **SourceSelector** - Dropdown for selecting data source types

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Environment
VITE_APP_ENV=development
```

### TailwindCSS

The project uses TailwindCSS with JIT mode enabled. Custom colors and utilities are defined in `tailwind.config.js`.

### TypeScript

TypeScript configuration is optimized for React development with strict type checking enabled.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Environment Setup

Make sure to set the correct `VITE_API_BASE_URL` for your production environment.

## 🧪 Development

### Adding a New Route

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Add navigation link to `src/components/Layout/Sidebar.tsx`

### Adding a New Component

1. Create the component in the appropriate directory under `src/components/`
2. Export it from an index file if needed
3. Import and use it in your pages

### API Integration

- API client is configured in `src/services/api.ts`
- Custom hooks for data fetching are in `src/hooks/`
- Use React Query for caching and state management

## 📝 Code Style

- ESLint configuration enforces TypeScript and React best practices
- Prettier ensures consistent code formatting
- Use TypeScript for all components and functions
- Follow React functional component patterns with hooks
- Use Tailwind utility classes for styling

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Run `npm run lint` and `npm run format` before committing
3. Ensure all TypeScript types are properly defined
4. Test responsive design on different screen sizes

## 📄 License

This project is part of the DICE (Decision Intelligence Copilot Engine) system.
