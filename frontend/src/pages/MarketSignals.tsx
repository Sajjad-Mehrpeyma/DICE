import React from 'react';
import SignalsFeed from '@/components/MarketSignals/SignalsFeed';

const MarketSignals: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Market Signals</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Signals Feed</h2>
        <SignalsFeed />
      </div>
    </div>
  );
};

export default MarketSignals;
