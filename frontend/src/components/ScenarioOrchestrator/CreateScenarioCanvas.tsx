import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const CreateScenarioCanvas = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">Create Scenario</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Panel: Levers & Constraints */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-xs font-medium">Levers & Constraints</h4>
          <div className="space-y-2">
            <Label htmlFor="sku-selector">SKU/Channel Selector</Label>
            <Input id="sku-selector" placeholder="e.g., SKU-12345" />
          </div>
          <div className="space-y-2">
            <Label>Price Adjustment (%)</Label>
            <Slider defaultValue={[0]} max={50} min={-50} step={1} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="inventory-constraint" />
            <Label htmlFor="inventory-constraint">Enforce inventory constraints</Label>
          </div>
        </div>

        {/* Middle Panel: Timeline & Charts */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-medium">Timeline & Simulation</h4>
          <Card className="h-48 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Timeline view of events will be here.</p>
          </Card>
           <Card className="h-48 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Baseline vs. Scenario charts will be here.</p>
          </Card>
        </div>

        {/* Right Panel: Goals & Sensitivity */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-xs font-medium">Goals & Priorities</h4>
           <div className="flex items-center space-x-2">
            <Checkbox id="goal-revenue" />
            <Label htmlFor="goal-revenue">Maximize Revenue</Label>
          </div>
           <div className="flex items-center space-x-2">
            <Checkbox id="goal-margin" defaultChecked/>
            <Label htmlFor="goal-margin">Maintain Margin ≥25%</Label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreateScenarioCanvas;
