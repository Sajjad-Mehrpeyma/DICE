import { Card } from '@/components/ui/card';

interface DataHealthMetric {
  title: string;
  value: string;
  status: 'Good' | 'Warning' | 'Error';
}

const metrics: DataHealthMetric[] = [
  { title: 'Sync Status', value: 'OK', status: 'Good' },
  { title: 'Latency', value: '2 minutes', status: 'Good' },
  { title: 'Missing Fields', value: '3', status: 'Warning' },
  { title: 'Duplicates', value: '0', status: 'Good' },
];

const DataHealthDashboard = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Data Health</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="p-4">
            <h4 className="text-xs font-medium">{metric.title}</h4>
            <p
              className={`text-lg font-bold ${
                metric.status === 'Good' ? 'text-green-500' :
                metric.status === 'Warning' ? 'text-yellow-500' :
                'text-red-500'
              }`}
            >
              {metric.value}
            </p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default DataHealthDashboard;
