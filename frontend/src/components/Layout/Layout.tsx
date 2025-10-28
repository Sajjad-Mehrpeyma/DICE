import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
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
      '/dashboard': 'Dashboard',
      '/setup': 'Setup & Data Hub',
      '/copilot': 'AI Copilot',
      '/planning': 'Future Planning',
      '/signals': 'Signals & Alerts',
      '/insights': 'Insights & Briefs',
      '/settings': 'Settings',
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
