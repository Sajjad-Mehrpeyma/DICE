export interface NotificationItem {
  id: string;
  text: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    text: 'New data source connected successfully',
    severity: 'low',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    text: 'System maintenance scheduled for tonight',
    severity: 'medium',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    text: 'High CPU usage detected on server-03',
    severity: 'high',
    timestamp: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    text: 'Database backup completed successfully',
    severity: 'low',
    timestamp: '2024-01-15T07:20:00Z'
  },
  {
    id: '5',
    text: 'Security alert: Unusual login attempt detected',
    severity: 'critical',
    timestamp: '2024-01-15T06:10:00Z'
  }
];
