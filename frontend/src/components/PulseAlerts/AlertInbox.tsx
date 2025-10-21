import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  title: string;
  status: 'New' | 'Investigating' | 'Resolved';
  severity: 'High' | 'Medium' | 'Low';
}

const alerts: Alert[] = [
  { id: '1', title: 'Stockout risk for SKU B', status: 'New', severity: 'High' },
  { id: '2', title: 'ROAS for Campaign Y dropped by 20%', status: 'Investigating', severity: 'Medium' },
  { id: '3', title: 'Unusual traffic spike from new referral', status: 'Resolved', severity: 'Low' },
];

const AlertInbox: React.FC = () => {
  const columns: ('New' | 'Investigating' | 'Resolved')[] = ['New', 'Investigating', 'Resolved'];

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Alert Inbox</h3>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column}>
            <h4 className="text-xs font-semibold mb-2 text-center">{column}</h4>
            <div className="space-y-2 bg-muted p-2 rounded-md h-full">
              {alerts
                .filter((alert) => alert.status === column)
                .map((alert) => (
                  <Card key={alert.id} className="p-2">
                    <p className="text-xs font-semibold">{alert.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge
                        className={`${
                          alert.severity === 'High' ? 'bg-red-500' :
                          alert.severity === 'Medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } text-white`}
                      >
                        {alert.severity}
                      </Badge>
                      <Button variant="link" size="xs">Details</Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertInbox;
