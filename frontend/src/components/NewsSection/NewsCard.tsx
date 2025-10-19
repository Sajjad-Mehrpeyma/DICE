import React from 'react';
import { NewsItem } from '@/data/mockNews';
import { AskButton } from '../common/AskButton';

interface NewsCardProps {
  newsItem: NewsItem;
  onClick: (newsItem: NewsItem) => void;
}

/**
 * NewsCard component displays a single news item with sentiment badge
 */
export const NewsCard: React.FC<NewsCardProps> = ({ newsItem, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
      default:
        return 'Low Priority';
    }
  };

  return (
    <div
      className="bg-background rounded-lg border border-border p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
      onClick={() => onClick(newsItem)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(newsItem);
        }
      }}
      aria-label={`Read news: ${newsItem.title}`}
    >
      {/* Header with unified sentiment & priority badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-row items-center gap-2">
          {/* Combined Sentiment + Priority badge */}
          <div
            className={`flex items-center text-xs font-medium rounded-full border overflow-hidden`}
            aria-label={`${getSentimentLabel(newsItem.sentiment)} sentiment and ${getPriorityLabel(newsItem.priority)} priority`}
          >
            {/* Left: sentiment section */}
            <span
              className={`flex items-center gap-1 px-2 py-0.5 ${
                newsItem.sentiment === 'positive'
                  ? 'bg-green-100 text-green-700 border-green-200'
                  : newsItem.sentiment === 'negative'
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              {newsItem.sentiment === 'positive' && (
                <svg
                  className="w-3 h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 10l3 3L15 6l1.5 1.5L8 15l-4.5-4.5L5 10z" />
                </svg>
              )}
              {newsItem.sentiment === 'negative' && (
                <svg
                  className="w-3 h-3 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6 6l8 8M6 14L14 6"
                    strokeWidth="2"
                    stroke="currentColor"
                  />
                </svg>
              )}
              {newsItem.sentiment}
            </span>

            {/* Divider */}
            <div className="w-px bg-gray-300"></div>

            {/* Right: priority section */}
            <span
              className={`px-2 py-0.5 ${
                newsItem.priority === 'high'
                  ? 'bg-red-50 text-red-600'
                  : newsItem.priority === 'medium'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-gray-50 text-gray-600'
              }`}
            >
              {newsItem.priority} priority
            </span>
          </div>
        </div>

        {/* Date */}
        <span className="text-xs text-muted-foreground">
          {formatDate(newsItem.date)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold text-foreground mb-2 overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {newsItem.title}
      </h3>

      {/* Source and Journal */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          <span className="font-medium">{newsItem.source}</span>
          <span className="mx-2">•</span>
          <span>{newsItem.journal}</span>
        </div>
        <AskButton contextId={newsItem.id} />
      </div>
    </div>
  );
};
