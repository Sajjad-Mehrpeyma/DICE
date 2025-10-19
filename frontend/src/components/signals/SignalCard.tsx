import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AskButton } from '@/components/common/AskButton';

interface SignalCardProps {
  signal: {
    id: string;
    title: string;
    source: string;
    time: string;
  };
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{signal.title}</CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          <span>{signal.source}</span> -{' '}
          <span>{new Date(signal.time).toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <AskButton contextId={signal.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalCard;
