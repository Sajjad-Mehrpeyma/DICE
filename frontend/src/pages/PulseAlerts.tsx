import React from 'react';
import AlertTemplates from '@/components/PulseAlerts/AlertTemplates';
import AlertInbox from '@/components/PulseAlerts/AlertInbox';

const PulseAlerts: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pulse & Alerts</h1>
      <AlertInbox />
      <AlertTemplates />
    </div>
  );
};

export default PulseAlerts;
