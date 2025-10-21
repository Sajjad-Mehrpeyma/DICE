import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickTileProps {
  title: string;
  data?: { name: string; value: string }[];
  value?: string;
  description?: string;
}

const QuickTile: React.FC<QuickTileProps> = ({ title, data, value, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickTile;
