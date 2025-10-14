import React, { useState } from 'react';
import {
  Plus,
  Database,
  FileText,
  Link,
  MoreVertical,
  Trash2,
  Edit,
} from 'lucide-react';
import { SourceSelector } from '@/components/forms/SourceSelector';
import { FileUpload } from '@/components/forms/FileUpload';

interface DataSource {
  id: string;
  name: string;
  type: 'csv' | 'google_analytics' | 'api';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  recordCount?: number;
}

/**
 * Data Sources page component
 */
export const DataSources: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Mock data sources
  const [dataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Sales Data Q3 2024',
      type: 'csv',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      recordCount: 15420,
    },
    {
      id: '2',
      name: 'Google Analytics - Main Site',
      type: 'google_analytics',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      recordCount: 89450,
    },
    {
      id: '3',
      name: 'Customer API',
      type: 'api',
      status: 'error',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
  ]);

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'csv':
        return <FileText className="h-5 w-5" />;
      case 'google_analytics':
        return <Database className="h-5 w-5" />;
      case 'api':
        return <Link className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddSource = () => {
    setShowAddModal(true);
  };

  const handleSourceSelect = (sourceType: string) => {
    setSelectedSourceType(sourceType);
  };

  const handleFileUpload = async (_file: File) => {
    setIsLoading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowAddModal(false);
    setSelectedSourceType(null);
  };

  const handleGoogleAnalyticsConnect = async () => {
    setIsLoading(true);
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowAddModal(false);
    setSelectedSourceType(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
          <p className="text-gray-600 mt-1">
            Manage your connected data sources and integrations
          </p>
        </div>
        <button
          onClick={handleAddSource}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </button>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map(source => (
          <div key={source.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="text-primary-600 mr-3">
                  {getSourceIcon(source.type)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {source.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(source.status)}`}
                >
                  {source.status}
                </span>
              </div>

              {source.lastSync && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm text-gray-900">
                    {source.lastSync.toLocaleString()}
                  </span>
                </div>
              )}

              {source.recordCount && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Records</span>
                  <span className="text-sm text-gray-900">
                    {source.recordCount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button className=" btn-ghost text-sm flex-1 text-red-600 hover:text-red-700 inline-flex content-around justify-center items-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="btn-ghost text-sm flex-1 text-red-600 hover:text-red-700 flex content-around justify-center items-center">
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Add Data Source
                </h3>

                {!selectedSourceType ? (
                  <SourceSelector onSourceSelect={handleSourceSelect} />
                ) : selectedSourceType === 'csv' ? (
                  <FileUpload
                    onFileSelect={handleFileUpload}
                    acceptedTypes=".csv,.xlsx"
                    maxSize={10}
                  />
                ) : selectedSourceType === 'google_analytics' ? (
                  <div className="text-center">
                    <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Connect Google Analytics
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Click below to connect your Google Analytics account
                    </p>
                    <button
                      onClick={handleGoogleAnalyticsConnect}
                      disabled={isLoading}
                      className="btn-primary"
                    >
                      {isLoading ? 'Connecting...' : 'Connect Google Analytics'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      API Endpoint
                    </h4>
                    <p className="text-gray-600 mb-4">
                      API endpoint configuration coming soon
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedSourceType(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
