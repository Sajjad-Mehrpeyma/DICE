import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const CustomReportBuilder: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Custom Report Builder</h3>
      <div className="grid grid-cols-4 gap-4">
        {/* Widget Library */}
        <div className="col-span-1 bg-muted p-2 rounded-md">
          <h4 className="text-xs font-semibold mb-2">Widgets</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">KPI Tile</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Timeseries Chart</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Cohort Table</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Narrative Block</Button>
          </div>
        </div>

        {/* Report Canvas */}
        <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-md p-4 min-h-[300px]">
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Drag and drop widgets here</p>
          </div>
        </div>
      </div>
       <div className="flex justify-end mt-4">
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>
    </Card>
  );
};

export default CustomReportBuilder;
