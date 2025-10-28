import { useState } from 'react';
import { Plus, X, Play, Loader2 } from 'lucide-react';

interface Condition {
  id: string;
  text: string;
}

interface ConditionBuilderProps {
  conditions: Condition[];
  onAddCondition: (condition: string) => void;
  onRemoveCondition: (id: string) => void;
  onGeneratePlan: () => void;
  isGenerating: boolean;
}

const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  conditions,
  onAddCondition,
  onRemoveCondition,
  onGeneratePlan,
  isGenerating,
}) => {
  const [newCondition, setNewCondition] = useState('');

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      onAddCondition(newCondition.trim());
      setNewCondition('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddCondition();
    }
  };

  return (
    <div className="condition-builder">
      <div className="condition-builder__header">
        <h2 className="condition-builder__title">Scenario Conditions</h2>
        <p className="condition-builder__description">
          Define the conditions and constraints for your future planning
          scenario. Be specific about goals, constraints, and desired outcomes.
        </p>
      </div>

      <div className="condition-builder__conditions">
        {conditions.map(condition => (
          <div key={condition.id} className="condition-builder__condition-row">
            <input
              type="text"
              value={condition.text}
              onChange={e => {
                // In a real app, this would update the condition
                console.log('updateCondition', condition.id, e.target.value);
              }}
              className="input condition-builder__condition-input"
              placeholder="Enter condition..."
            />
            <button
              onClick={() => onRemoveCondition(condition.id)}
              className="btn btn--ghost condition-builder__condition-remove"
              aria-label={`Remove condition: ${condition.text}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (newCondition.trim()) {
            handleAddCondition();
          } else {
            // Focus on input
            const input = document.querySelector(
              '.condition-builder__condition-input',
            ) as HTMLInputElement;
            input?.focus();
          }
        }}
        className="btn btn--ghost condition-builder__add-condition"
        aria-label="Add new condition"
      >
        <Plus className="w-4 h-4 mr-2" />
        <span>Add Condition</span>
      </button>

      <div className="condition-builder__generate-section">
        <input
          type="text"
          value={newCondition}
          onChange={e => setNewCondition(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a new condition and press Enter..."
          className="input condition-builder__condition-input"
        />

        <button
          onClick={onGeneratePlan}
          disabled={isGenerating || conditions.length === 0}
          className="btn btn--primary condition-builder__generate-button"
          aria-label="Generate future plan based on conditions"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Generate Plan
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConditionBuilder;
