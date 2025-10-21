import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OnboardingWizard: React.FC = () => {
  const steps = ['Connect', 'Map', 'Validate', 'Assign Roles', 'Templates'];
  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${
                index <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <p className={`ml-2 text-sm font-medium ${index <= currentStep ? 'text-primary' : 'text-gray-500'}`}>{step}</p>
            {index < steps.length - 1 && <div className="ml-2 h-px w-16 bg-gray-300" />}
          </div>
        ))}
      </div>
      <div>
        {/* Placeholder for the content of the current step */}
        <p className="text-muted-foreground">Content for {steps[currentStep]}</p>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          size="sm"
          className="ml-2"
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default OnboardingWizard;
