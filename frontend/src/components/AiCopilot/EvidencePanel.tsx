import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EvidencePanel: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Evidence panel content will go here.</p>
      </CardContent>
    </Card>
  );
};

export default EvidencePanel;
