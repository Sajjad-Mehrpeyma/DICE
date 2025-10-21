import React from 'react';

const OnboardingStepper: React.FC = () => {
  const steps = ['Connect', 'Map', 'Validate', 'Assign Roles', 'Templates'];
  const [currentStep] = React.useState(0);

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-4">
              <div className={`font-semibold ${index <= currentStep ? 'text-primary' : 'text-gray-600'}`}>
                {step}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OnboardingStepper;
