import { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { NewsItem } from '@/data/mockNews';

interface NewsModalProps {
  newsItem: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NewsModal component displays full news article details in an accessible modal
 */
export const NewsModal = ({
  newsItem,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Handle read original link
  const handleReadOriginal = () => {
    if (newsItem?.url) {
      window.open(newsItem.url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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

  if (!isOpen || !newsItem) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSentimentBadgeColor(newsItem.sentiment)}`}
                  aria-label={getSentimentLabel(newsItem.sentiment)}
                >
                  {newsItem.sentiment}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadgeColor(newsItem.priority)}`}
                  aria-label={getPriorityLabel(newsItem.priority)}
                >
                  {newsItem.priority} priority
                </span>
                <span className="text-sm text-gray-500">
                  {newsItem.source} • {formatDate(newsItem.date)}
                </span>
              </div>
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900 leading-tight"
              >
                {newsItem.title}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Article Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {newsItem.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Business Impact
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {newsItem.businessImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleReadOriginal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Read Original
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
