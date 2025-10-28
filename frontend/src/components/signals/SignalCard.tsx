import { Signal } from '@/data/signalData';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SignalCardProps {
  signal: Signal;
  onClick: () => void;
}

const SignalCard = ({ signal, onClick }: SignalCardProps) => {
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
      className="signal-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Signal: ${signal.headline}`}
    >
      <div className="signal-card__header">
        <div className="signal-card__header-top">
          <h3 className="signal-card__title">{signal.headline}</h3>
          <div className="signal-card__priority">
            {getPriorityIcon(signal.priority)}
            <span className="signal-card__priority-text">
              {signal.priority}
            </span>
          </div>
        </div>
        <div className="signal-card__meta">
          <span className="signal-card__meta-item">
            {getImpactIcon(signal.impact)}
            <span className="capitalize">{signal.impact} impact</span>
          </span>
          <span className="signal-card__meta-item signal-card__meta-separator">
            •
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
          <span className="signal-card__badge signal-card__badge--category">
            {signal.category}
          </span>
          <span
            className={`signal-card__badge signal-card__badge--${signal.relevance.toLowerCase()}`}
          >
            {signal.relevance} Relevance
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
