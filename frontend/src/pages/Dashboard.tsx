import React from 'react';
import ExecutiveSnapshotCard from '@/components/dashboard/ExecutiveSnapshotCard';
import KpiDashboard from '@/components/dashboard/KpiDashboard';

/**
 * Dashboard page component
 */
export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <ExecutiveSnapshotCard />
      <KpiDashboard />
    </div>
  );
};
