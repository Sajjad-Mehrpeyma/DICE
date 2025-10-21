import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SignalCardProps {
  headline: string;
  relevance: 'High' | 'Medium' | 'Low';
  source: string;
  timestamp: string;
}

const SignalCard: React.FC<SignalCardProps> = ({ headline, relevance, source, timestamp }) => {
  const relevanceConfig = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{headline}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Badge className={`${relevanceConfig[relevance]} text-white`}>{relevance}</Badge>
          <div className="ml-4 text-sm text-muted-foreground">
            {source} - {timestamp}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="mr-2">
          Dismiss
        </Button>
        <Button variant="default" size="sm">
          Simulate Impact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignalCard;
