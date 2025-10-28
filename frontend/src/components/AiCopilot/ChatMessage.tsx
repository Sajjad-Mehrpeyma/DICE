import { useEffect, useMemo, useState } from 'react';
import { Bot, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import EvidencePanel from './EvidencePanel';
import { sourceLogoMap, sourceUrlMap } from '@/data/logoMap';

interface ChatMessageProps {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  confidence?: number;
  modelVersion?: string;
  dataSources?: string[];
  evidenceItems?: any[];
  isStreaming?: boolean;
  streamedText?: string;
  finalMessage?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  timestamp,
  confidence,
  modelVersion,
  dataSources,
  evidenceItems,
  isStreaming: externalIsStreaming,
  streamedText: externalStreamedText,
  finalMessage,
}) => {
  const [showEvidence, setShowEvidence] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [selectedSource, setSelectedSource] = useState<any | null>(null);
  const isUser = sender === 'user';

  const mockEvidence = useMemo(() => evidenceItems, [evidenceItems]);

  useEffect(() => {
    if (!isUser) {
      // Simple task parsing: split by ',', 'then', 'and' or sentences
      const parts = message
        .split(/then| and |,|\.|;|\n/gi)
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, 5);
      const parsed = parts.length
        ? parts
        : ['Analyze context', 'Find evidence', 'Summarize findings'];
      setTasks(parsed);
      setCompleted(new Array(parsed.length).fill(false));
      setActiveTaskIndex(0);

      // Simulate progress with 2-second delays
      let i = 0;
      const run = () => {
        setActiveTaskIndex(i);
        setTimeout(() => {
          setCompleted(prev => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
          });
          i += 1;
          if (i < parsed.length) {
            run();
          } else {
            // After all tasks complete, start streaming final message
            setTimeout(() => {
              streamFinalText();
            }, 500);
          }
        }, 2000); // 2 seconds delay
      };
      run();
    }
  }, [message, isUser]);

  const streamFinalText = () => {
    const finalText =
      "Based on my analysis, I've completed all tasks successfully. The insights show positive trends with actionable recommendations ready for implementation. Would you like me to elaborate on any specific aspect?";
    let currentIndex = 0;

    setIsStreaming(true);
    setStreamedText('');

    const streamInterval = setInterval(() => {
      if (currentIndex < finalText.length) {
        setStreamedText(finalText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 30); // 30ms per character for smooth typing effect
  };

  const handleEvidenceClick = () => {
    setShowEvidence(!showEvidence);
    console.log('Evidence clicked', mockEvidence);
  };

  const openAllSources = () => {
    if (dataSources) {
      dataSources.forEach(src => {
        const url = sourceUrlMap[src] || 'https://example.com';
        window.open(url, '_blank', 'noopener');
      });
    }
  };

  return (
    <div
      className={`chat-message chat-message--${isUser ? 'user' : 'assistant'}`}
    >
      <div
        className={`chat-message__avatar chat-message__avatar--${isUser ? 'user' : 'assistant'}`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div
        className={`chat-message__bubble chat-message__bubble--${isUser ? 'user' : 'assistant'}`}
      >
        <p className="chat-message__text">{message}</p>

        {/* Sources Box with Hover Popup */}
        {!isUser && dataSources && dataSources.length > 0 && (
          <div className="chat-message__sources-container">
            <div className="chat-message__sources-box">
              <div className="chat-message__sources-box-content">
                {dataSources.slice(0, 3).map((source, index) => (
                  <img
                    key={source}
                    src={sourceLogoMap[source] || '/public/logos/generic.png'}
                    alt={source}
                    title={source}
                    className="chat-message__source-icon-compact"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                    }}
                  />
                ))}
                <span className="chat-message__sources-count">
                  {dataSources.length}{' '}
                  {dataSources.length === 1 ? 'Source' : 'Sources'}
                </span>
              </div>

              {/* Hover popup - Evidence Sources style */}
              <div className="chat-message__sources-popup">
                <div className="chat-message__sources-popup-header">
                  Evidence Sources
                </div>
                <div className="chat-message__sources-popup-list">
                  {dataSources.map((source, index) => {
                    // Mock data for demonstration - in real app, this would come from props
                    const sourceDetails = {
                      'Google Analytics': {
                        title: 'Website Traffic Analytics Report',
                        description:
                          'Traffic increased by 24% this month with 45K unique visitors and improved bounce rate.',
                        relevance: 'High',
                        date: '2024-01-15',
                      },
                      Shopify: {
                        title: 'E-commerce Orders & Revenue',
                        description:
                          'Shopify store generated $342K revenue with 1,247 orders and 3.8% conversion rate.',
                        relevance: 'High',
                        date: '2024-01-12',
                      },
                      Salesforce: {
                        title: 'Customer Engagement Metrics',
                        description:
                          'Customer retention improved to 87% with 234 new leads generated through email campaigns.',
                        relevance: 'Medium',
                        date: '2024-01-10',
                      },
                      'Facebook Ads': {
                        title: 'Social Media Ad Performance',
                        description:
                          'Ad campaigns reached 2.3M users with $0.42 CPC and 3.2% click-through rate.',
                        relevance: 'High',
                        date: '2024-01-14',
                      },
                    };

                    const details = sourceDetails[
                      source as keyof typeof sourceDetails
                    ] || {
                      title: `${source} Data Report`,
                      description: `Detailed insights and analytics from ${source}`,
                      relevance: 'Medium',
                      date: new Date().toISOString().split('T')[0],
                    };

                    return (
                      <div
                        key={index}
                        className="chat-message__sources-popup-item chat-message__sources-popup-item--clickable"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedSource({
                            ...details,
                            name: source,
                            logo: sourceLogoMap[source],
                          });
                        }}
                      >
                        <div className="chat-message__sources-popup-item-header">
                          <div className="chat-message__sources-popup-item-title">
                            {details.title}
                          </div>
                          <span
                            className={`chat-message__sources-popup-item-relevance chat-message__sources-popup-item-relevance--${details.relevance.toLowerCase()}`}
                          >
                            {details.relevance}
                          </span>
                        </div>
                        <div className="chat-message__sources-popup-item-desc">
                          {details.description}
                        </div>
                        <div className="chat-message__sources-popup-item-footer">
                          <span className="chat-message__sources-popup-item-source">
                            <img
                              src={
                                sourceLogoMap[source] ||
                                '/public/logos/generic.png'
                              }
                              alt={source}
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                marginRight: '4px',
                              }}
                            />
                            {source}
                          </span>
                          <span className="chat-message__sources-popup-item-date">
                            {details.date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Evidence Dropdown for AI messages */}
        {!isUser && mockEvidence && (
          <div className="chat-message__evidence">
            <button
              className="btn btn--ghost btn--sm chat-message__evidence-button"
              onClick={handleEvidenceClick}
            >
              Evidence ({mockEvidence?.length || 0})
              {showEvidence ? (
                <ChevronUp className="w-3 h-3 ml-1" />
              ) : (
                <ChevronDown className="w-3 h-3 ml-1" />
              )}
            </button>
            {showEvidence && (
              <div className="chat-message__evidence-dropdown">
                {mockEvidence?.map((item: any, index: number) => (
                  <div key={index} className="chat-message__evidence-item">
                    <strong>{item.title}:</strong> {item.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Task checklist for AI messages - Cursor style */}
        {!isUser && tasks.length > 0 && (
          <div className="copilot-chat__tasks">
            <div className="copilot-chat__tasks-title">Plan</div>
            <div className="copilot-chat__task-list">
              {tasks.map((t, idx) => (
                <div key={idx} className="copilot-chat__task-item">
                  {completed[idx] ? (
                    <svg
                      className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle cx="8" cy="8" r="8" />
                      <path
                        d="M6.5 9.5L4.5 7.5L3.5 8.5L6.5 11.5L12.5 5.5L11.5 4.5L6.5 9.5Z"
                        fill="white"
                      />
                    </svg>
                  ) : idx === activeTaskIndex ? (
                    <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`copilot-chat__task-text ${completed[idx] ? 'copilot-chat__task-text--completed' : ''}`}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Streamed Text Section */}
        {!isUser && (isStreaming || streamedText) && (
          <div className="chat-message__streamed-section">
            <p className="chat-message__streamed-text">
              {streamedText}
              {isStreaming && <span className="chat-message__cursor">▊</span>}
            </p>
          </div>
        )}

        {/* Badges for AI messages */}
        {!isUser && (confidence || modelVersion) && (
          <div className="chat-message__badges">
            {confidence && (
              <span className="chat-message__badge chat-message__badge--confidence">
                {Math.round(confidence * 100)}% confidence
              </span>
            )}
            {modelVersion && (
              <span className="chat-message__badge chat-message__badge--impact">
                {modelVersion}
              </span>
            )}
          </div>
        )}

        <div
          className={`chat-message__meta chat-message__meta--${isUser ? 'user' : 'assistant'}`}
        >
          <span>{timestamp}</span>
          {!isUser && <span>• AI Assistant</span>}
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
                  <img
                    src={selectedSource.logo || '/public/logos/generic.png'}
                    alt={selectedSource.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                    }}
                  />
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
                  <img
                    src={selectedSource.logo || '/public/logos/generic.png'}
                    alt={selectedSource.name}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                    }}
                  />
                  {selectedSource.name}
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
    </div>
  );
};

export default ChatMessage;
