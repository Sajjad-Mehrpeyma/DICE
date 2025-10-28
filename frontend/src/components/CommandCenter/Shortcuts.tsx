import { Button } from '@/components/ui/button';
import { PauseCircle, PlusCircle, MessageSquare } from 'lucide-react';

const Shortcuts = () => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">
        <PauseCircle className="h-4 w-4 mr-2" />
        Pause Campaign
      </Button>
      <Button variant="outline" size="sm">
        <PlusCircle className="h-4 w-4 mr-2" />
        Create Scenario
      </Button>
      <Button variant="outline" size="sm">
        <MessageSquare className="h-4 w-4 mr-2" />
        Open Copilot
      </Button>
    </div>
  );
};

export default Shortcuts;
