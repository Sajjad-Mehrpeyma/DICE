import React from 'react';
import OnboardingWizard from '@/components/SetupDataHub/OnboardingWizard';
import ConnectorsGallery from '@/components/SetupDataHub/ConnectorsGallery';

const SetupDataHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Setup & Data Hub</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Onboarding</h2>
        <OnboardingWizard />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Connectors Gallery</h2>
        <ConnectorsGallery />
      </div>
    </div>
  );
};

export default SetupDataHub;
