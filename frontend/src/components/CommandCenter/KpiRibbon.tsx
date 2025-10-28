import KpiCard from './KpiCard';
import { kpiData } from '@/data/kpiData';

const KpiRibbon = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <KpiCard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          changeType={kpi.changeType as 'positive' | 'negative'}
          sparkline={kpi.sparkline}
        />
      ))}
    </div>
  );
};

export default KpiRibbon;
