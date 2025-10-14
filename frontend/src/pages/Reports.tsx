import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'dashboard' | 'scenario' | 'custom';
  status: 'generating' | 'completed' | 'failed';
  createdAt: Date;
  downloadUrl?: string;
}

/**
 * Reports page component
 */
export const Reports: React.FC = () => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Monthly Dashboard Report',
      type: 'dashboard',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      downloadUrl: '/reports/monthly-dashboard.pdf',
    },
    {
      id: '2',
      name: 'Q3 Scenario Analysis',
      type: 'scenario',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      downloadUrl: '/reports/q3-scenario.pdf',
    },
    {
      id: '3',
      name: 'Custom Traffic Report',
      type: 'custom',
      status: 'generating',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '4',
      name: 'Revenue Forecast',
      type: 'custom',
      status: 'failed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  ]);

  const [filter, setFilter] = useState<
    'all' | 'dashboard' | 'scenario' | 'custom'
  >('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'completed' | 'generating' | 'failed'
  >('all');

  const filteredReports = reports.filter(report => {
    const typeMatch = filter === 'all' || report.type === filter;
    const statusMatch =
      statusFilter === 'all' || report.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dashboard':
        return '📊';
      case 'scenario':
        return '📈';
      case 'custom':
        return '📋';
      default:
        return '📄';
    }
  };

  const handleDownload = (report: Report) => {
    if (report.downloadUrl) {
      // In a real app, this would trigger the download
      console.log('Downloading report:', report.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <p className="text-gray-600 mt-1">
          View and download your generated reports
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All Types</option>
              <option value="dashboard">Dashboard</option>
              <option value="scenario">Scenario</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="generating">Generating</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">
                        {getTypeIcon(report.type)}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {report.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {report.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {report.createdAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {report.status === 'completed' && report.downloadUrl ? (
                      <button
                        onClick={() => handleDownload(report)}
                        className="text-primary-600 hover:text-primary-900 flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    ) : report.status === 'generating' ? (
                      <span className="text-gray-400">Generating...</span>
                    ) : report.status === 'failed' ? (
                      <button className="text-red-600 hover:text-red-900">
                        Retry
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-500">
              {filter === 'all' && statusFilter === 'all'
                ? 'No reports have been generated yet.'
                : 'No reports match your current filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
