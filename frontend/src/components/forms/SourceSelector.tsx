import React, { useState } from 'react';
import { ChevronDown, Database, FileText, Link } from 'lucide-react';
import clsx from 'clsx';

interface DataSourceOption {
  id: string;
  name: string;
  type: 'csv' | 'google_analytics' | 'api';
  description: string;
  icon: React.ReactNode;
}

interface SourceSelectorProps {
  onSourceSelect: (sourceType: string) => void;
  className?: string;
}

/**
 * Component for selecting data source type
 */
export const SourceSelector: React.FC<SourceSelectorProps> = ({
  onSourceSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSourceOption | null>(
    null,
  );

  const dataSources: DataSourceOption[] = [
    {
      id: 'csv',
      name: 'CSV File',
      type: 'csv',
      description: 'Upload a CSV file with your data',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      type: 'google_analytics',
      description: 'Connect to your Google Analytics account',
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: 'api',
      name: 'API Endpoint',
      type: 'api',
      description: 'Connect to a REST API endpoint',
      icon: <Link className="h-5 w-5" />,
    },
  ];

  const handleSourceSelect = (source: DataSourceOption) => {
    setSelectedSource(source);
    setIsOpen(false);
    onSourceSelect(source.type);
  };

  return (
    <div className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {selectedSource ? (
              <>
                <div className="text-primary-600 mr-3">
                  {selectedSource.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedSource.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedSource.description}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm text-gray-500">Select a data source</p>
              </div>
            )}
          </div>
          <ChevronDown
            className={clsx(
              'h-5 w-5 text-gray-400 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1">
            {dataSources.map(source => (
              <button
                key={source.id}
                type="button"
                onClick={() => handleSourceSelect(source)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="text-primary-600 mr-3">{source.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {source.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {source.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
