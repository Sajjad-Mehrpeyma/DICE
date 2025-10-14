import React, { useState } from 'react';
import {
  Plus,
  Bell,
  ToggleLeft,
  ToggleRight,
  Edit,
  Trash2,
} from 'lucide-react';

interface Alert {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  isActive: boolean;
  lastTriggered?: Date;
  subscribers: string[];
}

/**
 * Alerts page component
 */
export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      name: 'High Conversion Rate',
      condition: 'Conversion rate exceeds',
      threshold: 5.0,
      isActive: true,
      lastTriggered: new Date(Date.now() - 1000 * 60 * 30),
      subscribers: ['john@example.com', 'sarah@example.com'],
    },
    {
      id: '2',
      name: 'Low Traffic Alert',
      condition: 'Daily visits below',
      threshold: 1000,
      isActive: false,
      lastTriggered: new Date(Date.now() - 1000 * 60 * 60 * 24),
      subscribers: ['admin@example.com'],
    },
    {
      id: '3',
      name: 'Revenue Drop',
      condition: 'Daily revenue below',
      threshold: 5000,
      isActive: true,
      subscribers: ['finance@example.com'],
    },
  ]);

  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: '',
    condition: '',
    threshold: 0,
  });

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map(alert =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert,
      ),
    );
  };

  const handleCreateAlert = () => {
    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      condition: newAlert.condition,
      threshold: newAlert.threshold,
      isActive: true,
      subscribers: [],
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ name: '', condition: '', threshold: 0 });
    setShowNewAlertForm(false);
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alerts</h2>
          <p className="text-gray-600 mt-1">
            Manage your data alerts and notifications
          </p>
        </div>
        <button
          onClick={() => setShowNewAlertForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Alert
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-primary-600 mr-4">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {alert.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {alert.condition} {alert.threshold}
                  </p>
                  {alert.lastTriggered && (
                    <p className="text-xs text-gray-500">
                      Last triggered: {alert.lastTriggered.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {alert.isActive ? (
                    <ToggleRight className="h-6 w-6 text-primary-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>

                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="h-5 w-5" />
                </button>

                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    alert.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {alert.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                {alert.subscribers.length} subscriber
                {alert.subscribers.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Alert Form Modal */}
      {showNewAlertForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Create New Alert
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alert Name
                    </label>
                    <input
                      type="text"
                      value={newAlert.name}
                      onChange={e =>
                        setNewAlert({ ...newAlert, name: e.target.value })
                      }
                      className="input-field"
                      placeholder="Enter alert name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <select
                      value={newAlert.condition}
                      onChange={e =>
                        setNewAlert({ ...newAlert, condition: e.target.value })
                      }
                      className="input-field"
                    >
                      <option value="">Select condition</option>
                      <option value="Conversion rate exceeds">
                        Conversion rate exceeds
                      </option>
                      <option value="Daily visits below">
                        Daily visits below
                      </option>
                      <option value="Daily revenue below">
                        Daily revenue below
                      </option>
                      <option value="Bounce rate exceeds">
                        Bounce rate exceeds
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Threshold
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newAlert.threshold}
                      onChange={e =>
                        setNewAlert({
                          ...newAlert,
                          threshold: parseFloat(e.target.value),
                        })
                      }
                      className="input-field"
                      placeholder="Enter threshold value"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCreateAlert}
                  disabled={!newAlert.name || !newAlert.condition}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Alert
                </button>
                <button
                  onClick={() => setShowNewAlertForm(false)}
                  className="btn-secondary mr-3"
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
