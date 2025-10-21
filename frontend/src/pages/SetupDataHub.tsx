import React from 'react';
import OnboardingWizard from '@/components/SetupDataHub/OnboardingWizard';
import ConnectorsGallery from '@/components/SetupDataHub/ConnectorsGallery';
import SchemaMappingEditor from '@/components/SetupDataHub/SchemaMappingEditor';
import DataHealthDashboard from '@/components/SetupDataHub/DataHealthDashboard';

const SetupDataHub: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Setup & Data Hub</h1>
      <OnboardingWizard />
      <DataHealthDashboard />
      <ConnectorsGallery />
      <SchemaMappingEditor />
    </div>
  );
};

export default SetupDataHub;
