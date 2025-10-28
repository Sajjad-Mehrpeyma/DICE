import { BriefTemplate } from '@/data/briefData';
import { Eye, FileText, Calendar, Tag } from 'lucide-react';

interface TemplateCardProps {
  template: BriefTemplate;
  onViewDetails: () => void;
  onGenerateReport: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onViewDetails,
  onGenerateReport,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'executive':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
      case 'marketing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'financial':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'operational':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'strategic':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return '📅';
      case 'weekly':
        return '📊';
      case 'monthly':
        return '📈';
      case 'quarterly':
        return '📋';
      case 'annual':
        return '📑';
      default:
        return '📄';
    }
  };

  return (
    <div className="template-card">
      <div className="template-card__header">
        <div className="template-card__info">
          <h3 className="template-card__name">{template.name}</h3>
          <p className="template-card__description">{template.description}</p>

          <div className="template-card__meta">
            <div className="template-card__meta-item">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}
              >
                {template.category}
              </span>
            </div>
            <div className="template-card__meta-item">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {getFrequencyIcon(template.frequency)}
                {template.frequency}
              </span>
            </div>
            <div className="template-card__meta-item">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <FileText className="w-3 h-3" />
                {template.sections.length} sections
              </span>
            </div>
            {template.lastGenerated && (
              <div className="template-card__meta-item">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {template.lastGenerated}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="template-card__actions">
          <button
            onClick={onViewDetails}
            className="btn btn--secondary btn--sm"
            aria-label={`View details for ${template.name}`}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          <button
            onClick={onGenerateReport}
            className="btn btn--primary btn--sm"
            aria-label={`Generate report using ${template.name}`}
          >
            <FileText className="w-4 h-4 mr-1" />
            Generate Report
          </button>
        </div>
      </div>

      {template.tags.length > 0 && (
        <div className="template-card__tags">
          {template.tags.map((tag, index) => (
            <span key={index} className="template-card__tag">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
