import React from 'react';
import ChatPane from '@/components/AiCopilot/ChatPane';
import PlanTaskList from '@/components/AiCopilot/PlanTaskList';
import ExecutionSettings from '@/components/AiCopilot/ExecutionSettings';

const AiCopilot: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Copilot</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChatPane />
        </div>
        <div className="space-y-4">
          <PlanTaskList />
          <ExecutionSettings />
        </div>
      </div>
    </div>
  );
};

export default AiCopilot;
