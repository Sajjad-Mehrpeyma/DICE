import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

export interface CopilotMessage {
  id: string | number;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string | Date;
  sources?: any[];
}

export interface CopilotQuery {
  query: string;
  context?: string;
  session_id?: number;
}

/**
 * Hook to fetch copilot chat history (initially empty until a query is sent)
 */
export const useCopilotMessages = () => {
  return useQuery<CopilotMessage[]>({
    queryKey: ['copilot', 'messages'],
    queryFn: async () => {
      return [];
    },
  });
};

/**
 * Hook to send a query to the copilot (calls backend /copilot/query/)
 */
export const useCopilotQuery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (query: CopilotQuery) => {
      const resp = await api.post('/copilot/query/', {
        message: query.query,
        context: query.context || '',
        session_id: query.session_id,
      });
      return resp.data?.data; // { session_id, message }
    },
    onSuccess: (data) => {
      const assistantMsg: CopilotMessage | undefined = data?.message;
      if (assistantMsg) {
        queryClient.setQueryData<CopilotMessage[]>(['copilot', 'messages'], (old) => {
          return old ? [...old, assistantMsg] : [assistantMsg];
        });
      }
    },
  });
};
