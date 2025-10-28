import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface AlertPriority {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  enabled: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
}

interface AlertPrioritySectionProps {
  priorities: AlertPriority[];
  onTogglePriority: (
    severity: string,
    field: keyof Omit<AlertPriority, 'severity'>,
  ) => void;
}

const AlertPrioritySection: React.FC<AlertPrioritySectionProps> = ({
  priorities,
  onTogglePriority,
}) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'High':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'Medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'Low':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'High':
        return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'Low':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="settings__priority-section">
      <div className="settings__section-header">
        <h3 className="settings__section-title">
          Alert Priority Configuration
        </h3>
        <p className="settings__section-description">
          Configure which alert severities you want to receive and how you want
          to be notified.
        </p>
      </div>

      <div className="settings__priority-list">
        {priorities.map(priority => (
          <div
            key={priority.severity}
            className={`settings__priority-item ${getSeverityColor(priority.severity)}`}
          >
            <div className="settings__priority-header">
              <div className="settings__priority-icon">
                {getSeverityIcon(priority.severity)}
              </div>
              <div className="flex-1">
                <h4 className="settings__priority-name">
                  {priority.severity} Priority
                </h4>
                <p className="settings__priority-desc">
                  {priority.severity === 'Critical' &&
                    'Immediate action required - system critical issues'}
                  {priority.severity === 'High' &&
                    'Important issues requiring prompt attention'}
                  {priority.severity === 'Medium' &&
                    'Notable issues that should be addressed soon'}
                  {priority.severity === 'Low' &&
                    'Minor issues for awareness and tracking'}
                </p>
              </div>
            </div>

            <div className="settings__priority-toggles">
              <label className="settings__toggle-item">
                <span className="settings__toggle-label">Enabled</span>
                <input
                  type="checkbox"
                  checked={priority.enabled}
                  onChange={() =>
                    onTogglePriority(priority.severity, 'enabled')
                  }
                  className="settings__toggle"
                />
              </label>

              <label className="settings__toggle-item">
                <span className="settings__toggle-label">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  checked={priority.notifyEmail}
                  onChange={() =>
                    onTogglePriority(priority.severity, 'notifyEmail')
                  }
                  disabled={!priority.enabled}
                  className="settings__toggle"
                />
              </label>

              <label className="settings__toggle-item">
                <span className="settings__toggle-label">
                  In-App Notifications
                </span>
                <input
                  type="checkbox"
                  checked={priority.notifyInApp}
                  onChange={() =>
                    onTogglePriority(priority.severity, 'notifyInApp')
                  }
                  disabled={!priority.enabled}
                  className="settings__toggle"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertPrioritySection;
