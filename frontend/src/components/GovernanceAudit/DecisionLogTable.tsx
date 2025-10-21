import React from 'react';
import { decisionLogData } from '@/data/decisionLogData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DecisionLogTable: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decisionLogData.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.id}</TableCell>
            <TableCell>{log.summary}</TableCell>
            <TableCell>{log.owner}</TableCell>
            <TableCell>{log.status}</TableCell>
            <TableCell>{log.impact}</TableCell>
            <TableCell>{log.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DecisionLogTable;
