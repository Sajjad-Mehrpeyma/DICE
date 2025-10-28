import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TasksPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Pause underperforming ad sets</span>
            <div>
              <Button variant="outline" size="sm" className="mr-2">
                Dry-Run
              </Button>
              <Button variant="default" size="sm">
                Request Approval
              </Button>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span>Reallocate budget to top performers</span>
            <div>
              <Button variant="outline" size="sm" className="mr-2">
                Dry-Run
              </Button>
              <Button variant="default" size="sm">
                Request Approval
              </Button>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TasksPanel;
