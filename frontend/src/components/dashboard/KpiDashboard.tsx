import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kpisData, kpisInsightsData } from '@/data/kpis';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const KpiDashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpisData.kpis.map((kpi) => (
          <Link to={`/kpi/${kpi.id}`} key={kpi.id}>
            <Card className="hover:shadow-lg transition-shadow">
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
                <div className="h-20 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.sparkline.map(v => ({ value: v }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#1d4ed8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Link>
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
