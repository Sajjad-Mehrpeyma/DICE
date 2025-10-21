import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Decision {
  id: string;
  summary: string;
  owner: string;
  approver: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const decisions: Decision[] = [
  { id: 'D001', summary: 'Price update for SKU-123', owner: 'AI Copilot', approver: 'Finance Team', status: 'Approved' },
  { id: 'D002', summary: 'Pause Campaign Z', owner: 'Marketing Team', approver: 'N/A', status: 'Approved' },
  { id: 'D003', summary: 'Reallocate budget from Campaign A to B', owner: 'AI Copilot', approver: 'Marketing Lead', status: 'Pending' },
];

const DecisionLog: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Decision Log</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decisions.map((decision) => (
            <TableRow key={decision.id}>
              <TableCell>{decision.id}</TableCell>
              <TableCell>{decision.summary}</TableCell>
              <TableCell>{decision.owner}</TableCell>
              <TableCell>{decision.approver}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    decision.status === 'Approved' ? 'default' :
                    decision.status === 'Pending' ? 'secondary' :
                    'destructive'
                  }
                >
                  {decision.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DecisionLog;
