import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CopilotMessage, CopilotQuery } from '@/services/api';

/**
 * Hook to fetch copilot chat history
 */
export const useCopilotMessages = () => {
  return useQuery<CopilotMessage[]>({
    queryKey: ['copilot', 'messages'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock chat history
      return [
        {
          id: '1',
          content: 'Welcome to DICE! How can I help you analyze your data today?',
          role: 'assistant',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          sources: ['dashboard_data', 'user_preferences'],
        },
        {
          id: '2',
          content: 'What are my top performing products this month?',
          role: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
        },
        {
          id: '3',
          content: 'Based on your data, your top performing products this month are:\n\n1. Premium Headphones - $45,230 revenue\n2. Wireless Charger - $32,150 revenue\n3. Smart Watch - $28,900 revenue\n\nWould you like me to analyze the trends for these products?',
          role: 'assistant',
          timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
          sources: ['product_sales', 'revenue_data'],
        },
      ];
    },
  });
};

/**
 * Hook to send a query to the copilot
 */
export const useCopilotQuery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (query: CopilotQuery) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      return {
        id: Date.now().toString(),
        content: `I understand you're asking about "${query.query}". Let me analyze your data and provide insights.`,
        role: 'assistant' as const,
        timestamp: new Date(),
        sources: ['user_data', 'analytics'],
      };
    },
    onSuccess: (newMessage) => {
      // Update the messages cache
      queryClient.setQueryData<CopilotMessage[]>(['copilot', 'messages'], (old) => {
        return old ? [...old, newMessage] : [newMessage];
      });
    },
  });
};
