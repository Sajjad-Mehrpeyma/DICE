import { useState, useEffect, useCallback } from 'react';
import { mockNews, NewsItem } from '@/data/mockNews';

/**
 * Hook for managing high-priority news items
 * Filters news items with priority 'high' and manages removal of clicked items
 * 
 * @returns Object containing high-priority news items and removal function
 */
export const useHighPriorityNews = () => {
  const [removedNewsIds, setRemovedNewsIds] = useState<string[]>([]);

  // Load removed news IDs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('removedHighPriorityNews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRemovedNewsIds(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Failed to parse removed news IDs from localStorage:', error);
        setRemovedNewsIds([]);
      }
    }
  }, []);

  // Save removed news IDs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('removedHighPriorityNews', JSON.stringify(removedNewsIds));
  }, [removedNewsIds]);

  /**
   * Filters news items to only include high-priority items that haven't been removed
   */
  const highPriorityNews = mockNews.filter(
    (newsItem: NewsItem) => 
      newsItem.priority === 'high' && !removedNewsIds.includes(newsItem.id)
  );

  /**
   * Removes a news item from the high-priority list
   * @param newsId - The ID of the news item to remove
   */
  const removeNewsItem = useCallback((newsId: string) => {
    setRemovedNewsIds(prev => {
      if (!prev.includes(newsId)) {
        return [...prev, newsId];
      }
      return prev;
    });
  }, []);

  /**
   * Clears all removed news items (useful for testing or reset functionality)
   */
  const clearRemovedNews = useCallback(() => {
    setRemovedNewsIds([]);
    localStorage.removeItem('removedHighPriorityNews');
  }, []);

  return {
    highPriorityNews,
    removeNewsItem,
    clearRemovedNews,
    removedCount: removedNewsIds.length
  };
};
