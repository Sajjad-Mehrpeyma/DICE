import React from 'react';
import ChatPane from '@/components/AiCopilot/ChatPane';
import EvidencePanel from '@/components/AiCopilot/EvidencePanel';
import TasksPanel from '@/components/AiCopilot/TasksPanel';

const AiCopilot: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4">AI Copilot</h1>
      <div className="grid grid-cols-3 gap-4 flex-1">
        <div className="col-span-1">
          <ChatPane />
        </div>
        <div className="col-span-1">
          <EvidencePanel />
        </div>
        <div className="col-span-1">
          <TasksPanel />
        </div>
      </div>
    </div>
  );
};

export default AiCopilot;
