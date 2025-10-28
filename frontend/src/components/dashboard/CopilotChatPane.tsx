import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { getTasksForScenario, Task } from '@/data/taskData';

interface CopilotChatPaneProps {
  isOpen: boolean;
  onToggle: () => void;
  context?: string;
  isEmbedded?: boolean;
}

interface Source {
  name: string;
  title: string;
  description: string;
  icon: string;
  relevance: string;
  date: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  sources?: Source[];
  evidence?: { title: string; description: string }[];
  badges?: { type: 'cost' | 'impact' | 'confidence'; value: string }[];
  tasks?: Task[];
  confidence?: number;
  modelVersion?: string;
  isStreaming?: boolean;
  streamedText?: string;
  finalMessage?: string;
}

const CopilotChatPane: React.FC<CopilotChatPaneProps> = ({
  isOpen,
  onToggle,
  context,
  isEmbedded = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [hoveredSourceBox, setHoveredSourceBox] = useState<HTMLElement | null>(
    null,
  );
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mock data for sources and evidence - comprehensive source information
  const mockSources = [
    {
      name: 'Google Analytics',
      title: 'Website Traffic Analytics Report',
      description:
        'Traffic increased by 24% this month with 45K unique visitors and improved bounce rate.',
      icon: '📊',
      relevance: 'High',
      date: '2024-01-15',
    },
    {
      name: 'Shopify',
      title: 'E-commerce Orders & Revenue',
      description:
        'Shopify store generated $342K revenue with 1,247 orders and 3.8% conversion rate.',
      icon: '🛒',
      relevance: 'High',
      date: '2024-01-12',
    },
    {
      name: 'Salesforce',
      title: 'Customer Engagement Metrics',
      description:
        'Customer retention improved to 87% with 234 new leads generated through email campaigns.',
      icon: '💼',
      relevance: 'Medium',
      date: '2024-01-10',
    },
  ];

  const mockEvidence = [
    {
      title: 'Revenue Analysis Report',
      description: 'Q4 2023 revenue breakdown by product line',
    },
    {
      title: 'Customer Survey Data',
      description: 'Customer satisfaction scores and feedback',
    },
    {
      title: 'Market Research',
      description: 'Industry trends and competitive analysis',
    },
  ];

  const mockBadges = [
    { type: 'cost' as const, value: '$2,500' },
    { type: 'impact' as const, value: 'High' },
    { type: 'confidence' as const, value: '92%' },
  ];

  useEffect(() => {
    if (context) {
      // Pre-fill with context-specific message
      const contextMessage: ChatMessage = {
        id: 'context-1',
        sender: 'bot',
        message: `I see you're working on ${context}. How can I help you with this?`,
        timestamp: new Date().toLocaleTimeString(),
        sources: mockSources,
        evidence: mockEvidence,
        badges: mockBadges,
      };
      setMessages([contextMessage]);
    }
  }, [context]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const simulateTaskCompletion = (tasks: Task[], messageId: string) => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      completed: false,
      active: false,
    }));

    // Update the message tasks immediately
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, tasks: updatedTasks } : msg,
      ),
    );

    // Simulate progressive task completion
    tasks.forEach((_, index) => {
      // Mark as active (spinning)
      setTimeout(() => {
        setMessages(prev =>
          prev.map(msg => {
            if (msg.id === messageId && msg.tasks) {
              return {
                ...msg,
                tasks: msg.tasks.map((task, i) =>
                  i === index ? { ...task, active: true } : task,
                ),
              };
            }
            return msg;
          }),
        );
      }, index * 2500);

      // Mark as completed
      setTimeout(
        () => {
          setMessages(prev =>
            prev.map(msg => {
              if (msg.id === messageId && msg.tasks) {
                return {
                  ...msg,
                  tasks: msg.tasks.map((task, i) =>
                    i === index
                      ? { ...task, completed: true, active: false }
                      : task,
                  ),
                };
              }
              return msg;
            }),
          );

          // After last task completes, start streaming final message
          if (index === tasks.length - 1) {
            setTimeout(() => {
              streamFinalMessage(messageId);
            }, 500);
          }
        },
        index * 2500 + 2000,
      );
    });
  };

  const streamFinalMessage = (messageId: string) => {
    const finalText =
      "Based on my analysis, I've completed all tasks successfully. The insights show positive trends with actionable recommendations ready for implementation. Would you like me to elaborate on any specific aspect?";
    let currentIndex = 0;

    // Start streaming
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              isStreaming: true,
              streamedText: '',
              finalMessage: finalText,
            }
          : msg,
      ),
    );

    const streamInterval = setInterval(() => {
      if (currentIndex < finalText.length) {
        setMessages(prev =>
          prev.map(msg => {
            if (msg.id === messageId) {
              return {
                ...msg,
                streamedText: finalText.substring(0, currentIndex + 1),
              };
            }
            return msg;
          }),
        );
        currentIndex++;
      } else {
        // Streaming complete
        clearInterval(streamInterval);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, isStreaming: false } : msg,
          ),
        );
      }
    }, 30); // 30ms per character for smooth typing effect
  };

  const mockSendMessage = async (message: string) => {
    setIsLoading(true);
    console.log('mockSendMessage', message);

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock response with tasks
    const scenarioId = 'revenue-analysis'; // Default scenario
    const tasks = getTasksForScenario(scenarioId);

    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      message: `I'll help you with that. I've analyzed your request and generated a comprehensive action plan with ${tasks.length} tasks. Let me break this down for you:`,
      timestamp: new Date().toLocaleTimeString(),
      sources: mockSources,
      evidence: mockEvidence,
      badges: mockBadges,
      tasks: tasks,
      confidence: 0.88,
      modelVersion: 'GPT-4',
    };

    setMessages(prev => [...prev, botMessage]);
    simulateTaskCompletion(tasks, botMessage.id);
    setIsLoading(false);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      mockSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen && !isEmbedded) {
    return (
      <div className="copilot-sidebar copilot-sidebar--closed">
        <button
          onClick={onToggle}
          className="btn btn--primary copilot-sidebar__toggle"
          aria-label="Open Copilot Chat"
        >
          <Bot className="w-6 h-6" />
          <span>Open Copilot</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop - only show if not embedded */}
      {!isEmbedded && (
        <div
          className="copilot-sidebar__backdrop"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`copilot-sidebar ${isEmbedded ? 'copilot-sidebar--embedded' : 'copilot-sidebar--open'}`}
      >
        <div className="copilot-sidebar__header">
          <h2 className="copilot-sidebar__title">AI Copilot</h2>
          {!isEmbedded && (
            <button
              onClick={onToggle}
              className="btn btn--ghost copilot-sidebar__close"
              aria-label="Close Copilot Chat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="copilot-sidebar__messages">
          {messages.map(message => (
            <div
              key={message.id}
              className={`chat-message chat-message--${message.sender}`}
            >
              <div
                className={`chat-message__avatar chat-message__avatar--${message.sender}`}
              >
                {message.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`chat-message__bubble chat-message__bubble--${message.sender}`}
              >
                <p className="chat-message__text">{message.message}</p>

                {message.sender === 'bot' && message.sources && (
                  <div className="chat-message__sources-container">
                    <div
                      className="chat-message__sources-box"
                      onMouseEnter={e => {
                        if (isEmbedded) {
                          // Clear any pending hide timeout
                          if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                            hoverTimeoutRef.current = null;
                          }
                          setHoveredSourceBox(e.currentTarget);
                        }
                      }}
                      onMouseLeave={() => {
                        if (isEmbedded) {
                          // Delay hiding to allow cursor to reach popup
                          hoverTimeoutRef.current = setTimeout(() => {
                            setHoveredSourceBox(null);
                          }, 200);
                        }
                      }}
                    >
                      <div className="chat-message__sources-box-content">
                        {message.sources.slice(0, 3).map((source, index) => (
                          <span
                            key={index}
                            className="chat-message__source-icon-compact"
                          >
                            {source.icon}
                          </span>
                        ))}
                        <span className="chat-message__sources-count">
                          {message.sources.length}{' '}
                          {message.sources.length === 1 ? 'Source' : 'Sources'}
                        </span>
                      </div>

                      {/* Hover popup - Evidence Sources style */}
                      <div
                        className="chat-message__sources-popup"
                        style={
                          isEmbedded && hoveredSourceBox
                            ? {
                                display: 'block',
                                position: 'fixed',
                                top: `${hoveredSourceBox.getBoundingClientRect().top - 100}px`,
                                right: `${window.innerWidth - hoveredSourceBox.getBoundingClientRect().right + 150}px`,
                                left: 'auto',
                                bottom: 'auto',
                              }
                            : isEmbedded
                              ? { display: 'none' }
                              : undefined
                        }
                        onMouseEnter={() => {
                          if (isEmbedded) {
                            // Clear any pending hide timeout when entering popup
                            if (hoverTimeoutRef.current) {
                              clearTimeout(hoverTimeoutRef.current);
                              hoverTimeoutRef.current = null;
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          if (isEmbedded) {
                            // Hide popup when leaving it
                            hoverTimeoutRef.current = setTimeout(() => {
                              setHoveredSourceBox(null);
                            }, 200);
                          }
                        }}
                      >
                        <div className="chat-message__sources-popup-header">
                          Evidence Sources
                        </div>
                        <div className="chat-message__sources-popup-list">
                          {message.sources.map((source, index) => (
                            <div
                              key={index}
                              className="chat-message__sources-popup-item chat-message__sources-popup-item--clickable"
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedSource(source);
                              }}
                            >
                              <div className="chat-message__sources-popup-item-header">
                                <div className="chat-message__sources-popup-item-title">
                                  {source.title}
                                </div>
                                <span
                                  className={`chat-message__sources-popup-item-relevance chat-message__sources-popup-item-relevance--${source.relevance.toLowerCase()}`}
                                >
                                  {source.relevance}
                                </span>
                              </div>
                              <div className="chat-message__sources-popup-item-desc">
                                {source.description}
                              </div>
                              <div className="chat-message__sources-popup-item-footer">
                                <span className="chat-message__sources-popup-item-source">
                                  {source.icon} {source.name}
                                </span>
                                <span className="chat-message__sources-popup-item-date">
                                  {source.date}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {message.sender === 'bot' &&
                  message.tasks &&
                  message.tasks.length > 0 && (
                    <div className="copilot-chat__tasks">
                      <div className="copilot-chat__tasks-title">Plan</div>
                      <div className="copilot-chat__task-list">
                        {message.tasks.map((task, idx) => (
                          <div key={idx} className="copilot-chat__task-item">
                            {task.completed ? (
                              <svg
                                className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <circle cx="8" cy="8" r="8" />
                                <path
                                  d="M6.5 9.5L4.5 7.5L3.5 8.5L6.5 11.5L12.5 5.5L11.5 4.5L6.5 9.5Z"
                                  fill="white"
                                />
                              </svg>
                            ) : (task as any).active ? (
                              <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground flex-shrink-0 mt-0.5" />
                            )}
                            <span
                              className={`copilot-chat__task-text ${task.completed ? 'copilot-chat__task-text--completed' : ''}`}
                            >
                              {task.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {message.sender === 'bot' &&
                  (message.isStreaming || message.streamedText) && (
                    <div className="chat-message__streamed-section">
                      <p className="chat-message__streamed-text">
                        {message.streamedText}
                        {message.isStreaming && (
                          <span className="chat-message__cursor">▊</span>
                        )}
                      </p>
                    </div>
                  )}

                {message.sender === 'bot' &&
                  (message.confidence || message.modelVersion) && (
                    <div className="chat-message__badges">
                      {message.confidence && (
                        <span className="chat-message__badge chat-message__badge--confidence">
                          {Math.round(message.confidence * 100)}% confidence
                        </span>
                      )}
                      {message.modelVersion && (
                        <span className="chat-message__badge chat-message__badge--impact">
                          {message.modelVersion}
                        </span>
                      )}
                    </div>
                  )}

                {message.badges && (
                  <div className="chat-message__badges">
                    {message.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`chat-message__badge chat-message__badge--${badge.type}`}
                      >
                        {badge.value}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`chat-message__meta chat-message__meta--${message.sender}`}
                >
                  <span>{message.timestamp}</span>
                  {message.sender === 'bot' && <span>• AI Assistant</span>}
                </div>
              </div>
            </div>
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
        </div>

        <div className="copilot-sidebar__input">
          <div className="copilot-sidebar__input-container">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about the KPI..."
              className="input copilot-sidebar__input-field"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="btn btn--primary copilot-sidebar__send-button"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Source Detail Modal */}
      {selectedSource && (
        <>
          <div
            className="chat-message__source-modal-backdrop"
            onClick={() => setSelectedSource(null)}
          />
          <div className="chat-message__source-modal">
            <div className="chat-message__source-modal-header">
              <div className="chat-message__source-modal-title">
                <span className="chat-message__source-modal-icon">
                  {selectedSource.icon}
                </span>
                {selectedSource.title}
              </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="btn btn--ghost chat-message__source-modal-close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="chat-message__source-modal-content">
              <div className="chat-message__source-modal-meta">
                <span
                  className={`chat-message__sources-popup-item-relevance chat-message__sources-popup-item-relevance--${selectedSource.relevance.toLowerCase()}`}
                >
                  {selectedSource.relevance} Relevance
                </span>
                <span className="chat-message__source-modal-date">
                  {selectedSource.date}
                </span>
              </div>

              <div className="chat-message__source-modal-section">
                <h3 className="chat-message__source-modal-section-title">
                  Source
                </h3>
                <p className="chat-message__source-modal-source">
                  {selectedSource.icon} {selectedSource.name}
                </p>
              </div>

              <div className="chat-message__source-modal-section">
                <h3 className="chat-message__source-modal-section-title">
                  Description
                </h3>
                <p className="chat-message__source-modal-description">
                  {selectedSource.description}
                </p>
              </div>

              <div className="chat-message__source-modal-section">
                <h3 className="chat-message__source-modal-section-title">
                  Full Details
                </h3>
                <div className="chat-message__source-modal-details">
                  <p>
                    This data source provides comprehensive insights and
                    analytics that support the AI's recommendations. The
                    information has been analyzed and verified for accuracy and
                    relevance to your current query.
                  </p>
                  <ul className="chat-message__source-modal-list">
                    <li>Real-time data synchronization</li>
                    <li>Automated quality validation</li>
                    <li>Historical trend analysis</li>
                    <li>Cross-referenced with multiple data points</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="chat-message__source-modal-footer">
              <button
                onClick={() => setSelectedSource(null)}
                className="btn btn--primary"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CopilotChatPane;
