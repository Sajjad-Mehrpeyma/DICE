import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message, timestamp }) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
