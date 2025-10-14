import { useMemo } from 'react';
import { NewsItem } from '@/data/mockNews';

/**
 * Filter configuration interface for news filtering
 */
export interface NewsFilter {
  dateRange: {
    start: string;
    end: string;
  };
  priorities: string[];
  sentiments: string[];
  journal?: string;
  searchText: string;
  /** Sort key for results */
  sortBy?: 'date' | 'priority';
}

/**
 * Custom hook for filtering news items based on various criteria
 * @param newsItems - Array of all news items to filter
 * @param filters - Filter configuration object
 * @returns Filtered array of news items
 */
export const useNewsFilter = (newsItems: NewsItem[], filters: NewsFilter): NewsItem[] => {
  return useMemo(() => {
    const filtered = newsItems.filter(item => {
      // Date range filter
      if (filters.dateRange.start && filters.dateRange.end) {
        const itemDate = new Date(item.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        
        if (itemDate < startDate || itemDate > endDate) {
          return false;
        }
      } else if (filters.dateRange.start) {
        const itemDate = new Date(item.date);
        const startDate = new Date(filters.dateRange.start);
        if (itemDate < startDate) {
          return false;
        }
      } else if (filters.dateRange.end) {
        const itemDate = new Date(item.date);
        const endDate = new Date(filters.dateRange.end);
        if (itemDate > endDate) {
          return false;
        }
      }

      // Priority filter
      if (filters.priorities.length > 0 && !filters.priorities.includes(item.priority)) {
        return false;
      }

      // Sentiment filter
      if (filters.sentiments.length > 0 && !filters.sentiments.includes(item.sentiment)) {
        return false;
      }

      // Journal filter
      if (filters.journal && item.journal !== filters.journal) {
        return false;
      }

      // Search text filter (searches in title, source, and journal)
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(searchLower);
        const matchesSource = item.source.toLowerCase().includes(searchLower);
        const matchesJournal = item.journal.toLowerCase().includes(searchLower);
        const matchesDescription = item.description.toLowerCase().includes(searchLower);
        
        if (!matchesTitle && !matchesSource && !matchesJournal && !matchesDescription) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    const sortBy = filters.sortBy || 'date';
    const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      // Default: date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted;
  }, [newsItems, filters]);
};

/**
 * Get unique journal values from news items
 * @param newsItems - Array of news items
 * @returns Array of unique journal names
 */
export const getUniqueJournals = (newsItems: NewsItem[]): string[] => {
  return useMemo(() => {
    const journals = newsItems.map(item => item.journal);
    return Array.from(new Set(journals)).sort();
  }, [newsItems]);
};
