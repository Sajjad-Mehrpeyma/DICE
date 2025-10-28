import { useState } from 'react';
import {
  briefTemplates,
  BriefTemplate,
  getBriefTemplate,
} from '@/data/briefData';
import TemplateCard from '@/components/insights/TemplateCard';
import TemplateDrawer from '@/components/insights/TemplateDrawer';

const InsightsBriefs = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<BriefTemplate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleViewDetails = (templateId: number) => {
    const template = getBriefTemplate(templateId);
    if (template) {
      setSelectedTemplate(template);
      setIsDrawerOpen(true);
    }
  };

  const handleGenerateReport = async (templateId: number) => {
    setIsGenerating(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('generateReport', templateId);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateTemplate = (templateId: number, data: any) => {
    console.log('updateTemplate', templateId, data);
    // In a real app, this would update the template
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="insights-page">
      <div className="insights-page__header">
        <h1 className="insights-page__title">Insights & Briefs</h1>
        <p className="insights-page__description">
          Create, customize, and generate comprehensive business reports and
          executive briefs.
        </p>
      </div>

      <div className="insights-page__template-list">
        {briefTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onViewDetails={() => handleViewDetails(template.id)}
            onGenerateReport={() => handleGenerateReport(template.id)}
          />
        ))}
      </div>

      {selectedTemplate && (
        <TemplateDrawer
          template={selectedTemplate}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          onGenerateReport={() => handleGenerateReport(selectedTemplate.id)}
          onUpdateTemplate={handleUpdateTemplate}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
};

export default InsightsBriefs;
