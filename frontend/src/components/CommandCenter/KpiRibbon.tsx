import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const kpis: Kpi[] = [
  { title: 'Revenue', value: '$45,231.89', change: '+20.1% from last month', changeType: 'increase' },
  { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', changeType: 'increase' },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', changeType: 'increase' },
  { title: 'Active Now', value: '+573', change: '+201 since last hour', changeType: 'increase' },
];

const KpiRibbon: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{kpi.title}</h3>
            {kpi.changeType === 'increase' ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2 text-2xl font-bold">{kpi.value}</div>
          <p className="text-xs text-muted-foreground">{kpi.change}</p>
        </Card>
      ))}
    </div>
  );
};

export default KpiRibbon;
