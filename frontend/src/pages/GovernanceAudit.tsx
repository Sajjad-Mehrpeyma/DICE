import React from 'react';
import DecisionLog from '@/components/GovernanceAudit/DecisionLog';
import ApprovalWorkflows from '@/components/GovernanceAudit/ApprovalWorkflows';

const GovernanceAudit: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Governance & Audit</h1>
      <DecisionLog />
      <ApprovalWorkflows />
    </div>
  );
};

export default GovernanceAudit;
