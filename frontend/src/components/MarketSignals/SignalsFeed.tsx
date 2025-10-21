import React from 'react';
import SignalCard from './SignalCard';
import { signalData } from '@/data/signalData';

const SignalsFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      {signalData.map((signal) => (
        <SignalCard
          key={signal.id}
          headline={signal.headline}
          relevance={signal.relevance as 'High' | 'Medium' | 'Low'}
          source={signal.source}
          timestamp={signal.timestamp}
        />
      ))}
    </div>
  );
};

export default SignalsFeed;
