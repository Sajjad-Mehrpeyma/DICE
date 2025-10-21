import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ChatPane from '@/components/AiCopilot/ChatPane';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context: any;
}

const CopilotDrawer: React.FC<CopilotDrawerProps> = ({ isOpen, onClose, context }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Ask Copilot</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Context: {JSON.stringify(context)}
          </p>
          <ChatPane />
        </div>
      </div>
    </div>
  );
};

export default CopilotDrawer;
