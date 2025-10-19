import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Settings,
  Database,
  Bell,
  FileText,
  LogOut,
  User,
  Newspaper,
  AlertTriangle,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { NewsSidebarWidget } from '../NewsSection/NewsSidebarWidget';
import { useHighPriorityNews } from '@/hooks/useHighPriorityNews';

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
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { highPriorityNews, removeNewsItem } = useHighPriorityNews();

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
        name: 'Onboarding',
        href: '/onboarding',
        icon: <User className="h-5 w-5" />,
      },
    {
      name: 'Copilot',
      href: '/copilot',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: 'News',
      href: '/news',
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      name: 'Scenario Builder',
      href: '/scenario',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: 'Data Sources',
      href: '/sources',
      icon: <Database className="h-5 w-5" />,
    },
    { name: 'Alerts', href: '/alerts', icon: <Bell className="h-5 w-5" /> },
    {
      name: 'Reports',
      href: '/reports',
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

          {/* High-Priority News Section */}
          {highPriorityNews.length > 0 && (
            <div className="px-4 mb-4">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-4 w-4 text-primary-600 mr-2" />
                  <h3 className="text-sm font-semibold text-primary-800">
                    High-Priority News
                  </h3>
                </div>
                <div className="space-y-2">
                  {highPriorityNews.map(newsItem => (
                    <button
                      key={newsItem.id}
                      onClick={() => {
                        removeNewsItem(newsItem.id);
                        navigate('/news', { state: { openId: newsItem.id } });
                        onClose();
                      }}
                      className="w-full bg-background p-2 rounded shadow-sm hover:shadow-md flex items-start space-x-2 text-left transition-shadow duration-200"
                      aria-label={`Open news: ${newsItem.title}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            High Priority
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(newsItem.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2 leading-tight">
                          {newsItem.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {newsItem.source}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* News Widget */}
          {/* <div className="px-4">
            <NewsSidebarWidget />
          </div> */}

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
