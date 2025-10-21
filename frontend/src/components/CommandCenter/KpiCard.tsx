import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  sparkline: number[];
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, sparkline }) => {
  const chartData = sparkline.map((value, index) => ({ name: index, value }));
  const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor}`}>{change} from last month</p>
        <div className="h-8 w-full mt-2">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
