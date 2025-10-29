import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { MarketingKpi } from '@/data/marketingKpiData';

type KpiListCategory = Record<string, Array<{ id: string; title: string; value: string; change: number; changeType: string; unit: string }>>;

export const useMarketingKpis = () => {
  return useQuery<MarketingKpi[]>({
    queryKey: ['dashboard', 'kpis'],
    queryFn: async () => {
      const resp = await api.get<{ success: boolean; data: KpiListCategory }>('/dashboard/kpis/');
      const grouped = resp.data?.data || {};
      const flat = Object.values(grouped).flat();

      // Fetch details for sparkline for first N KPIs (optional)
      const detailPromises = flat.slice(0, 10).map(async (k) => {
        try {
          const d = await api.get<{ success: boolean; data: any }>(`/dashboard/kpis/${k.id}/`);
          const recent = d.data?.data?.recent_metrics || [];
          const spark = recent.map((m: any) => Number(m.value)).filter((n: number) => Number.isFinite(n));
          return { id: k.id, spark } as { id: string; spark: number[] };
        } catch {
          return { id: k.id, spark: [] };
        }
      });
      const details = await Promise.all(detailPromises);
      const idToSpark = new Map(details.map(d => [d.id, d.spark]));

      const toMarketing: MarketingKpi[] = flat.map((k: any) => {
        const changeType = (k.changeType === 'increase' ? 'positive' : 'negative') as 'positive' | 'negative';
        const category = 'conversion' as MarketingKpi['category'];
        return {
          id: k.id,
          title: k.title,
          value: String(k.value),
          change: `${k.change > 0 ? '+' : ''}${k.change}%`,
          changeType,
          sparkline: idToSpark.get(k.id) || [],
          category,
          description: k.title,
          trend: { direction: 'stable', velocity: 'moderate', forecast: [] },
          benchmark: { industry: 0, target: 0, performance: 'at' },
          segments: { channel: {}, product: {}, region: {} },
          relatedKpis: [],
          insights: [],
          recommendations: [],
        };
      });
      return toMarketing;
    },
    staleTime: 60_000,
  });
};


