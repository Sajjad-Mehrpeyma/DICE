import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Decision {
  id: string;
  description: string;
  timestamp: string;
}

const decisions: Decision[] = [
  { id: '1', description: 'Paused Campaign Z due to low ROAS', timestamp: '2 hours ago' },
  { id: '2', description: 'Increased budget for Campaign Y by 10%', timestamp: '1 day ago' },
  { id: '3', description: 'Launched new ad creative for Campaign X', timestamp: '2 days ago' },
];

const RecentDecisions = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Recent Decisions & Actions</h3>
      <div className="space-y-2">
        {decisions.map((decision) => (
          <div key={decision.id} className="text-xs p-2 rounded-md bg-secondary flex justify-between items-center">
            <span>{decision.description}</span>
            <span className="text-muted-foreground">{decision.timestamp}</span>
          </div>
        ))}
      </div>
      <Button variant="link" size="sm" className="mt-2">View Decision Log</Button>
    </Card>
  );
};

export default RecentDecisions;
