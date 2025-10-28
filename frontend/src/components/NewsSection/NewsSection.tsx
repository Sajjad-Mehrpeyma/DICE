import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';
import { NewsFilterBar } from './NewsFilterBar';
import { SummaryBox } from './SummaryBox';
import { mockNews, NewsItem } from '@/data/mockNews';
import {
  useNewsFilter,
  getUniqueJournals,
  NewsFilter,
} from '@/hooks/useNewsFilter';
import { fakeSummarizeAPI } from '@/utils/fakeApis';

/**
 * NewsSection component displays filtered news cards in a column layout with filtering and summarization
 */
export const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<NewsFilter>({
    dateRange: { start: '', end: '' },
    priorities: [],
    sentiments: [],
    journal: undefined,
    searchText: '',
    sortBy: 'date',
  });
  const [summaryState, setSummaryState] = useState<{
    loading: boolean;
    text: string;
  }>({
    loading: false,
    text: '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Get filtered news items
  const filteredNews = useNewsFilter(mockNews, filters);

  // Get unique journal options
  const journalOptions = getUniqueJournals(mockNews);

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    // Clear the state to prevent reopening on refresh
    navigate('/news', { replace: true });
  };

  const handleFilterChange = (newFilters: NewsFilter) => {
    setFilters(newFilters);
  };

  const handleSummarize = async (newsItems: NewsItem[]) => {
    setSummaryState({ loading: true, text: '' });

    try {
      const summary = await fakeSummarizeAPI(newsItems);
      setSummaryState({ loading: false, text: summary });
    } catch (error) {
      setSummaryState({
        loading: false,
        text: 'Error generating summary. Please try again.',
      });
    }
  };

  // Auto-open modal if openId is provided in location state
  useEffect(() => {
    const openId = location.state?.openId;
    if (openId && !isModalOpen) {
      const newsItem = filteredNews.find(item => item.id === openId);
      if (newsItem) {
        setSelectedNews(newsItem);
        setIsModalOpen(true);
      }
    }
  }, [location.state?.openId, isModalOpen, filteredNews]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest News</h2>
        <p className="text-gray-600">
          Stay updated with the latest market news and insights
        </p>
      </div>

      {/* Summarize Button and Search Bar */}
      <div className="mb-6 flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={filters.searchText}
            onChange={e =>
              handleFilterChange({
                ...filters,
                searchText: e.target.value,
              })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => handleSummarize(filteredNews)}
          disabled={summaryState.loading || filteredNews.length === 0}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {summaryState.loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Summarizing...</span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Summarize</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        >
          <Filter className="h-4 w-4 mr-2 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </button>
      </div>

      {/* Collapsible Filter Bar */}
      {isFiltersOpen && (
        <div className="mb-6">
          <NewsFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            journalOptions={journalOptions}
            filteredCount={filteredNews.length}
          />
        </div>
      )}

      {/* Summary Box */}
      <SummaryBox
        loading={summaryState.loading}
        summaryText={summaryState.text}
      />

      {/* News Column Layout */}
      <div className="flex flex-col space-y-4">
        {filteredNews.length > 0 ? (
          filteredNews.map(newsItem => (
            <NewsCard
              key={newsItem.id}
              newsItem={newsItem}
              onClick={handleNewsClick}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No news items match your current filters.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search criteria or clearing some filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <NewsModal
        newsItem={selectedNews}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
