import { useState } from 'react';
import { Alert } from '@/data/alertData';
import {
  CheckCircle,
  ExternalLink,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  Bot,
} from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: () => void;
  onExpand: () => void;
  onOpenCopilot?: () => void;
  isNarrow?: boolean;
}

const AlertCard = ({
  alert,
  onAcknowledge,
  onExpand,
  onOpenCopilot,
  isNarrow = false,
}: AlertCardProps) => {
  const [isExpanded, setIsExpanded] = useState(alert.expanded);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand();
  };

  const handleAcknowledge = () => {
    onAcknowledge();
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'High':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'Medium':
        return <Info className="w-4 h-4 text-yellow-500" />;
      case 'Low':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (_status: string) => {
    switch (status) {
      case 'New':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Investigating':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Resolved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Dismissed':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div
      className={`alert-card ${isExpanded ? 'alert-card--expanded' : ''} ${isNarrow ? 'alert-card--narrow' : ''}`}
      onClick={handleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExpand();
        }
      }}
      aria-label={`Alert: ${alert.title}`}
    >
      <div className="alert-card__header">
        <h3 className="alert-card__title">{alert.title}</h3>
        <div className="alert-card__meta">
          <span className="alert-card__meta-item">
            {getSeverityIcon(alert.severity)}
            {alert.severity}
          </span>
          {!isNarrow && (
            <span
              className={`alert-card__status alert-card__status--${alert.status.toLowerCase()}`}
            >
              {alert.status}
            </span>
          )}
          <span className="alert-card__meta-item">
            <Clock className="w-3 h-3" />
            {alert.timestamp}
          </span>
        </div>
      </div>

      <div className="alert-card__content">
        <p className="alert-card__description">{alert.description}</p>

        <div className="alert-card__badges">
          <span className="alert-card__badge alert-card__badge--medium">
            {alert.category}
          </span>
          <span className="alert-card__badge alert-card__badge--low">
            {alert.impact} impact
          </span>
        </div>

        <div className="alert-card__actions">
          {!alert.acknowledged && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleAcknowledge();
              }}
              className="btn btn--primary btn--sm alert-card__action-button"
              aria-label={`Acknowledge alert: ${alert.title}`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Acknowledge
            </button>
          )}
          {!isNarrow && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleExpand();
              }}
              className="btn btn--secondary btn--sm alert-card__action-button"
              aria-label={`View details for: ${alert.title}`}
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
              className="btn btn--ghost btn--sm alert-card__action-button"
              aria-label={`Open Copilot for: ${alert.title}`}
            >
              <Bot className="w-4 h-4 mr-1" />
              Open Copilot
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="alert-card__details">
            <h4 className="alert-card__details-title">Alert Details</h4>
            <div className="alert-card__details-content">
              <p>
                <strong>Source:</strong> {alert.source}
              </p>
              <p>
                <strong>Priority:</strong> {alert.priority}
              </p>
              <p>
                <strong>Impact:</strong> {alert.impact}
              </p>
              {alert.assignedTo && (
                <p>
                  <strong>Assigned To:</strong> {alert.assignedTo}
                </p>
              )}
              {alert.dueDate && (
                <p>
                  <strong>Due Date:</strong> {alert.dueDate}
                </p>
              )}
              <p>
                <strong>Tags:</strong> {alert.tags.join(', ')}
              </p>
              {alert.errorMessage && (
                <p>
                  <strong>Error:</strong>{' '}
                  <span className="text-red-600">{alert.errorMessage}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
