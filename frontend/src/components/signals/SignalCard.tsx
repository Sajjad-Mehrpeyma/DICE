import { useState } from 'react';
import { Signal } from '@/data/signalData';
import {
  CheckCircle,
  ExternalLink,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Bot,
} from 'lucide-react';

interface SignalCardProps {
  signal: Signal;
  onAcknowledge: () => void;
  onExpand: () => void;
  onOpenCopilot?: () => void;
  isNarrow?: boolean;
}

const SignalCard = ({
  signal,
  onAcknowledge,
  onExpand,
  onOpenCopilot,
  isNarrow = false,
}: SignalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(signal.expanded);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand();
  };

  const handleAcknowledge = () => {
    onAcknowledge();
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'High':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'Medium':
        return <Minus className="w-4 h-4 text-yellow-500" />;
      case 'Low':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      className={`signal-card ${isExpanded ? 'signal-card--expanded' : ''} ${isNarrow ? 'signal-card--narrow' : ''}`}
      onClick={handleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExpand();
        }
      }}
      aria-label={`Signal: ${signal.headline}`}
    >
      <div className="signal-card__header">
        <h3 className="signal-card__title">{signal.headline}</h3>
        <div className="signal-card__meta">
          <span className="signal-card__meta-item">
            {getPriorityIcon(signal.priority)}
            {signal.priority}
          </span>
          <span className="signal-card__meta-item">
            {getImpactIcon(signal.impact)}
            {signal.impact}
          </span>
          <span className="signal-card__meta-item">
            <Clock className="w-3 h-3" />
            {signal.timestamp}
          </span>
        </div>
      </div>

      <div className="signal-card__content">
        <p className="signal-card__description">{signal.description}</p>

        <div className="signal-card__badges">
          <span
            className={`signal-card__badge signal-card__badge--${signal.relevance.toLowerCase()}`}
          >
            {signal.relevance} Relevance
          </span>
          <span className="signal-card__badge signal-card__badge--medium">
            {signal.category}
          </span>
          <span className="signal-card__badge signal-card__badge--low">
            {signal.confidence}% confidence
          </span>
        </div>

        <div className="signal-card__actions">
          <button
            onClick={e => {
              e.stopPropagation();
              handleAcknowledge();
            }}
            className="btn btn--primary btn--sm signal-card__action-button"
            aria-label={`Acknowledge signal: ${signal.headline}`}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Acknowledge
          </button>
          {!isNarrow && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleExpand();
              }}
              className="btn btn--secondary btn--sm signal-card__action-button"
              aria-label={`View details for: ${signal.headline}`}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          )}
          {onOpenCopilot && !isNarrow && (
            <button
              onClick={e => {
                e.stopPropagation();
                onOpenCopilot();
              }}
              className="btn btn--ghost btn--sm signal-card__action-button"
              aria-label={`Open Copilot for: ${signal.headline}`}
            >
              <Bot className="w-4 h-4 mr-1" />
              Open Copilot
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="signal-card__details">
            <h4 className="signal-card__details-title">
              Additional Information
            </h4>
            <div className="signal-card__details-content">
              <p>
                <strong>Source:</strong> {signal.source}
              </p>
              <p>
                <strong>Publisher:</strong> {signal.publisher}
              </p>
              <p>
                <strong>Tags:</strong> {signal.tags.join(', ')}
              </p>
              <p>
                <strong>Confidence Level:</strong> {signal.confidence}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalCard;
