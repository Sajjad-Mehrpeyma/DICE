import React from 'react';
import KpiRibbon from '@/components/CommandCenter/KpiRibbon';
import LiveAnomalyStrip from '@/components/CommandCenter/LiveAnomalyStrip';
import QuickTiles from '@/components/CommandCenter/QuickTiles';
import RecentDecisions from '@/components/CommandCenter/RecentDecisions';
import Shortcuts from '@/components/CommandCenter/Shortcuts';

const CommandCenter: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Command Center</h1>
      <Shortcuts />
      <KpiRibbon />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <QuickTiles />
        </div>
        <div className="space-y-4">
          <LiveAnomalyStrip />
          <RecentDecisions />
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
