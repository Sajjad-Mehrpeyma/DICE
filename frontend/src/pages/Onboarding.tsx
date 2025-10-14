import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Database, Upload, Play } from 'lucide-react';
import { SourceSelector } from '@/components/forms/SourceSelector';
import { FileUpload } from '@/components/forms/FileUpload';

/**
 * Onboarding page component with 3-step setup process
 */
export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Connect Data Source',
      description: 'Choose how you want to connect your data',
      icon: <Database className="h-8 w-8" />,
    },
    {
      id: 2,
      title: 'Upload Your Data',
      description: 'Upload your CSV file or connect to Google Analytics',
      icon: <Upload className="h-8 w-8" />,
    },
    {
      id: 3,
      title: 'Start Exploring',
      description: 'Begin analyzing your data with DICE',
      icon: <Play className="h-8 w-8" />,
    },
  ];

  const handleSourceSelect = (sourceType: string) => {
    setSelectedSource(sourceType);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedSource !== null;
      case 2:
        return uploadedFile !== null || selectedSource === 'google_analytics';
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="ml-4 hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block w-16 h-0.5 bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connect Your Data Source
            </h2>
            <p className="text-gray-600 mb-8">
              Choose how you want to connect your data to DICE
            </p>

            <div className="max-w-md mx-auto">
              <SourceSelector onSourceSelect={handleSourceSelect} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upload Your Data
            </h2>
            <p className="text-gray-600 mb-8">
              {selectedSource === 'google_analytics'
                ? 'Connect to your Google Analytics account'
                : 'Upload your data file to get started'}
            </p>

            {selectedSource === 'google_analytics' ? (
              <div className="max-w-md mx-auto">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    Google Analytics Integration
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Click below to connect your Google Analytics account
                  </p>
                  <button className="btn-primary">
                    Connect Google Analytics
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <FileUpload
                  onFileSelect={handleFileUpload}
                  acceptedTypes=".csv,.xlsx"
                  maxSize={10}
                />
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start!
            </h2>
            <p className="text-gray-600 mb-8">
              Your data is connected and ready for analysis. Start exploring
              insights with DICE.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-green-900 mb-2">
                Setup Complete
              </h3>
              <p className="text-green-700 mb-4">
                You're all set to start analyzing your data
              </p>
              <button className="btn-primary">Go to Dashboard</button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button className="btn-primary flex items-center">
              Start Exploring
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
