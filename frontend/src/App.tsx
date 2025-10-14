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

// Page imports
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { CopilotChat } from '@/pages/CopilotChat';
import { NewsPage } from '@/pages/NewsPage';
import { ScenarioBuilder } from '@/pages/ScenarioBuilder';
import { DataSources } from '@/pages/DataSources';
import { Alerts } from '@/pages/Alerts';
import { Reports } from '@/pages/Reports';

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
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="copilot" element={<CopilotChat />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="scenario" element={<ScenarioBuilder />} />
              <Route path="sources" element={<DataSources />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
