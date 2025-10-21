import React from 'react';
import ChatMessage from './ChatMessage';
import { chatData } from '@/data/chatData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const ChatPane: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {chatData.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender as 'user' | 'bot'}
            message={message.message}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <Input placeholder="Type your message..." />
          <Button className="ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPane;
