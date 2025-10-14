import React from 'react';
import { NewsFilter } from '@/hooks/useNewsFilter';

/**
 * Props interface for NewsFilterBar component
 */
interface NewsFilterBarProps {
  /** Current filter state */
  filters: NewsFilter;
  /** Callback function when filters change */
  onFilterChange: (filters: NewsFilter) => void;
  /** Available journal options */
  journalOptions: string[];
  /** Number of filtered news items */
  filteredCount: number;
}

/**
 * NewsFilterBar component provides filtering controls for news items
 * Includes date range, priority, sentiment, journal filters, and search
 */
export const NewsFilterBar: React.FC<NewsFilterBarProps> = ({
  filters,
  onFilterChange,
  journalOptions,
  filteredCount,
}) => {
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const newPriorities = checked
      ? [...filters.priorities, priority]
      : filters.priorities.filter(p => p !== priority);

    onFilterChange({
      ...filters,
      priorities: newPriorities,
    });
  };

  const handleSentimentChange = (sentiment: string, checked: boolean) => {
    const newSentiments = checked
      ? [...filters.sentiments, sentiment]
      : filters.sentiments.filter(s => s !== sentiment);

    onFilterChange({
      ...filters,
      sentiments: newSentiments,
    });
  };

  const handleJournalChange = (journal: string) => {
    onFilterChange({
      ...filters,
      journal: journal === 'all' ? undefined : journal,
    });
  };

  const handleSortChange = (sortBy: 'date' | 'priority') => {
    onFilterChange({
      ...filters,
      sortBy,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={e => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Start Date"
            aria-label="Filter by start date"
          />
        </div>

        <div>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={e => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="End Date"
            aria-label="Filter by end date"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <div className="flex flex-wrap gap-2">
            {['high', 'medium', 'low'].map(priority => (
              <label key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priorities.includes(priority)}
                  onChange={e =>
                    handlePriorityChange(priority, e.target.checked)
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  aria-label={`Filter by ${priority} priority`}
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sentiment Filter */}
        <div>
          <div className="flex flex-wrap gap-2">
            {['positive', 'neutral', 'negative'].map(sentiment => (
              <label key={sentiment} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.sentiments.includes(sentiment)}
                  onChange={e =>
                    handleSentimentChange(sentiment, e.target.checked)
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  aria-label={`Filter by ${sentiment} sentiment`}
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {sentiment}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Journal Filter */}
        <div>
          <select
            value={filters.journal || 'all'}
            onChange={e => handleJournalChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Filter by journal"
          >
            <option value="all">All Journals</option>
            {journalOptions.map(journal => (
              <option key={journal} value={journal}>
                {journal}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <select
            value={filters.sortBy || 'date'}
            onChange={e =>
              handleSortChange(e.target.value as 'date' | 'priority')
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Sort news"
          >
            <option value="date">Date (Newest first)</option>
            <option value="priority">Priority (High first)</option>
          </select>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {filteredCount} news items
          {filters.searchText && ` matching "${filters.searchText}"`}
          {filters.journal && ` from ${filters.journal}`}
          {filters.priorities.length > 0 &&
            ` with ${filters.priorities.join(', ')} priority`}
          {filters.sentiments.length > 0 &&
            ` with ${filters.sentiments.join(', ')} sentiment`}
          {` sorted by ${filters.sortBy === 'priority' ? 'priority (high first)' : 'date (newest first)'}`}
        </p>
      </div>
    </div>
  );
};
