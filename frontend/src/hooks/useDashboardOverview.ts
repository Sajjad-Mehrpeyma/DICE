import { useQuery } from '@tanstack/react-query';
import { DashboardOverview } from '@/services/api';

/**
 * Hook to fetch dashboard overview data
 */
export const useDashboardOverview = () => {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => {
      // Simulate API call with latency
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      return {
        totalVisits: 125430,
        conversionRate: 3.2,
        avgOrderValue: 89.50,
        revenue: 1123850,
        visitorsChange: 12.5,
        conversionChange: -2.1,
        revenueChange: 8.7,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};
