import AnomalyCard from './AnomalyCard';
import { anomalyData } from '@/data/anomalyData';

const AnomalyStrip = () => {
  return (
    <div className="space-y-4">
      {anomalyData.map((anomaly) => (
        <AnomalyCard
          key={anomaly.id}
          severity={anomaly.severity as 'High' | 'Medium' | 'Low'}
          description={anomaly.description}
          timestamp={anomaly.timestamp}
          source={anomaly.source}
        />
      ))}
    </div>
  );
};

export default AnomalyStrip;
