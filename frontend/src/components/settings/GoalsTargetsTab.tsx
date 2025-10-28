import React, { useState } from 'react';
import BusinessGoalsSection from './BusinessGoalsSection';
import AlertPrioritySection from './AlertPrioritySection';
import { Save } from 'lucide-react';

interface BusinessGoal {
  id: string;
  text: string;
  timeframe: 'short' | 'mid' | 'long';
  createdAt: string;
}

interface AlertPriority {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  enabled: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
}

const GoalsTargetsTab: React.FC = () => {
  const [goals, setGoals] = useState<BusinessGoal[]>([
    {
      id: '1',
      text: 'Increase monthly recurring revenue by 25% through improved customer retention and upselling strategies',
      timeframe: 'short',
      createdAt: '2 days ago',
    },
    {
      id: '2',
      text: 'Expand into 3 new international markets and establish local partnerships',
      timeframe: 'mid',
      createdAt: '1 week ago',
    },
  ]);

  const [priorities, setPriorities] = useState<AlertPriority[]>([
    {
      severity: 'Critical',
      enabled: true,
      notifyEmail: true,
      notifyInApp: true,
    },
    { severity: 'High', enabled: true, notifyEmail: true, notifyInApp: true },
    {
      severity: 'Medium',
      enabled: true,
      notifyEmail: false,
      notifyInApp: true,
    },
    { severity: 'Low', enabled: false, notifyEmail: false, notifyInApp: true },
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleAddGoal = (text: string, timeframe: 'short' | 'mid' | 'long') => {
    const newGoal: BusinessGoal = {
      id: Date.now().toString(),
      text,
      timeframe,
      createdAt: 'Just now',
    };
    setGoals([...goals, newGoal]);
    setHasUnsavedChanges(true);
  };

  const handleEditGoal = (id: string, text: string) => {
    setGoals(goals.map(goal => (goal.id === id ? { ...goal, text } : goal)));
    setHasUnsavedChanges(true);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    setHasUnsavedChanges(true);
  };

  const handleTogglePriority = (
    severity: string,
    field: keyof Omit<AlertPriority, 'severity'>,
  ) => {
    setPriorities(
      priorities.map(p =>
        p.severity === severity ? { ...p, [field]: !p[field] } : p,
      ),
    );
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // TODO: Save to backend/localStorage
    console.log('Saving goals and priorities...', { goals, priorities });
    setHasUnsavedChanges(false);
    // Show success message
  };

  return (
    <div className="settings__goals-targets-tab">
      {/* Header */}
      <div className="settings__tab-header">
        <div>
          <h2 className="settings__tab-title">Goals & Targets</h2>
          <p className="settings__tab-description">
            Define your business goals, configure alert priorities, and set
            targets for different timeframes
          </p>
        </div>
        {hasUnsavedChanges && (
          <button onClick={handleSave} className="btn btn--primary">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        )}
      </div>

      {/* Business Goals Section */}
      <div className="settings__goals-container">
        <div className="settings__section-header mb-6">
          <h3 className="settings__section-title">Business Goals</h3>
          <p className="settings__section-description">
            Define your strategic objectives using AI-powered prompts. Goals are
            categorized by timeframe to help you maintain focus across different
            planning horizons.
          </p>
        </div>

        <div className="settings__goals-grid">
          <BusinessGoalsSection
            timeframe="short"
            title="Short-term Goals"
            description="0-3 months - Immediate objectives and quick wins"
            goals={goals}
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
          />

          <BusinessGoalsSection
            timeframe="mid"
            title="Mid-term Goals"
            description="3-12 months - Quarterly and annual targets"
            goals={goals}
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
          />

          <BusinessGoalsSection
            timeframe="long"
            title="Long-term Goals"
            description="1-3 years - Strategic vision and growth"
            goals={goals}
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </div>
      </div>

      {/* Alert Priority Section */}
      <div className="settings__divider" />

      <AlertPrioritySection
        priorities={priorities}
        onTogglePriority={handleTogglePriority}
      />

      {/* Save Button (Bottom) */}
      {hasUnsavedChanges && (
        <div className="settings__save-footer">
          <button onClick={handleSave} className="btn btn--primary btn--lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsTargetsTab;
