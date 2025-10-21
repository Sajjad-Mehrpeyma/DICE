import React from 'react';
import CreateScenarioCanvas from '@/components/ScenarioOrchestrator/CreateScenarioCanvas';
import EventsRegistry from '@/components/ScenarioOrchestrator/EventsRegistry';
import SimulationControls from '@/components/ScenarioOrchestrator/SimulationControls';

const ScenarioOrchestrator: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Scenario Orchestrator</h1>
      <SimulationControls />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CreateScenarioCanvas />
        </div>
        <div>
          <EventsRegistry />
        </div>
      </div>
    </div>
  );
};

export default ScenarioOrchestrator;
