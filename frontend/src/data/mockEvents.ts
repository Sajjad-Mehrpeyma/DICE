export interface EventItem {
  id: string;
  text: string;
  impact: 'low' | 'medium' | 'high';
  timestamp: string;
}

export const mockEvents: EventItem[] = [
  {
    id: '1',
    text: 'Earnings call: Apple Q1 2024 results',
    impact: 'high',
    timestamp: '2024-01-15T14:00:00Z'
  },
  {
    id: '2',
    text: 'Product launch: Tesla Model Y refresh',
    impact: 'medium',
    timestamp: '2024-01-15T12:30:00Z'
  },
  {
    id: '3',
    text: 'Conference: AI & Machine Learning Summit',
    impact: 'low',
    timestamp: '2024-01-15T11:00:00Z'
  },
  {
    id: '4',
    text: 'IPO: Tech startup goes public today',
    impact: 'medium',
    timestamp: '2024-01-15T09:30:00Z'
  },
  {
    id: '5',
    text: 'Merger announcement: Two major banks',
    impact: 'high',
    timestamp: '2024-01-15T08:00:00Z'
  }
];
