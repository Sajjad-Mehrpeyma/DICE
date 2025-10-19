import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AskButtonProps {
  contextId: string;
}

export const AskButton: React.FC<AskButtonProps> = ({ contextId }) => {
  return (
    <Link to={`/copilot?contextId=${contextId}`}>
      <Button size="sm">
        <BrainCircuit className="mr-2 h-4 w-4" />
        Ask Copilot
      </Button>
    </Link>
  );
};
