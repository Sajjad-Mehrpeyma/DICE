import React from 'react';
import KpiRibbon from '@/components/CommandCenter/KpiRibbon';
import AnomalyStrip from '@/components/CommandCenter/AnomalyStrip';
import QuickTiles from '@/components/CommandCenter/QuickTiles';

const CommandCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Command Center</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
        <KpiRibbon />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Live Anomaly Strip</h2>
        <AnomalyStrip />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Tiles</h2>
        <QuickTiles />
      </div>
    </div>
  );
};

export default CommandCenter;
