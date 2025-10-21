import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
}

const workflows: Workflow[] = [
  { id: '1', name: 'Price Change Approval', description: 'Requires approval from the Finance team for price changes >2%.' },
  { id: '2', name: 'Budget Reallocation', description: 'Requires approval from the Marketing Lead for reallocations >$500.' },
];

const ApprovalWorkflows: React.FC = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Approval Workflows & Policies</h3>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </div>
      <div className="space-y-2">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="p-3">
            <p className="font-semibold text-xs">{workflow.name}</p>
            <p className="text-xs text-muted-foreground">{workflow.description}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ApprovalWorkflows;
