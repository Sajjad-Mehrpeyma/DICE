import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Brief {
  id: string;
  title: string;
  date: string;
  confidence: 'High' | 'Medium' | 'Low';
}

const briefs: Brief[] = [
  { id: '1', title: 'Weekly Performance Summary', date: '2025-10-20', confidence: 'High' },
  { id: '2', title: 'Monthly Marketing Review', date: '2025-10-01', confidence: 'Medium' },
  { id: '3', title: 'Q3 Post-Mortem: Promo X', date: '2025-09-15', confidence: 'High' },
];

const ExecutiveBriefs: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Executive Briefs</h3>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <Card key={brief.id} className="p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-xs">{brief.title}</p>
              <p className="text-xs text-muted-foreground">{brief.date}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={`${
                  brief.confidence === 'High' ? 'bg-green-500' :
                  brief.confidence === 'Medium' ? 'bg-yellow-500' :
                  'bg-red-500'
                } text-white`}
              >
                {brief.confidence} Confidence
              </Badge>
              <Button variant="outline" size="xs">View</Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ExecutiveBriefs;
