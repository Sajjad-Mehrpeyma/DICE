import { NewsItem } from '@/data/mockNews';

/**
 * Simulates an async API call to summarize news articles
 * @param newsItems - Array of news items to summarize
 * @returns Promise that resolves to a summary string after 1-2 seconds
 */
export const fakeSummarizeAPI = async (newsItems: NewsItem[]): Promise<string> => {
  // Simulate network delay between 1-2 seconds
  const delay = Math.random() * 1000 + 1000; // 1000-2000ms
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const count = newsItems.length;
      const priorities = newsItems.reduce((acc, item) => {
        acc[item.priority] = (acc[item.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const sentiments = newsItems.reduce((acc, item) => {
        acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const highPriorityCount = priorities.high || 0;
      const positiveCount = sentiments.positive || 0;
      const negativeCount = sentiments.negative || 0;
      
      let summary = `Summary of ${count} news articles:\n\n`;
      
      if (highPriorityCount > 0) {
        summary += `• ${highPriorityCount} high-priority items require immediate attention\n`;
      }
      
      if (positiveCount > 0) {
        summary += `• ${positiveCount} positive developments identified\n`;
      }
      
      if (negativeCount > 0) {
        summary += `• ${negativeCount} negative trends to monitor\n`;
      }
      
      summary += `\nKey themes: `;
      const themes = [];
      if (newsItems.some(item => item.title.toLowerCase().includes('ai') || item.title.toLowerCase().includes('technology'))) {
        themes.push('Technology & AI');
      }
      if (newsItems.some(item => item.title.toLowerCase().includes('fed') || item.title.toLowerCase().includes('interest'))) {
        themes.push('Monetary Policy');
      }
      if (newsItems.some(item => item.title.toLowerCase().includes('climate') || item.title.toLowerCase().includes('environment'))) {
        themes.push('Climate & Environment');
      }
      if (newsItems.some(item => item.title.toLowerCase().includes('supply') || item.title.toLowerCase().includes('chain'))) {
        themes.push('Supply Chain');
      }
      
      summary += themes.length > 0 ? themes.join(', ') : 'General market news';
      summary += '\n\nRecommendation: Review high-priority items first and consider the impact of identified trends on your portfolio and business strategy.';
      
      resolve(summary);
    }, delay);
  });
};
