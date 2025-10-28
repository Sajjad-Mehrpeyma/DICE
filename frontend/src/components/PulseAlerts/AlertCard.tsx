import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CopilotDrawer from '@/components/copilot/CopilotDrawer';

interface AlertCardProps {
  title: string;
  description: string;
  status: 'New' | 'Investigating' | 'Resolved';
  severity: 'High' | 'Medium' | 'Low';
}

const AlertCard = ({
  title,
  description,
  status,
  severity,
}: AlertCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleAskCopilot = () => {
    setIsDrawerOpen(true);
  };

  const handleCreateScenario = () => {
    navigate('/scenario-orchestrator', { state: { alert: description } });
  };

  const severityConfig = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500',
  };

  const statusConfig = {
    New: 'bg-gray-500',
    Investigating: 'bg-purple-500',
    Resolved: 'bg-green-500',
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <div className="flex items-center mt-4">
            <Badge className={`${severityConfig[severity]} text-white mr-2`}>
              {severity}
            </Badge>
            <Badge className={`${statusConfig[status]} text-white`}>
              {status}
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="mr-2">
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleCreateScenario}
            className="mr-2"
          >
            Create Scenario
          </Button>
          <Button variant="default" size="sm" onClick={handleAskCopilot}>
            Ask Copilot
          </Button>
        </CardFooter>
      </Card>
      <CopilotDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        context={{ alert: title }}
      />
    </>
  );
};

export default AlertCard;
