import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface AnomalyCardProps {
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: string;
  source: string;
}

const AnomalyCard: React.FC<AnomalyCardProps> = ({ severity, description, timestamp, source }) => {
  const severityConfig = {
    High: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    Medium: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    Low: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = severityConfig[severity];

  return (
    <Card className={`${config.bgColor} ${config.textColor}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <AlertTriangle className={`h-4 w-4 mr-2 ${config.iconColor}`} />
          {severity} Severity Anomaly
        </CardTitle>
        <div className="text-xs text-muted-foreground">{timestamp}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-muted-foreground">{source}</div>
          <div>
            <Button variant="outline" size="sm" className="mr-2">
              Dismiss
            </Button>
            <Button variant="default" size="sm">
              Investigate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyCard;
