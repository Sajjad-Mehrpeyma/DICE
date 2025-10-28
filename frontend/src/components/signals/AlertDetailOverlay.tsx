import React from 'react';
import { Alert } from '@/data/alertData';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  AlertCircle,
  ClipboardList,
  User,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface AlertDetailOverlayProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  isEmbedded?: boolean;
}

const AlertDetailOverlay: React.FC<AlertDetailOverlayProps> = ({
  alert,
  isOpen,
  onClose,
  onAcknowledge,
  isEmbedded = false,
}) => {
  if (!isOpen || !alert) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'High':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
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

  // Mock AI-generated content
  const aiDefinition = `This alert indicates a significant decline in advertising performance for your Summer Sale campaign. The 30% drop in ROAS suggests either audience fatigue, creative underperformance, or increased competition in your ad placements.`;

  const businessImpact = {
    immediate:
      'Reduced advertising efficiency leading to higher customer acquisition costs',
    shortTerm:
      'Potential revenue loss of $15,000-$25,000 if not addressed within 48 hours',
    longTerm:
      'May affect overall quarterly marketing budget allocation and ROI targets',
  };

  const resolutionSteps = [
    {
      step: 'Analyze campaign creative performance',
      description:
        'Review click-through rates and engagement metrics by creative variant',
      priority: 'Immediate',
    },
    {
      step: 'Adjust audience targeting',
      description: 'Refresh audience segments and exclude fatigued users',
      priority: 'High',
    },
    {
      step: 'Optimize bidding strategy',
      description:
        'Consider switching to target ROAS bidding at 3.5x to allow for optimization',
      priority: 'High',
    },
    {
      step: 'Test new ad variants',
      description:
        'Launch A/B test with 3 new creative variations emphasizing value proposition',
      priority: 'Medium',
    },
  ];

  const aiSuggestions = [
    'Pause underperforming ad sets with ROAS below 1.5x immediately',
    'Allocate 20% of budget to lookalike audiences based on recent converters',
    'Implement dynamic product ads to improve relevance',
    'Consider time-limited offers to create urgency and improve conversion rates',
  ];

  return (
    <div className="kpi-overlay kpi-overlay--embedded">
      {/* Header */}
      <div className="kpi-overlay__header">
        <div className="kpi-overlay__title-section">
          <h2 className="kpi-overlay__title">{alert.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(alert.severity)}`}
            >
              {alert.severity} Severity
            </span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(alert.status)}`}
            >
              {alert.status}
            </span>
          </div>
        </div>
        <div className="kpi-overlay__actions">
          <button
            onClick={onClose}
            className="btn btn--ghost btn--sm kpi-overlay__close-btn"
            aria-label="Close alert details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="kpi-overlay__content">
        {/* Definition Section */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <AlertCircle className="w-5 h-5" />
            Definition
          </h3>
          <div className="kpi-overlay__insights-card">
            <p className="text-sm text-foreground leading-relaxed">
              {alert.description}
            </p>
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {aiDefinition}
              </p>
            </div>
          </div>
        </div>

        {/* Alert Details */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">Alert Details</h3>
          <div className="kpi-overlay__benchmarks-grid">
            <div className="kpi-overlay__benchmark-item">
              <div className="kpi-overlay__benchmark-label">Category</div>
              <div className="kpi-overlay__benchmark-value capitalize">
                {alert.category}
              </div>
            </div>
            <div className="kpi-overlay__benchmark-item">
              <div className="kpi-overlay__benchmark-label">Impact Type</div>
              <div className="kpi-overlay__benchmark-value capitalize">
                {alert.impact}
              </div>
            </div>
            <div className="kpi-overlay__benchmark-item">
              <div className="kpi-overlay__benchmark-label">Priority</div>
              <div className="kpi-overlay__benchmark-value">
                {alert.priority}
              </div>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <ExternalLink className="w-5 h-5" />
            Source Information
          </h3>
          <div className="kpi-overlay__insights-card">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-foreground">Source:</span>{' '}
                <span className="text-muted-foreground">{alert.source}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Detected:</span>{' '}
                <span className="text-muted-foreground">{alert.timestamp}</span>
              </div>
              {alert.assignedTo && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    Assigned To:
                  </span>{' '}
                  <span className="text-muted-foreground">
                    {alert.assignedTo}
                  </span>
                </div>
              )}
              {alert.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    Due Date:
                  </span>{' '}
                  <span className="text-muted-foreground">{alert.dueDate}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-foreground">Tags:</span>{' '}
                <span className="text-muted-foreground">
                  {alert.tags.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Impact */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <Target className="w-5 h-5" />
            Business Impact
          </h3>
          <div className="kpi-overlay__insights-list">
            {Object.entries(businessImpact).map(([key, value], index) => (
              <div key={index} className="kpi-overlay__insights-card">
                <div className="kpi-overlay__insights-card-icon">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="kpi-overlay__insights-card-text">
                  <span className="font-semibold capitalize">
                    {key} Impact:
                  </span>{' '}
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Steps */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <ClipboardList className="w-5 h-5" />
            Resolution Steps
          </h3>
          <div className="kpi-overlay__insights-list">
            {resolutionSteps.map((item, index) => (
              <div key={index} className="kpi-overlay__insights-card">
                <div className="kpi-overlay__insights-card-number">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">
                      {item.step}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(item.priority)}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <Lightbulb className="w-5 h-5" />
            AI Recommendations
          </h3>
          <div className="kpi-overlay__insights-list">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="kpi-overlay__insights-card kpi-overlay__insights-card--recommendation"
              >
                <div className="kpi-overlay__insights-card-icon">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <div className="kpi-overlay__insights-card-text">
                  {suggestion}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="kpi-overlay__section">
          <div className="flex gap-3">
            {!alert.acknowledged && (
              <button onClick={onAcknowledge} className="btn btn--primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Acknowledge Alert
              </button>
            )}
            {alert.acknowledged && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Alert Acknowledged</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailOverlay;
