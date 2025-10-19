import React from 'react';
import { alertsData } from '@/data/alerts';
import AlertCard from '@/components/alerts/AlertCard';

/**
 * Alerts page component
 */
export const Alerts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Priority Feed</h2>
        <p className="text-gray-600 mt-1">
          A prioritized feed sorted by score = impact × confidence × recency.
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alertsData.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};
