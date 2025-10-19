import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Facebook, ShoppingCart } from 'lucide-react';

interface AlertCardProps {
  alert: {
    id: string;
    title: string;
    score: number;
    confidence: number;
    channel: string;
    time: string;
    impact: string;
  };
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'shopify':
        return <ShoppingCart className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{alert.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              {getChannelIcon(alert.channel)}
              <span>{new Date(alert.time).toLocaleString()}</span>
              <span>Impact: {alert.impact}</span>
            </div>
          </div>
          <Badge
            className={cn(
              alert.score > 80 ? 'bg-red-500' : 'bg-yellow-500',
              'text-white'
            )}
          >
            Score: {alert.score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <span>Confidence: {alert.confidence}%</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button size="sm">Acknowledge</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
