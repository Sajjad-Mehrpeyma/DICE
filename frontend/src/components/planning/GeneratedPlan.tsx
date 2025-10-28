import { useState, useEffect } from 'react';
import { Edit3, Save, Loader2 } from 'lucide-react';

interface GeneratedPlanProps {
  plan: string;
  onPlanChange: (plan: string) => void;
  isGenerating: boolean;
}

const GeneratedPlan = ({
  plan,
  onPlanChange,
  isGenerating,
}: GeneratedPlanProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);

  useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  const handleSave = () => {
    onPlanChange(editedPlan);
    setIsEditing(false);
    console.log('savePlan', editedPlan);
  };

  const handleCancel = () => {
    setEditedPlan(plan);
    setIsEditing(false);
  };

  return (
    <div className="generated-plan">
      <div className="generated-plan__header">
        <h2 className="generated-plan__title">Generated Strategic Plan</h2>
        <div className="generated-plan__actions">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn--secondary btn--sm"
              aria-label="Edit generated plan"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="btn btn--primary btn--sm"
                aria-label="Save changes to plan"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="btn btn--secondary btn--sm"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="generated-plan__content">
        {isGenerating ? (
          <div className="generated-plan__loading">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">
              Generating your strategic plan...
            </span>
          </div>
        ) : plan ? (
          isEditing ? (
            <textarea
              value={editedPlan}
              onChange={e => setEditedPlan(e.target.value)}
              className="input generated-plan__textarea"
              placeholder="Your generated plan will appear here..."
              rows={20}
            />
          ) : (
            <div className="generated-plan__text">
              {plan.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return <br key={index} />;

                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3
                      key={index}
                      className="text-lg font-semibold text-foreground mt-4 mb-2"
                    >
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }

                if (paragraph.startsWith('* ') && paragraph.endsWith('*')) {
                  return (
                    <p
                      key={index}
                      className="text-sm text-muted-foreground ml-4"
                    >
                      • {paragraph.slice(2, -2)}
                    </p>
                  );
                }

                if (
                  paragraph.startsWith('1. ') ||
                  paragraph.startsWith('2. ') ||
                  paragraph.startsWith('3. ')
                ) {
                  return (
                    <p key={index} className="text-sm text-foreground ml-4">
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p key={index} className="text-sm text-foreground mb-2">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          )
        ) : (
          <div className="generated-plan__empty">
            <div className="text-muted-foreground mb-4">
              <Edit3 className="w-12 h-12 mx-auto mb-2" />
              <p>No plan generated yet</p>
              <p className="text-sm">
                Add conditions and click "Generate Plan" to create your
                strategic plan
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedPlan;
