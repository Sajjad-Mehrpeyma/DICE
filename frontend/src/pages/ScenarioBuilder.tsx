import React, { useState } from 'react';
import { ScenarioForm } from '@/components/forms/ScenarioForm';
import { Loader } from '@/components/widgets/Loader';

interface ScenarioResult {
  parameter: string;
  originalValue: number;
  newValue: number;
  impact: number;
  confidence: number;
}

/**
 * Scenario Builder page component
 */
export const ScenarioBuilder: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ScenarioResult[] | null>(null);

  const handleScenarioSubmit = async (data: any) => {
    setIsLoading(true);

    // Log the submitted data for debugging
    console.log('Scenario data submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results (in a real implementation, these would be based on the submitted data)
    const mockResults: ScenarioResult[] = [
      {
        parameter: 'Price',
        originalValue: 100,
        newValue: 120,
        impact: 15.2,
        confidence: 0.85,
      },
      {
        parameter: 'Marketing Budget',
        originalValue: 5000,
        newValue: 7500,
        impact: 8.7,
        confidence: 0.92,
      },
      {
        parameter: 'Inventory',
        originalValue: 1000,
        newValue: 1200,
        impact: 3.1,
        confidence: 0.78,
      },
    ];

    setResults(mockResults);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Scenario Builder</h2>
        <p className="text-gray-600 mt-1">
          Create and analyze different business scenarios to understand
          potential outcomes
        </p>
      </div>

      {/* Scenario Form */}
      <div className="card">
        <ScenarioForm onSubmit={handleScenarioSubmit} isLoading={isLoading} />
      </div>

      {/* Results Section */}
      {isLoading && (
        <div className="card">
          <div className="flex items-center justify-center h-32">
            <Loader size="lg" text="Analyzing scenario..." />
          </div>
        </div>
      )}

      {results && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Scenario Results
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.parameter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.originalValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.newValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          result.impact > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.impact > 0 ? '+' : ''}
                        {result.impact.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(result.confidence * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
