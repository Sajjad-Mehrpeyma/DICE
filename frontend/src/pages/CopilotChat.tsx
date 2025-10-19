import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { copilotData } from '@/data/copilot';
import { chatHistoryData } from '@/data/chat-history';
import { Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ChatHistory } from '@/components/copilot/ChatHistory';

export const CopilotChat: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { author: 'user' | 'bot'; text: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [streamingText, setStreamingText] = useState('');

  useEffect(() => {
    const contextId = searchParams.get('contextId');
    if (contextId) {
      const newChatId = `chat-${Date.now()}`;
      chatHistoryData.push({
        id: newChatId,
        title: `Chat about ${contextId}`,
        type: contextId.startsWith('alert') ? 'alert' : 'signal',
        messages: [],
      });
      setSelectedChatId(newChatId);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (selectedChatId) {
      const chat = chatHistoryData.find(c => c.id === selectedChatId);
      setMessages(chat ? chat.messages : []);
    }
  }, [selectedChatId]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { author: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setStreamingText('');

    let index = 0;
    const interval = setInterval(() => {
      setStreamingText(copilotData.answer.substring(0, index));
      index++;
      if (index > copilotData.answer.length) {
        clearInterval(interval);
        const botMessage = { author: 'bot' as const, text: copilotData.answer };
        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        if (selectedChatId) {
          const chat = chatHistoryData.find(c => c.id === selectedChatId);
          if (chat) {
            chat.messages = updatedMessages;
          }
        }
        setStreamingText('');
      }
    }, 50);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatHistory onSelectChat={setSelectedChatId} />
        </CardContent>
      </Card>
      <Card className="lg:col-span-3 flex flex-col">
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
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {streamingText && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-muted">{streamingText}</div>
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
    </div>
  );
};
