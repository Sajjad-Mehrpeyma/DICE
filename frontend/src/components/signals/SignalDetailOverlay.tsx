import React from 'react';
import { Signal } from '@/data/signalData';
import {
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  ExternalLink,
  Lightbulb,
  Target,
  AlertCircle,
} from 'lucide-react';

interface SignalDetailOverlayProps {
  signal: Signal | null;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  isEmbedded?: boolean;
}

const SignalDetailOverlay: React.FC<SignalDetailOverlayProps> = ({
  signal,
  isOpen,
  onClose,
  onAcknowledge,
  isEmbedded = false,
}) => {
  if (!isOpen || !signal) return null;

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'neutral':
        return <Minus className="w-5 h-5 text-gray-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'High':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Mock AI-generated content
  const aiDefinition = `This signal indicates a strategic market movement by a major competitor targeting your primary customer demographic. The campaign's scale and targeting suggest a direct competitive threat to market share in the 25-35 age segment.`;

  const businessImpact = {
    revenue: 'Potential 5-8% revenue impact over next quarter',
    marketShare: 'Risk of 2-3% market share erosion in target demographic',
    customerRetention: 'May affect customer acquisition cost by 15-20%',
  };

  const aiSuggestions = [
    'Launch counter-campaign within 2 weeks targeting brand differentiation',
    'Increase social media engagement budget by 30% in targeted segments',
    'Accelerate planned product launches to maintain competitive edge',
    'Enhance loyalty program benefits for existing customers aged 25-35',
  ];

  const keyMetrics = [
    {
      label: 'Confidence Score',
      value: `${signal.confidence}%`,
      trend: 'high',
    },
    {
      label: 'Relevance',
      value: signal.relevance,
      trend: signal.relevance === 'High' ? 'high' : 'medium',
    },
    { label: 'Category', value: signal.category, trend: 'neutral' },
  ];

  return (
    <div className="kpi-overlay kpi-overlay--embedded">
      {/* Header */}
      <div className="kpi-overlay__header">
        <div className="kpi-overlay__title-section">
          <h2 className="kpi-overlay__title">{signal.headline}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(signal.priority)}`}
            >
              {signal.priority} Priority
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              {getImpactIcon(signal.impact)}
              <span className="capitalize">{signal.impact} Impact</span>
            </span>
          </div>
        </div>
        <div className="kpi-overlay__actions">
          <button
            onClick={onClose}
            className="btn btn--ghost btn--sm kpi-overlay__close-btn"
            aria-label="Close signal details"
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
              {aiDefinition}
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">Key Metrics</h3>
          <div className="kpi-overlay__benchmarks-grid">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="kpi-overlay__benchmark-item">
                <div className="kpi-overlay__benchmark-label">
                  {metric.label}
                </div>
                <div className="kpi-overlay__benchmark-value">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="kpi-overlay__section">
          <h3 className="kpi-overlay__section-title">
            <ExternalLink className="w-5 h-5" />
            Sources
          </h3>
          <div className="kpi-overlay__insights-card">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-foreground">Source:</span>{' '}
                <span className="text-muted-foreground">{signal.source}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  Publisher:
                </span>{' '}
                <span className="text-muted-foreground">
                  {signal.publisher}
                </span>
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  Published:
                </span>{' '}
                <span className="text-muted-foreground">
                  {signal.timestamp}
                </span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Tags:</span>{' '}
                <span className="text-muted-foreground">
                  {signal.tags.join(', ')}
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
                  <TrendingDown className="w-5 h-5 text-orange-500" />
                </div>
                <div className="kpi-overlay__insights-card-text">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>{' '}
                  {value}
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
                <div className="kpi-overlay__insights-card-number">
                  {index + 1}
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
            {!signal.acknowledged && (
              <button onClick={onAcknowledge} className="btn btn--primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Acknowledge Signal
              </button>
            )}
            {signal.acknowledged && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Signal Acknowledged</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalDetailOverlay;
