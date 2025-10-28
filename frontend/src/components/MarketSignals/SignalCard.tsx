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
import { MessageSquare } from 'lucide-react';
import CopilotDrawer from '@/components/copilot/CopilotDrawer';

interface SignalCardProps {
  headline: string;
  relevance: 'High' | 'Medium' | 'Low';
  source: string;
  timestamp: string;
}

const SignalCard = ({
  headline,
  relevance,
  source,
  timestamp,
}: SignalCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleAskCopilot = () => {
    setIsDrawerOpen(true);
  };

  const handleCreateScenario = () => {
    navigate('/scenario-orchestrator', { state: { signal: headline } });
  };

  const relevanceConfig = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500',
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{headline}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Badge className={`${relevanceConfig[relevance]} text-white`}>
              {relevance}
            </Badge>
            <div className="ml-4 text-sm text-muted-foreground">
              {source} - {timestamp}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="mr-2">
            Dismiss
          </Button>
          <Button variant="default" size="sm" onClick={handleCreateScenario}>
            Create Scenario
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAskCopilot}
            className="ml-auto"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <CopilotDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        context={{ signal: headline }}
      />
    </>
  );
};

export default SignalCard;
