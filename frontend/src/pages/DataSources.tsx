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
import { sourcesData } from '@/data/sources';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const DataSources: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
        <p className="text-gray-600 mt-1">Manage your data connectors</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sourcesData.map(source => (
            <TableRow key={source.id}>
              <TableCell>{source.name}</TableCell>
              <TableCell>{source.type}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    source.status === 'connected'
                      ? 'bg-green-500'
                      : 'bg-red-500',
                    'text-white'
                  )}
                >
                  {source.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(source.lastSync).toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Disconnect
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
