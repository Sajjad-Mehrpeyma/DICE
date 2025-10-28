import { Connector } from '@/data/connectorData';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface ConnectorCardProps {
  connector: Connector;
  onToggle: (newStatus: 'Connected' | 'Disconnected') => void;
}

const ConnectorCard = ({ connector, onToggle }: ConnectorCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Disconnected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getHealthColor = (_health: string) => {
    switch (health) {
      case 'Good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleToggle = () => {
    const newStatus =
      connector.status === 'Connected' ? 'Disconnected' : 'Connected';
    onToggle(newStatus);
  };

  return (
    <div
      className={`connector-card connector-card--${connector.status.toLowerCase()}`}
    >
      <div className="connector-card__header">
        <div className="connector-card__icon">
          <img
            src={connector.logo}
            alt={`${connector.name} logo`}
            className="w-8 h-8"
            onError={e => {
              // Fallback to a generic icon if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="connector-card__info">
          <h3 className="connector-card__name">{connector.name}</h3>
          <div className="connector-card__status">
            <span className="connector-card__status-text">
              {getStatusIcon(connector.status)}
              {connector.status}
            </span>
            <span
              className={`connector-card__health-badge connector-card__health-badge--${connector.health.toLowerCase()}`}
            >
              {connector.health}
            </span>
          </div>
        </div>
      </div>

      <div className="connector-card__details">
        <div className="connector-card__detail">
          <span className="connector-card__detail-label">Category:</span>
          <span className="connector-card__detail-value">
            {connector.category}
          </span>
        </div>
        <div className="connector-card__detail">
          <span className="connector-card__detail-label">Last Sync:</span>
          <span className="connector-card__detail-value">
            {connector.lastSync}
          </span>
        </div>
        <div className="connector-card__detail">
          <span className="connector-card__detail-label">API Version:</span>
          <span className="connector-card__detail-value">
            {connector.apiVersion}
          </span>
        </div>
        {connector.connectionDate && (
          <div className="connector-card__detail">
            <span className="connector-card__detail-label">Connected:</span>
            <span className="connector-card__detail-value">
              {connector.connectionDate}
            </span>
          </div>
        )}
      </div>

      <div className="connector-card__actions">
        {connector.status === 'Connected' ? (
          <button
            onClick={handleToggle}
            className="btn btn--destructive btn--sm"
            aria-label={`Disconnect ${connector.name}`}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleToggle}
            className="btn btn--primary btn--sm"
            aria-label={`Connect ${connector.name}`}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Connect
          </button>
        )}

        <button
          onClick={() => console.log('viewDetails', connector.id)}
          className="btn btn--secondary btn--sm"
          aria-label={`View details for ${connector.name}`}
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Details
        </button>
      </div>

      {connector.errorMessage && (
        <div className="connector-card__error">{connector.errorMessage}</div>
      )}

      <div className="connector-card__data-types">
        <p className="connector-card__data-types-label">Data Types:</p>
        <div className="connector-card__data-types-list">
          {connector.dataTypes.map((type, index) => (
            <span key={index} className="connector-card__data-type-tag">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectorCard;
