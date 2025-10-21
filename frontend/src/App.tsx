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
import CommandCenter from '@/pages/CommandCenter';
import SetupDataHub from '@/pages/SetupDataHub';
import AiCopilot from '@/pages/AiCopilot';
import ScenarioOrchestrator from '@/pages/ScenarioOrchestrator';
import MarketSignals from '@/pages/MarketSignals';
import PulseAlerts from '@/pages/PulseAlerts';
import InsightsBriefs from '@/pages/InsightsBriefs';
import GovernanceAudit from '@/pages/GovernanceAudit';
import { DecisionStudio } from '@/pages/DecisionStudio';
import { Playbooks } from '@/pages/Playbooks';
import { ActionTracker } from '@/pages/ActionTracker';
import { Settings } from '@/pages/Settings';
import { KpiDetailPage } from '@/pages/KpiDetailPage';
import { Signals } from '@/pages/Signals';

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
                <Route index element={<Navigate to="/command-center" replace />} />
                <Route path="command-center" element={<CommandCenter />} />
                <Route path="setup-data-hub" element={<SetupDataHub />} />
                <Route path="ai-copilot" element={<AiCopilot />} />
                <Route path="scenario-orchestrator" element={<ScenarioOrchestrator />} />
                <Route path="market-signals" element={<MarketSignals />} />
                <Route path="pulse-alerts" element={<PulseAlerts />} />
                <Route path="insights-briefs" element={<InsightsBriefs />} />
                <Route path="governance-audit" element={<GovernanceAudit />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
