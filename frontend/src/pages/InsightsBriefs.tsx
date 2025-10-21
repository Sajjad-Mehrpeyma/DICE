import React from 'react';
import ExecutiveBriefs from '@/components/InsightsBriefs/ExecutiveBriefs';

const InsightsBriefs: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Insights & Briefs</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Executive Briefs</h2>
        <ExecutiveBriefs />
      </div>
    </div>
  );
};

export default InsightsBriefs;
