import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Main layout component that wraps all pages
 */
export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Get page title from current route
  const getPageTitle = () => {
    const path = location.pathname;
    const titles: Record<string, string> = {
      '/command-center': 'Command Center',
      '/setup-data-hub': 'Setup & Data Hub',
      '/ai-copilot': 'AI Copilot',
      '/scenario-orchestrator': 'Scenario Orchestrator',
      '/market-signals': 'Market Signals',
      '/pulse-alerts': 'Pulse & Alerts',
      '/insights-briefs': 'Insights & Briefs',
      '/governance-audit': 'Governance & Audit',
    };
    return titles[path] || 'DICE';
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="w-full pl-0 flex flex-col">
        <Header onMenuClick={toggleSidebar} title={getPageTitle()} />

        <main className="flex-1 px-4 py-6 lg:px-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
