import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Signal {
  id: string;
  headline: string;
  source: string;
  relevance: 'High' | 'Medium' | 'Low';
}

const signals: Signal[] = [
  { id: '1', headline: 'Competitor X drops prices on key products by 10%', source: 'Retailer News', relevance: 'High' },
  { id: '2', headline: 'Search demand for "summer dresses" up 25% WoW', source: 'Google Trends', relevance: 'Medium' },
  { id: '3', headline: 'New social media trend emerges in the beauty sector', source: 'TikTok', relevance: 'Low' },
];

const SignalsFeed: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Signals Feed</h3>
      <div className="space-y-4">
        {signals.map((signal) => (
          <Card key={signal.id} className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-xs">{signal.headline}</p>
                <p className="text-xs text-muted-foreground">{signal.source}</p>
              </div>
              <Badge
                className={`${
                  signal.relevance === 'High' ? 'bg-red-500' :
                  signal.relevance === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                } text-white`}
              >
                {signal.relevance}
              </Badge>
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="outline" size="xs">Attach to Scenario</Button>
              <Button variant="outline" size="xs">Ask Copilot</Button>
              <Button variant="ghost" size="xs">Mark as Noise</Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SignalsFeed;
