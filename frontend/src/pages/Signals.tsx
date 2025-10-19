import React from 'react';
import { signalsData } from '@/data/signals';
import SignalCard from '@/components/signals/SignalCard';

export const Signals: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Signals</h2>
        <p className="text-muted-foreground mt-1">
          Automatically generated signals from all data sources
        </p>
      </div>
      <div className="space-y-4">
        {signalsData.map(signal => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
};
