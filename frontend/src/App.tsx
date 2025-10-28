import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { Layout } from '@/components/Layout/Layout';
import { ThemeProvider } from '@/context/ThemeContext';

// Page imports
import Dashboard from '@/pages/Dashboard';
import SetupDataHub from '@/pages/SetupDataHub';
import AiCopilot from '@/pages/AiCopilot';
import Planning from '@/pages/Planning';
import Signals from '@/pages/Signals';
import InsightsBriefs from '@/pages/InsightsBriefs';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Main App component with routing and providers
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="setup" element={<SetupDataHub />} />
                <Route path="copilot" element={<AiCopilot />} />
                <Route path="planning" element={<Planning />} />
                <Route path="signals" element={<Signals />} />
                <Route path="insights" element={<InsightsBriefs />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
