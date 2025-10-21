import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  confidence?: number;
  modelVersion?: string;
  dataSources?: string[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  timestamp,
  confidence,
  modelVersion,
  dataSources,
}) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
        {confidence && (
          <div className="text-xs mt-2 text-gray-500">
            Confidence: {confidence * 100}% | Model: {modelVersion} | Data Sources: {dataSources?.join(', ')}
          </div>
        )}
        <div className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
