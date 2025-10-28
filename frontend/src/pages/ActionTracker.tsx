import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { actionsData } from '@/data/actions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ActionTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Action Tracker</h2>
        <p className="text-gray-600 mt-1">
          List all recommendations and their status
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expected Impact</TableHead>
            <TableHead>Actual Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actionsData.map(action => (
            <TableRow key={action.id}>
              <TableCell>{action.id}</TableCell>
              <TableCell>{action.title}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    action.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500',
                    'text-white',
                  )}
                >
                  {action.status}
                </Badge>
              </TableCell>
              <TableCell>{action.expectedImpact}</TableCell>
              <TableCell>{action.actualImpact || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
