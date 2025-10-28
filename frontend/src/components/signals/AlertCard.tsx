import { Alert } from '@/data/alertData';
import { Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onClick: () => void;
}

const AlertCard = ({ alert, onClick }: AlertCardProps) => {
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

  return (
    <div
      className="alert-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Alert: ${alert.title}`}
    >
      <div className="alert-card__header">
        <div className="alert-card__header-top">
          <h3 className="alert-card__title">{alert.title}</h3>
          <div className="alert-card__severity">
            {getSeverityIcon(alert.severity)}
            <span className="alert-card__severity-text">{alert.severity}</span>
          </div>
        </div>
        <div className="alert-card__meta">
          <span
            className={`alert-card__status alert-card__status--${alert.status.toLowerCase()}`}
          >
            {alert.status}
          </span>
          <span className="alert-card__meta-separator">•</span>
          <span className="alert-card__meta-item">
            <Clock className="w-3 h-3" />
            {alert.timestamp}
          </span>
        </div>
      </div>

      <div className="alert-card__content">
        <p className="alert-card__description">{alert.description}</p>

        <div className="alert-card__badges">
          <span className="alert-card__badge alert-card__badge--category">
            {alert.category}
          </span>
          <span className="alert-card__badge alert-card__badge--impact">
            {alert.impact} impact
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
