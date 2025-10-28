import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AlertTemplate {
  id: string;
  name: string;
  description: string;
}

const templates: AlertTemplate[] = [
  { id: '1', name: 'ROAS Drop', description: 'Get notified when Return On Ad Spend drops below a certain threshold.' },
  { id: '2', name: 'Spend Pacing', description: 'Monitor your campaign spend and get alerted if it\'s off track.' },
  { id: '3', name: 'Stockout Risk', description: 'Get an alert when inventory for a product is running low.' },
  { id: '4', name: 'Data Drift', description: 'Detect and get alerted about unexpected changes in your data.' },
];

const AlertTemplates = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Pre-built Alert Templates</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-xs">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AlertTemplates;
