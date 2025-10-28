import ScenarioCanvas from '@/components/ScenarioOrchestrator/ScenarioCanvas';

const ScenarioOrchestrator: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Scenario Orchestrator</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Scenario</h2>
        <ScenarioCanvas />
      </div>
    </div>
  );
};

export default ScenarioOrchestrator;
