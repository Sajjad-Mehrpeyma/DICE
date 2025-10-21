import React from 'react';
import ChatPane from '@/components/AiCopilot/ChatPane';
import { Card, CardContent } from '@/components/ui/card';

const AiCopilot: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4">AI Copilot</h1>
      <Card className="flex-1">
        <CardContent className="h-full">
          <ChatPane />
        </CardContent>
      </Card>
    </div>
  );
};

export default AiCopilot;
