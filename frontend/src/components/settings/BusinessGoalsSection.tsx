import React, { useState } from 'react';
import {
  Target,
  Edit2,
  Trash2,
  Plus,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface BusinessGoal {
  id: string;
  text: string;
  timeframe: 'short' | 'mid' | 'long';
  createdAt: string;
}

interface BusinessGoalsSectionProps {
  timeframe: 'short' | 'mid' | 'long';
  title: string;
  description: string;
  goals: BusinessGoal[];
  onAddGoal: (goal: string, timeframe: 'short' | 'mid' | 'long') => void;
  onEditGoal: (id: string, text: string) => void;
  onDeleteGoal: (id: string) => void;
}

const BusinessGoalsSection: React.FC<BusinessGoalsSectionProps> = ({
  timeframe,
  title,
  description,
  goals,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      onAddGoal(promptInput, timeframe);
      setPromptInput('');
      setIsGenerating(false);
    }, 1000);
  };

  const handleEdit = (goal: BusinessGoal) => {
    setEditingId(goal.id);
    setEditText(goal.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      onEditGoal(editingId, editText);
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const getTimeframeColor = () => {
    switch (timeframe) {
      case 'short':
        return 'from-blue-500 to-blue-600';
      case 'mid':
        return 'from-purple-500 to-purple-600';
      case 'long':
        return 'from-green-500 to-green-600';
    }
  };

  const filteredGoals = goals.filter(g => g.timeframe === timeframe);

  return (
    <div className="settings__goals-section">
      <div className="settings__goals-header">
        <div
          className={`settings__goals-icon-wrapper bg-gradient-to-br ${getTimeframeColor()}`}
        >
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="settings__goals-title">{title}</h3>
          <p className="settings__goals-description">{description}</p>
        </div>
      </div>

      {/* AI Prompt Input */}
      <div className="settings__goals-prompt">
        <div className="settings__goals-prompt-input-wrapper">
          <Sparkles className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
          <textarea
            value={promptInput}
            onChange={e => setPromptInput(e.target.value)}
            placeholder={`Describe your ${timeframe}-term business goals...`}
            className="settings__goals-prompt-input"
            rows={3}
            disabled={isGenerating}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={!promptInput.trim() || isGenerating}
          className="btn btn--primary w-full"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </>
          )}
        </button>
      </div>

      {/* Goals List */}
      {filteredGoals.length > 0 && (
        <div className="settings__goals-list">
          {filteredGoals.map(goal => (
            <div key={goal.id} className="settings__goal-item">
              {editingId === goal.id ? (
                <div className="settings__goal-edit">
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="settings__goal-edit-input"
                    rows={2}
                    autoFocus
                  />
                  <div className="settings__goal-edit-actions">
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn--sm btn--primary"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn--sm btn--ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="settings__goal-content">
                    <p className="settings__goal-text">{goal.text}</p>
                    <p className="settings__goal-meta">
                      Added {goal.createdAt}
                    </p>
                  </div>
                  <div className="settings__goal-actions">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="settings__goal-action-btn"
                      aria-label="Edit goal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="settings__goal-action-btn settings__goal-action-btn--danger"
                      aria-label="Delete goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {filteredGoals.length === 0 && (
        <div className="settings__goals-empty">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No {timeframe}-term goals defined yet. Use the prompt above to add
            one.
          </p>
        </div>
      )}
    </div>
  );
};

export default BusinessGoalsSection;
