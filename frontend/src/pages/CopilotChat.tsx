import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { copilotData } from '@/data/copilot';
import { Send } from 'lucide-react';

export const CopilotChat: React.FC = () => {
  const [messages, setMessages] = useState<
    { author: 'user' | 'bot'; text: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [streamingText, setStreamingText] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { author: 'user', text: input }]);
    setInput('');
    setStreamingText('');

    let index = 0;
    const interval = setInterval(() => {
      setStreamingText(copilotData.answer.substring(0, index));
      index++;
      if (index > copilotData.answer.length) {
        clearInterval(interval);
        setMessages(prev => [
          ...prev,
          { author: 'bot', text: copilotData.answer },
        ]);
        setStreamingText('');
      }
    }, 50);
  };

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader>
        <CardTitle>Copilot Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.author === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.author === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {streamingText && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-200">{streamingText}</div>
            </div>
          )}
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
