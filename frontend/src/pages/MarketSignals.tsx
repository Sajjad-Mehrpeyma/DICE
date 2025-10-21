import React from 'react';
import SignalsFeed from '@/components/MarketSignals/SignalsFeed';
import Watchlists from '@/components/MarketSignals/Watchlists';

const MarketSignals: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Market Signals</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <SignalsFeed />
        </div>
        <div className="lg:col-span-2">
          <Watchlists />
        </div>
      </div>
    </div>
  );
};

export default MarketSignals;
