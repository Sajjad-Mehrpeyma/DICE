import React from 'react';
import DecisionLogTable from '@/components/GovernanceAudit/DecisionLogTable';

const GovernanceAudit: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Governance & Audit</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Decision Log</h2>
        <DecisionLogTable />
      </div>
    </div>
  );
};

export default GovernanceAudit;
