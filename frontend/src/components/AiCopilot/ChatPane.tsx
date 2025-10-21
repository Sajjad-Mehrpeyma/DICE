import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const messages: Message[] = [
  { sender: 'user', text: 'Why did our sales drop last week?', timestamp: '10:00 AM' },
  { sender: 'bot', text: 'Sales dropped by 12% last week, primarily due to a decrease in organic traffic. I recommend we launch a new ad campaign.', timestamp: '10:01 AM' },
  { sender: 'user', text: 'Good idea. Can you create a plan for that?', timestamp: '10:02 AM' },
  { sender: 'bot', text: 'Of course. Here is a plan...', timestamp: '10:03 AM' },
];

const ChatPane: React.FC = () => {
  return (
    <Card className="p-4 flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'bot' && (
              <Avatar>
                <AvatarImage src="/src/assets/logo.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className={`p-2 rounded-lg max-w-xs ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-right mt-1">{message.timestamp}</p>
            </div>
             {message.sender === 'user' && (
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Input placeholder="Type your message..." />
        <Button>Send</Button>
      </div>
    </Card>
  );
};

export default ChatPane;
