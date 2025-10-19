import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kpisData, kpisInsightsData } from '@/data/kpis';

const KpiDashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpisData.kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.delta > 0 ? `+${kpi.delta}` : kpi.delta}% from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        {kpisInsightsData.insights.map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{insight.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KpiDashboard;
