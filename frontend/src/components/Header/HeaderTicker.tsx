import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNews } from '@/data/mockNews';
import { mockNotifications } from '@/data/mockNotifications';
import { mockEvents } from '@/data/mockEvents';

interface TickerItem {
  id: string;
  text: string;
  type: 'news' | 'notification' | 'event';
  color: string;
  bgColor: string;
  newsId?: string; // For news items, store the original news ID
}

/**
 * HeaderTicker component displays animated vertical ticker with news, notifications, and events
 */
export const HeaderTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Transform data into ticker items
  const tickerItems: TickerItem[] = [
    // News items
    ...mockNews.slice(0, 3).map(item => ({
      id: `news-${item.id}`,
      text: item.title,
      type: 'news' as const,
      color:
        item.sentiment === 'positive'
          ? 'text-green-600'
          : item.sentiment === 'negative'
            ? 'text-red-600'
            : 'text-yellow-600',
      bgColor:
        item.sentiment === 'positive'
          ? 'bg-green-100'
          : item.sentiment === 'negative'
            ? 'bg-red-100'
            : 'bg-yellow-100',
      newsId: item.id, // Store the original news ID for navigation
    })),
    // Notification items
    ...mockNotifications.slice(0, 2).map(item => ({
      id: `notification-${item.id}`,
      text: item.text,
      type: 'notification' as const,
      color:
        item.severity === 'critical'
          ? 'text-red-600'
          : item.severity === 'high'
            ? 'text-orange-600'
            : item.severity === 'medium'
              ? 'text-yellow-600'
              : 'text-blue-600',
      bgColor:
        item.severity === 'critical'
          ? 'bg-red-100'
          : item.severity === 'high'
            ? 'bg-orange-100'
            : item.severity === 'medium'
              ? 'bg-yellow-100'
              : 'bg-blue-100',
    })),
    // Event items
    ...mockEvents.slice(0, 2).map(item => ({
      id: `event-${item.id}`,
      text: item.text,
      type: 'event' as const,
      color:
        item.impact === 'high'
          ? 'text-purple-600'
          : item.impact === 'medium'
            ? 'text-indigo-600'
            : 'text-gray-600',
      bgColor:
        item.impact === 'high'
          ? 'bg-purple-100'
          : item.impact === 'medium'
            ? 'bg-indigo-100'
            : 'bg-gray-100',
    })),
  ];

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % tickerItems.length);
        setIsAnimating(false);
      }, 300); // Half of the transition duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [tickerItems.length]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news':
        return '📰';
      case 'notification':
        return '🔔';
      case 'event':
        return '📅';
      default:
        return '•';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news':
        return 'News';
      case 'notification':
        return 'Notification';
      case 'event':
        return 'Event';
      default:
        return 'Item';
    }
  };

  const handleTickerClick = (item: TickerItem) => {
    if (item.type === 'news' && item.newsId) {
      // Navigate to news page and open the specific news modal
      navigate('/news', {
        state: { openId: item.newsId },
      });
    }
  };

  if (tickerItems.length === 0) {
    return null;
  }

  const currentItem = tickerItems[currentIndex];

  return (
    <div
      className={`hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 min-w-0 flex-1 max-w-md ${
        currentItem.type === 'news'
          ? 'cursor-pointer hover:bg-gray-100 transition-colors'
          : ''
      }`}
      onClick={() => handleTickerClick(currentItem)}
      role={currentItem.type === 'news' ? 'button' : undefined}
      tabIndex={currentItem.type === 'news' ? 0 : undefined}
      onKeyDown={e => {
        if (
          currentItem.type === 'news' &&
          (e.key === 'Enter' || e.key === ' ')
        ) {
          e.preventDefault();
          handleTickerClick(currentItem);
        }
      }}
      aria-label={
        currentItem.type === 'news'
          ? `Click to read news: ${currentItem.text}`
          : undefined
      }
    >
      <div className="flex items-center min-w-0 flex-1">
        {/* Type indicator */}
        <div className="flex items-center mr-3 flex-shrink-0">
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${currentItem.bgColor} ${currentItem.color}`}
            aria-label={`${getTypeLabel(currentItem.type)} indicator`}
          >
            {getTypeIcon(currentItem.type)}
          </span>
        </div>

        {/* Ticker text */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className={`transition-all duration-600 ease-in-out ${
              isAnimating
                ? 'transform -translate-y-full opacity-0'
                : 'transform translate-y-0 opacity-100'
            }`}
            aria-live="polite"
            aria-label={`${getTypeLabel(currentItem.type)}: ${currentItem.text}`}
          >
            <p className="text-sm text-gray-700 truncate">{currentItem.text}</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center ml-3 flex-shrink-0">
          <div className="flex space-x-1">
            {tickerItems.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
