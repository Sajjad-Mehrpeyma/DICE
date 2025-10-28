export interface Connector {
  id: string;
  name: string;
  status: 'Connected' | 'Disconnected' | 'Error' | 'Pending';
  logo: string;
  health: 'Good' | 'Warning' | 'Error' | 'Unknown';
  lastSync: string;
  category: 'advertising' | 'analytics' | 'crm' | 'ecommerce' | 'communication' | 'productivity' | 'webhook';
  description: string;
  dataTypes: string[];
  apiVersion: string;
  connectionDate?: string;
  errorMessage?: string;
  isEnabled: boolean;
}

export const connectorData: Connector[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    status: 'Connected',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg',
    health: 'Good',
    lastSync: '2 hours ago',
    category: 'advertising',
    description: 'Google Ads campaign data and performance metrics',
    dataTypes: ['Campaigns', 'Keywords', 'Ad Groups', 'Performance Metrics'],
    apiVersion: 'v14',
    connectionDate: '2024-01-01',
    isEnabled: true
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    status: 'Connected',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
    health: 'Good',
    lastSync: '1 hour ago',
    category: 'advertising',
    description: 'Facebook and Instagram advertising data',
    dataTypes: ['Campaigns', 'Ad Sets', 'Ads', 'Audiences', 'Insights'],
    apiVersion: 'v18.0',
    connectionDate: '2024-01-02',
    isEnabled: true
  },
  {
    id: 'shopify',
    name: 'Shopify',
    status: 'Connected',
    logo: 'https://cdn.worldvectorlogo.com/logos/shopify-2.svg',
    health: 'Warning',
    lastSync: '1 day ago',
    category: 'ecommerce',
    description: 'E-commerce platform data and order information',
    dataTypes: ['Orders', 'Products', 'Customers', 'Inventory', 'Analytics'],
    apiVersion: '2023-10',
    connectionDate: '2023-12-15',
    isEnabled: true
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    status: 'Connected',
    logo: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg',
    health: 'Good',
    lastSync: '5 minutes ago',
    category: 'analytics',
    description: 'Website and app analytics data',
    dataTypes: ['Page Views', 'Events', 'Conversions', 'Audience', 'Acquisition'],
    apiVersion: 'GA4',
    connectionDate: '2023-11-20',
    isEnabled: true
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    status: 'Disconnected',
    logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
    health: 'Error',
    lastSync: 'N/A',
    category: 'crm',
    description: 'Customer relationship management data',
    dataTypes: ['Leads', 'Contacts', 'Opportunities', 'Accounts', 'Activities'],
    apiVersion: 'v58.0',
    connectionDate: '2023-10-01',
    errorMessage: 'Authentication failed. Please reconnect.',
    isEnabled: false
  },
  {
    id: 'slack',
    name: 'Slack',
    status: 'Connected',
    logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    health: 'Good',
    lastSync: '30 minutes ago',
    category: 'communication',
    description: 'Team communication and collaboration data',
    dataTypes: ['Messages', 'Channels', 'Users', 'Files', 'Integrations'],
    apiVersion: 'v1',
    connectionDate: '2024-01-05',
    isEnabled: true
  },
  {
    id: 'jira',
    name: 'Jira',
    status: 'Connected',
    logo: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    health: 'Good',
    lastSync: '1 hour ago',
    category: 'productivity',
    description: 'Project management and issue tracking data',
    dataTypes: ['Issues', 'Projects', 'Sprints', 'Workflows', 'Reports'],
    apiVersion: '3',
    connectionDate: '2023-12-01',
    isEnabled: true
  },
  {
    id: 'webhook-generic',
    name: 'Generic Webhook',
    status: 'Connected',
    logo: 'https://cdn.worldvectorlogo.com/logos/webhook.svg',
    health: 'Good',
    lastSync: '10 minutes ago',
    category: 'webhook',
    description: 'Custom webhook for external data sources',
    dataTypes: ['Custom Events', 'API Data', 'Third-party Data'],
    apiVersion: 'v1',
    connectionDate: '2024-01-08',
    isEnabled: true
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    status: 'Disconnected',
    logo: 'https://cdn.worldvectorlogo.com/logos/mailchimp-1.svg',
    health: 'Error',
    lastSync: '2 days ago',
    category: 'communication',
    description: 'Email marketing platform data',
    dataTypes: ['Campaigns', 'Subscribers', 'Lists', 'Automations', 'Reports'],
    apiVersion: 'v3.0',
    connectionDate: '2023-11-15',
    errorMessage: 'API key expired. Please update credentials.',
    isEnabled: false
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    status: 'Pending',
    logo: 'https://cdn.worldvectorlogo.com/logos/hubspot-2.svg',
    health: 'Unknown',
    lastSync: 'N/A',
    category: 'crm',
    description: 'Inbound marketing and sales platform',
    dataTypes: ['Contacts', 'Companies', 'Deals', 'Tickets', 'Marketing'],
    apiVersion: 'v3',
    isEnabled: false
  }
];
