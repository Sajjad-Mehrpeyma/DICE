import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Database,
  Bell,
  FileText,
  LogOut,
  LayoutGrid,
  SlidersHorizontal,
  BrainCircuit,
  BarChart,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Sidebar navigation component
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation: NavItem[] = [
    { name: 'Command Center', href: '/command-center', icon: <LayoutGrid className="h-5 w-5" /> },
    { name: 'Setup & Data Hub', href: '/setup-data-hub', icon: <Database className="h-5 w-5" /> },
    { name: 'AI Copilot', href: '/ai-copilot', icon: <BrainCircuit className="h-5 w-5" /> },
    { name: 'Scenario Orchestrator', href: '/scenario-orchestrator', icon: <SlidersHorizontal className="h-5 w-5" /> },
    { name: 'Market Signals', href: '/market-signals', icon: <BarChart className="h-5 w-5" /> },
    { name: 'Pulse & Alerts', href: '/pulse-alerts', icon: <Bell className="h-5 w-5" /> },
    { name: 'Insights & Briefs', href: '/insights-briefs', icon: <FileText className="h-5 w-5" /> },
    { name: 'Governance & Audit', href: '/governance-audit', icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Logo */}

            <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 px-4 border-b border-border gap-2">
                {/* Logo + Title + Subtitle */}
                <div className="flex items-center gap-2">
                <img src="/src/assets/logo.svg" alt="Logo" className="h-8 w-8" />
                <div className="flex flex-col leading-tight">
                    <h1 className="text-xl font-bold text-primary">DICE</h1>
                    <p className="text-[10px] text-muted-foreground">Decision Intelligence Copilot Engine</p>
                </div>
                </div>
            </div>
            </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={clsx(
                  'sidebar-link',
                  isActive(item.href)
                    ? 'sidebar-link-active'
                    : 'sidebar-link-inactive',
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="flex border-t border-border p-4">
            <div className="flex items-center">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                }
                alt={user?.name || 'User'}
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full sidebar-link sidebar-link-inactive"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
