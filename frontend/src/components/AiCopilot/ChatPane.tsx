import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { chatData } from '@/data/chatData';
import { Send, Bot } from 'lucide-react';

interface ChatPaneProps {
  onEvidenceUpdate?: (items: any[]) => void;
}

const ChatPane = ({ onEvidenceUpdate }: ChatPaneProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(chatData);
  const [evidenceByMessage, setEvidenceByMessage] = useState<
    Record<number, any[]>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const computeMockEvidence = (text: string) => {
    // Simple heuristic to generate 3 evidence items varying by text
    const base = [
      {
        id: 'e1',
        title: 'Website Traffic Analytics',
        description: 'Monthly visitor trends and conversion data',
        source: 'Google Analytics',
        fullContent: '...',
        timestamp: new Date().toISOString(),
        relevance: 'High',
      },
      {
        id: 'e2',
        title: 'Ad Campaign Performance',
        description: 'Social media reach and engagement rates',
        source: 'Facebook Ads',
        fullContent: '...',
        timestamp: new Date().toISOString(),
        relevance: 'High',
      },
      {
        id: 'e3',
        title: 'E-commerce Sales Data',
        description: 'Product sales and customer orders',
        source: 'Shopify',
        fullContent: '...',
        timestamp: new Date().toISOString(),
        relevance: 'High',
      },
    ];
    return base
      .map((e, i) => ({ ...e, id: `${e.id}-${text.length}-${i}` }))
      .slice(0, 3);
  };

  const generateMockResponse = (userInput: string) => {
    // Generate a realistic LLM response with task breakdown
    const responses = [
      {
        message: `I'll help you analyze ${userInput}. Let me break this down into actionable steps: First, I'll gather relevant data from your financial reports and customer feedback. Then, I'll identify key patterns and trends. Next, I'll compare against industry benchmarks. After that, I'll formulate specific recommendations. Finally, I'll prioritize actions based on impact and feasibility.`,
        tasks: [
          'Gather data from financial reports and customer feedback',
          'Identify key patterns and trends in the data',
          'Compare metrics against industry benchmarks',
          'Formulate specific recommendations based on findings',
          'Prioritize actions by impact and feasibility',
        ],
      },
      {
        message: `Let me help with that. I'll approach this systematically: I'll start by reviewing your current performance metrics. Then analyze the underlying drivers and root causes. Next, benchmark against competitors and best practices. After that, identify optimization opportunities. Finally, create an actionable implementation plan.`,
        tasks: [
          'Review current performance metrics and KPIs',
          'Analyze underlying drivers and root causes',
          'Benchmark against competitors and industry best practices',
          'Identify key optimization opportunities',
          'Create actionable implementation plan with timelines',
        ],
      },
    ];

    const selected = responses[Math.floor(Math.random() * responses.length)];
    return selected;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    console.log('mockSendMessage', inputValue);
    setIsLoading(true);

    const userMsg = {
      sender: 'user',
      message: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    } as any;

    const mockResponse = generateMockResponse(inputValue);
    const botMsg = {
      sender: 'bot',
      message: mockResponse.message,
      timestamp: new Date().toLocaleTimeString(),
      dataSources: ['Google Analytics', 'Shopify', 'Slack'],
      confidence: 0.88,
      modelVersion: 'gpt-4',
    } as any;

    const idx = messages.length;
    const newEvidence = computeMockEvidence(inputValue);
    setEvidenceByMessage(prev => ({ ...prev, [idx + 1]: newEvidence }));
    onEvidenceUpdate && onEvidenceUpdate(newEvidence);

    setMessages(prev => [...prev, userMsg]);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, botMsg]);

    setIsLoading(false);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-pane">
      <div className="chat-pane__header">
        <h2 className="chat-pane__title">AI Assistant</h2>
        <div className="chat-pane__status">
          <div className="chat-pane__status-indicator"></div>
          <span className="chat-pane__status-text">Online</span>
        </div>
      </div>

      <div className="chat-pane__messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender as 'user' | 'bot'}
            message={message.message}
            timestamp={message.timestamp}
            confidence={(message as any).confidence}
            modelVersion={(message as any).modelVersion}
            dataSources={(message as any).dataSources}
            evidenceItems={evidenceByMessage[index]}
          />
        ))}

        {isLoading && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-message__avatar chat-message__avatar--assistant">
              <Bot className="w-4 h-4" />
            </div>
            <div className="chat-message__bubble chat-message__bubble--assistant">
              <div className="chat-message__loading">
                <div className="chat-message__spinner"></div>
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-pane__input">
        <div className="chat-pane__input-container">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about your business..."
            className="input chat-pane__input-field"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="btn btn--primary chat-pane__send-button"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPane;
