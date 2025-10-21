import React from 'react';
import ExecutiveBriefs from '@/components/InsightsBriefs/ExecutiveBriefs';
import CustomReportBuilder from '@/components/InsightsBriefs/CustomReportBuilder';

const InsightsBriefs: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Insights & Briefs</h1>
      <ExecutiveBriefs />
      <CustomReportBuilder />
    </div>
  );
};

export default InsightsBriefs;
