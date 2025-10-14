import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ChatBubble } from '@/components/widgets/ChatBubble';
import { Loader } from '@/components/widgets/Loader';
import { useCopilotMessages, useCopilotQuery } from '@/hooks/useCopilotQuery';

/**
 * Copilot Chat page component
 */
export const CopilotChat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading: messagesLoading } =
    useCopilotMessages();
  const { mutate: sendQuery } = useCopilotQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      // User message will be added by the mutation success callback

      // Send query to copilot
      sendQuery(
        { query: userMessage },
        {
          onSuccess: () => {
            setIsLoading(false);
          },
          onError: () => {
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (messagesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading chat history..." />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-lg shadow-sm"
      style={{ height: 'calc(100vh - 200px)' }}
    >
      {/* Chat Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
      <h2 className="text-2xl font-bold text-gray-900">Copilot</h2>
        <p className="text-sm text-gray-600">
          Hi, Ask questions about your data and get intelligent insights
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map(message => (
          <ChatBubble
            key={message.id}
            content={message.content}
            owner={message.role}
            timestamp={message.timestamp}
            sources={message.sources}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <Loader size="sm" text="Thinking..." />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Paperclip className="h-5 w-5" />
          </button>

          <div className="flex flex-1">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your data..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed p-2"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};
