import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const ExecutionSettings = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">Execution Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-run">Allow Auto-Run</Label>
          <Switch id="auto-run" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dry-run">Default to Dry-Run</Label>
          <Switch id="dry-run" defaultChecked />
        </div>
        <div className="space-y-2">
          <Label htmlFor="threshold">Approval Threshold ($)</Label>
          <Input id="threshold" type="number" placeholder="e.g., 500" />
        </div>
      </div>
    </Card>
  );
};

export default ExecutionSettings;
