import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { playbooksData } from '@/data/playbooks';

export const Playbooks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Playbooks</h2>
        <p className="text-gray-600 mt-1">
          List, edit and run pre-defined playbooks
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playbooksData.map(playbook => (
            <TableRow key={playbook.id}>
              <TableCell>{playbook.name}</TableCell>
              <TableCell>{playbook.type}</TableCell>
              <TableCell>${playbook.cost}</TableCell>
              <TableCell>
                {new Date(playbook.lastUsed).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Run</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
