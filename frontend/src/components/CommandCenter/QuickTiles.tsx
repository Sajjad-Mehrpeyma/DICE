import React from 'react';
import { Card } from '@/components/ui/card';

const QuickTiles: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Top Campaigns</h3>
        {/* Placeholder for top campaigns */}
        <p className="text-xs text-muted-foreground">Data to be populated</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Top SKUs</h3>
        {/* Placeholder for top SKUs */}
        <p className="text-xs text-muted-foreground">Data to be populated</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Budget Pacing</h3>
        {/* Placeholder for budget pacing */}
        <p className="text-xs text-muted-foreground">Data to be populated</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Site Health</h3>
        {/* Placeholder for site health */}
        <p className="text-xs text-muted-foreground">Data to be populated</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Sales Funnel Snapshot</h3>
        {/* Placeholder for sales funnel snapshot */}
        <p className="text-xs text-muted-foreground">Data to be populated</p>
      </Card>
    </div>
  );
};

export default QuickTiles;
