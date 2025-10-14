import React from 'react';
import { BarChart3 } from 'lucide-react';
import clsx from 'clsx';

interface ChartPlaceholderProps {
  title?: string;
  description?: string;
  className?: string;
  height?: string;
}

/**
 * Placeholder component for charts that will be implemented later
 */
export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title = 'Chart Visualization',
  description = 'Interactive chart will be displayed here',
  className,
  height = 'h-64',
}) => {
  return (
    <div className={clsx('card', className)}>
      <div
        className={clsx('flex flex-col items-center justify-center', height)}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 w-full border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">Chart goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
