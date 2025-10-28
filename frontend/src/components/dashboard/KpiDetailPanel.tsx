import KpiCard from './KpiCard';
import { MarketingKpi } from '@/data/marketingKpiData';

interface KpiDetailPanelProps {
  kpis: MarketingKpi[];
  onKpiClick: (kpiId: string) => void;
}

const KpiDetailPanel = ({ kpis, onKpiClick }: KpiDetailPanelProps) => {
  return (
    <div className="kpi-panel">
      <div className="kpi-panel__header">
        <h1 className="kpi-panel__title">Key Performance Indicators</h1>
        <p className="kpi-panel__subtitle">
          Real-time business metrics and insights
        </p>
      </div>

      <div className="kpi-panel__grid">
        {kpis.map(kpi => (
          <KpiCard
            key={kpi.id}
            id={kpi.id}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            sparkline={kpi.sparkline}
            onClick={() => onKpiClick(kpi.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default KpiDetailPanel;
