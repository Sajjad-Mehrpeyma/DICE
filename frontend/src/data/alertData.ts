export interface Alert {
  id: number;
  title: string;
  description: string;
  status: 'New' | 'Investigating' | 'Resolved' | 'Dismissed';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'performance' | 'inventory' | 'budget' | 'security' | 'compliance' | 'system';
  timestamp: string;
  source: string;
  impact: 'revenue' | 'cost' | 'operations' | 'compliance' | 'reputation';
  acknowledged: boolean;
  assignedTo?: string;
  dueDate?: string;
  tags: string[];
  expanded: boolean;
}

export const alertData: Alert[] = [
  {
    id: 1,
    title: 'ROAS Drop - Summer Sale Campaign',
    description: 'Return on Ad Spend for "Summer Sale" campaign has dropped by 30% in the last 24 hours. Current ROAS is 2.1x compared to target of 3.0x.',
    status: 'New',
    severity: 'High',
    priority: 'High',
    category: 'performance',
    timestamp: '2 hours ago',
    source: 'Google Ads API',
    impact: 'revenue',
    acknowledged: false,
    assignedTo: 'Marketing Team',
    dueDate: '2024-01-15',
    tags: ['ROAS', 'campaign', 'performance'],
    expanded: false
  },
  {
    id: 2,
    title: 'Stockout Risk - Running Shoes SKU',
    description: 'Inventory levels for "Running Shoes - Size 10" are critically low. Stockout risk is 85% within the next 48 hours.',
    status: 'Investigating',
    severity: 'Critical',
    priority: 'Critical',
    category: 'inventory',
    timestamp: '4 hours ago',
    source: 'Inventory Management System',
    impact: 'revenue',
    acknowledged: true,
    assignedTo: 'Operations Team',
    dueDate: '2024-01-14',
    tags: ['inventory', 'stockout', 'SKU'],
    expanded: false
  },
  {
    id: 3,
    title: 'Budget Pacing - Autumn Collection',
    description: 'Ad spend for "Autumn Collection" campaign is pacing 10% ahead of budget. Current spend is $11,000 against $10,000 budget.',
    status: 'Resolved',
    severity: 'Low',
    priority: 'Medium',
    category: 'budget',
    timestamp: '1 day ago',
    source: 'Facebook Ads Manager',
    impact: 'cost',
    acknowledged: true,
    assignedTo: 'Marketing Team',
    dueDate: '2024-01-13',
    tags: ['budget', 'pacing', 'campaign'],
    expanded: false
  },
  {
    id: 4,
    title: 'Website Performance Degradation',
    description: 'Website load times have increased by 40% over the past 6 hours. Average load time is now 4.2 seconds vs. target of 2.5 seconds.',
    status: 'New',
    severity: 'High',
    priority: 'High',
    category: 'system',
    timestamp: '1 hour ago',
    source: 'Website Monitoring',
    impact: 'revenue',
    acknowledged: false,
    assignedTo: 'Engineering Team',
    dueDate: '2024-01-14',
    tags: ['performance', 'website', 'load time'],
    expanded: false
  },
  {
    id: 5,
    title: 'Payment Processing Error Spike',
    description: 'Payment processing error rate has increased to 3.2% (normal is <1%). 127 failed transactions in the last hour.',
    status: 'Investigating',
    severity: 'Critical',
    priority: 'Critical',
    category: 'system',
    timestamp: '30 minutes ago',
    source: 'Payment Gateway',
    impact: 'revenue',
    acknowledged: true,
    assignedTo: 'Engineering Team',
    dueDate: '2024-01-14',
    tags: ['payments', 'errors', 'transactions'],
    expanded: false
  },
  {
    id: 6,
    title: 'Customer Support Ticket Backlog',
    description: 'Customer support ticket queue has grown to 247 open tickets, 40% above normal levels. Average response time is 6.5 hours.',
    status: 'New',
    severity: 'Medium',
    priority: 'Medium',
    category: 'operations',
    timestamp: '3 hours ago',
    source: 'Support System',
    impact: 'reputation',
    acknowledged: false,
    assignedTo: 'Customer Success Team',
    dueDate: '2024-01-16',
    tags: ['support', 'tickets', 'response time'],
    expanded: false
  },
  {
    id: 7,
    title: 'Data Breach Attempt Detected',
    description: 'Multiple failed login attempts detected from suspicious IP addresses. Security team has been notified and monitoring continues.',
    status: 'Investigating',
    severity: 'High',
    priority: 'High',
    category: 'security',
    timestamp: '2 hours ago',
    source: 'Security Monitoring',
    impact: 'compliance',
    acknowledged: true,
    assignedTo: 'Security Team',
    dueDate: '2024-01-14',
    tags: ['security', 'breach', 'login attempts'],
    expanded: false
  },
  {
    id: 8,
    title: 'Compliance Audit Due',
    description: 'Quarterly compliance audit is due in 5 days. Required documentation is 80% complete.',
    status: 'New',
    severity: 'Medium',
    priority: 'High',
    category: 'compliance',
    timestamp: '1 day ago',
    source: 'Compliance System',
    impact: 'compliance',
    acknowledged: false,
    assignedTo: 'Legal Team',
    dueDate: '2024-01-18',
    tags: ['compliance', 'audit', 'documentation'],
    expanded: false
  },
  {
    id: 9,
    title: 'Email Deliverability Issues',
    description: 'Email open rates have dropped by 25% over the past week. Possible deliverability issues with major email providers.',
    status: 'New',
    severity: 'Medium',
    priority: 'Medium',
    category: 'performance',
    timestamp: '4 hours ago',
    source: 'Email Marketing Platform',
    impact: 'revenue',
    acknowledged: false,
    assignedTo: 'Marketing Team',
    dueDate: '2024-01-17',
    tags: ['email', 'deliverability', 'open rates'],
    expanded: false
  },
  {
    id: 10,
    title: 'API Rate Limit Approaching',
    description: 'Third-party API usage is at 85% of monthly limit. Rate limiting may occur within 3 days if usage continues at current pace.',
    status: 'New',
    severity: 'Low',
    priority: 'Low',
    category: 'system',
    timestamp: '6 hours ago',
    source: 'API Monitoring',
    impact: 'operations',
    acknowledged: false,
    assignedTo: 'Engineering Team',
    dueDate: '2024-01-20',
    tags: ['API', 'rate limit', 'usage'],
    expanded: false
  },
  {
    id: 11,
    title: 'Social Media Engagement Drop',
    description: 'Social media engagement rates have decreased by 18% across all platforms in the last 3 days.',
    status: 'New',
    severity: 'Low',
    priority: 'Low',
    category: 'performance',
    timestamp: '1 day ago',
    source: 'Social Media Analytics',
    impact: 'reputation',
    acknowledged: false,
    assignedTo: 'Social Media Team',
    dueDate: '2024-01-19',
    tags: ['social media', 'engagement', 'analytics'],
    expanded: false
  },
  {
    id: 12,
    title: 'Return Rate Increase',
    description: 'Product return rate has increased to 8.5% (normal is 5.2%) for the past week. Quality issues may be the cause.',
    status: 'Investigating',
    severity: 'Medium',
    priority: 'Medium',
    category: 'operations',
    timestamp: '2 days ago',
    source: 'Order Management System',
    impact: 'cost',
    acknowledged: true,
    assignedTo: 'Quality Team',
    dueDate: '2024-01-16',
    tags: ['returns', 'quality', 'orders'],
    expanded: false
  }
];
