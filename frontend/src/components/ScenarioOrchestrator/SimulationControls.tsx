import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, FileText } from 'lucide-react';

const SimulationControls = () => {
  return (
    <Card className="p-4 flex justify-end space-x-2">
      <Button variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        Save as Template
      </Button>
      <Button variant="outline" size="sm">
        Quick Preview
      </Button>
      <Button size="sm">
        <PlayCircle className="h-4 w-4 mr-2" />
        Run & Send to Copilot
      </Button>
    </Card>
  );
};

export default SimulationControls;
