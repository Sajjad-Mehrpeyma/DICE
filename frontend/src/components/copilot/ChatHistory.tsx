import React from 'react';
import { chatHistoryData } from '@/data/chat-history';
import { MessageSquare, AlertTriangle, RadioTower } from 'lucide-react';

interface ChatHistoryProps {
  onSelectChat: (chatId: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ onSelectChat }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />;
      case 'signal':
        return <RadioTower className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-2">
      {chatHistoryData.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {getIcon(chat.type)}
          <span className="ml-2">{chat.title}</span>
        </button>
      ))}
    </div>
  );
};
