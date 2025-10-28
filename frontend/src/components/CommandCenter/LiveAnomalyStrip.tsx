import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Anomaly {
  id: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

const anomalies: Anomaly[] = [
  { id: '1', description: 'ROAS dropped by 15% on Campaign X', severity: 'High' },
  { id: '2', description: 'Unusually high traffic from a new referral source', severity: 'Medium' },
  { id: '3', description: 'Inventory for SKU #12345 is running low', severity: 'Low' },
];

const LiveAnomalyStrip = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
        Live Anomalies
      </h3>
      <div className="space-y-2">
        {anomalies.map((anomaly) => (
          <div key={anomaly.id} className="text-xs p-2 rounded-md bg-secondary flex justify-between items-center">
            <span>{anomaly.description}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                anomaly.severity === 'High' ? 'bg-red-500 text-white' :
                anomaly.severity === 'Medium' ? 'bg-yellow-500 text-black' :
                'bg-green-500 text-white'
              }`}
            >
              {anomaly.severity}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveAnomalyStrip;
