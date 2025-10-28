import { Link, useLocation } from 'react-router-dom';
import {
  Database,
  FileText,
  LogOut,
  LayoutGrid,
  SlidersHorizontal,
  BrainCircuit,
  BarChart,
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
  icon: JSX.Element;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      name: 'Setup & Data Hub',
      href: '/setup',
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: 'AI Copilot',
      href: '/copilot',
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      name: 'Future Planning',
      href: '/planning',
      icon: <SlidersHorizontal className="h-5 w-5" />,
    },
    {
      name: 'Signals & Alerts',
      href: '/signals',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: 'Insights & Briefs',
      href: '/insights',
      icon: <FileText className="h-5 w-5" />,
    },
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
          'fixed inset-y-0 left-0 z-[60] w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Logo */}

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 px-4 border-b border-border gap-2">
              {/* Logo + Title + Subtitle */}
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/logo.svg"
                  alt="Logo"
                  className="h-8 w-8"
                />
                <div className="flex flex-col leading-tight">
                  <h1 className="text-xl font-bold text-primary">DICE</h1>
                  <p className="text-[10px] text-muted-foreground">
                    Decision Intelligence Copilot Engine
                  </p>
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
                  'sidebar__link',
                  isActive(item.href)
                    ? 'sidebar__link--active'
                    : 'sidebar__link--inactive',
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="sidebar__user-section">
            <div className="sidebar__user-info">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                }
                alt={user?.name || 'User'}
                className="sidebar__user-avatar"
              />
              <div className="sidebar__user-details">
                <p className="sidebar__user-name">{user?.name}</p>
                <p className="sidebar__user-email">{user?.email}</p>
              </div>
            </div>

            <button onClick={logout} className="sidebar__logout-btn">
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
