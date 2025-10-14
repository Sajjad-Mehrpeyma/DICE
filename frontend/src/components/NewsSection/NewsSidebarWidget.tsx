import React from 'react';
import { mockNews } from '@/data/mockNews';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Compact news widget for sidebar display
 */
export const NewsSidebarWidget: React.FC = () => {
  // Show only the first 3 news items
  const recentNews = mockNews.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'Positive news';
      case 'negative':
        return 'Negative news';
      case 'neutral':
      default:
        return 'Neutral news';
    }
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Latest News</h3>
        <Link
          to="/news"
          className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          View All
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* News Items */}
      <div className="space-y-3">
        {recentNews.map(item => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
            onClick={() =>
              window.open(item.url, '_blank', 'noopener,noreferrer')
            }
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open(item.url, '_blank', 'noopener,noreferrer');
              }
            }}
            aria-label={`Read news: ${item.title}`}
          >
            {/* Header with sentiment and date */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}
                aria-label={getSentimentLabel(item.sentiment)}
              >
                {item.sentiment}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(item.date)}
              </span>
            </div>

            {/* Title */}
            <h4
              className="text-sm font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.title}
            </h4>

            {/* Source */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{item.source}</span>
              <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-semibold text-green-600">
              {mockNews.filter(n => n.sentiment === 'positive').length}
            </div>
            <div className="text-xs text-gray-500">Positive</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-600">
              {mockNews.filter(n => n.sentiment === 'neutral').length}
            </div>
            <div className="text-xs text-gray-500">Neutral</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-600">
              {mockNews.filter(n => n.sentiment === 'negative').length}
            </div>
            <div className="text-xs text-gray-500">Negative</div>
          </div>
        </div>
      </div>
    </div>
  );
};
