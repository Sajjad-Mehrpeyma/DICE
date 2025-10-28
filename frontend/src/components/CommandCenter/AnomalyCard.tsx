import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import CopilotDrawer from '@/components/copilot/CopilotDrawer';

interface AnomalyCardProps {
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: string;
  source: string;
}

const AnomalyCard = ({ severity, description, timestamp, source }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAskCopilot = () => {
    setIsDrawerOpen(true);
  };

  const severityConfig = {
    High: {
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    },
    Medium: {
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    },
    Low: {
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      icon: <AlertTriangle className="h-5 w-5 text-blue-500" />,
    },
  };

  const config = severityConfig[severity];

  return (
    <>
      <Card className={`border-l-4 ${config.borderColor} ${config.bgColor} ${config.textColor}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            {config.icon}
          <span className="ml-2">{severity} Severity Anomaly</span>
        </CardTitle>
        <div className="text-xs text-muted-foreground">{timestamp}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-muted-foreground">{source}</div>
          <div>
            <Button variant="outline" size="sm" className="mr-2">
              Acknowledge
            </Button>
            <Button variant="outline" size="sm" className="mr-2">
              Assign
            </Button>
            <Button variant="outline" size="sm" className="mr-2">
              Create Scenario
            </Button>
            <Button variant="outline" size="sm" className="mr-2">
              Dismiss
            </Button>
            <Button variant="default" size="sm" onClick={handleAskCopilot}>
              Investigate (Ask Copilot)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    <CopilotDrawer
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      context={{ anomaly: description }}
    />
    </>
  );
};

export default AnomalyCard;
