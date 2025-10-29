import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export interface DashboardOverview {
  totalVisits: number;
  conversionRate: number;
  avgOrderValue: number;
  revenue: number;
  visitorsChange: number;
  conversionChange: number;
  revenueChange: number;
}

/**
 * Hook to fetch dashboard overview data
 */
export const useDashboardOverview = () => {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => {
      // Aggregate overview from KPI list
      // GET /dashboard/kpis/ returns { success, message, data: { [category]: [{ id,title,value,change,changeType,unit }] } }
      const resp = await api.get<{ success: boolean; data: Record<string, Array<{ value: string; change: number }> > }>(
        '/dashboard/kpis/'
      );
      const data = resp.data.data || {};

      // Best-effort aggregation: extract some totals from known KPIs if present
      const flat = Object.values(data).flat();
      const findByTitle = (title: string) => flat.find(k => k && (k as any).title === title) as any;

      const visits = findByTitle('Website Traffic');
      const revenue = findByTitle('Total Revenue');
      const conversion = findByTitle('Conversion Rate');
      const aov = findByTitle('Average Order Value');

      const parseNum = (v?: string) => {
        if (!v) return 0;
        const s = v.replace(/[$,%x]/g, '').replace(/,/g, '');
        const n = parseFloat(s);
        return Number.isFinite(n) ? n : 0;
      };

      return {
        totalVisits: parseNum(visits?.value),
        conversionRate: parseNum(conversion?.value),
        avgOrderValue: parseNum(aov?.value),
        revenue: parseNum(revenue?.value),
        visitorsChange: visits?.change ?? 0,
        conversionChange: conversion?.change ?? 0,
        revenueChange: revenue?.change ?? 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};
