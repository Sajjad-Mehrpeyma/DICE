import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const tasks: Task[] = [
  { id: '1', description: 'A/B test new ad creatives', status: 'Completed' },
  { id: '2', description: 'Reallocate budget to top-performing campaigns', status: 'In Progress' },
  { id: '3', description: 'Pause underperforming ad groups', status: 'Pending' },
];

const PlanTaskList = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Plan & Task List</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
            <div className="flex items-center">
              <Checkbox checked={task.status === 'Completed'} />
              <span className="ml-2 text-xs">{task.description}</span>
            </div>
            <span className="text-xs text-muted-foreground">{task.status}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" size="sm">Dry-Run</Button>
        <Button variant="outline" size="sm">Request Approval</Button>
        <Button size="sm">Execute</Button>
      </div>
    </Card>
  );
};

export default PlanTaskList;
