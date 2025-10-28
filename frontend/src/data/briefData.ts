export interface BriefTemplate {
  id: number;
  name: string;
  description: string;
  category: 'executive' | 'marketing' | 'financial' | 'operational' | 'strategic';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  sections: BriefSection[];
  lastGenerated?: string;
  isCustom: boolean;
  tags: string[];
}

export interface BriefSection {
  id: string;
  title: string;
  type: 'text' | 'chart' | 'table' | 'kpi' | 'list';
  content: string;
  editable: boolean;
  required: boolean;
}

export const briefTemplates: BriefTemplate[] = [
  {
    id: 1,
    name: 'Executive Weekly Summary',
    description: 'Comprehensive weekly overview for executive leadership covering key metrics, performance highlights, and strategic insights.',
    category: 'executive',
    frequency: 'weekly',
    sections: [
      {
        id: 'exec-summary',
        title: 'Executive Summary',
        type: 'text',
        content: 'This week showed strong performance across all key metrics...',
        editable: true,
        required: true
      },
      {
        id: 'key-metrics',
        title: 'Key Performance Indicators',
        type: 'kpi',
        content: 'Revenue, ROAS, CAC, Conversion Rate',
        editable: true,
        required: true
      },
      {
        id: 'highlights',
        title: 'Key Highlights',
        type: 'list',
        content: '• Revenue increased 12% week-over-week\n• New customer acquisition up 8%\n• Campaign performance exceeded targets',
        editable: true,
        required: true
      },
      {
        id: 'challenges',
        title: 'Challenges & Risks',
        type: 'text',
        content: 'Identified potential supply chain delays...',
        editable: true,
        required: false
      },
      {
        id: 'next-steps',
        title: 'Next Steps & Recommendations',
        type: 'list',
        content: '• Optimize underperforming campaigns\n• Review inventory levels\n• Plan Q4 strategy',
        editable: true,
        required: true
      }
    ],
    lastGenerated: '2024-01-10',
    isCustom: false,
    tags: ['executive', 'weekly', 'summary']
  },
  {
    id: 2,
    name: 'Marketing Performance Report',
    description: 'Detailed marketing performance analysis including campaign metrics, channel performance, and ROI analysis.',
    category: 'marketing',
    frequency: 'weekly',
    sections: [
      {
        id: 'campaign-overview',
        title: 'Campaign Overview',
        type: 'text',
        content: 'This week\'s marketing performance across all channels...',
        editable: true,
        required: true
      },
      {
        id: 'channel-performance',
        title: 'Channel Performance',
        type: 'table',
        content: 'Google Ads, Facebook, Email, Organic',
        editable: true,
        required: true
      },
      {
        id: 'roi-analysis',
        title: 'ROI Analysis',
        type: 'chart',
        content: 'Return on investment by channel and campaign',
        editable: true,
        required: true
      },
      {
        id: 'top-performers',
        title: 'Top Performing Campaigns',
        type: 'list',
        content: '• Summer Sale Campaign: 4.2x ROAS\n• Retargeting Campaign: 3.8x ROAS',
        editable: true,
        required: true
      },
      {
        id: 'optimization-opportunities',
        title: 'Optimization Opportunities',
        type: 'text',
        content: 'Identified areas for improvement...',
        editable: true,
        required: false
      }
    ],
    lastGenerated: '2024-01-09',
    isCustom: false,
    tags: ['marketing', 'performance', 'campaigns']
  },
  {
    id: 3,
    name: 'Financial Dashboard',
    description: 'Comprehensive financial overview including revenue, costs, profitability, and budget tracking.',
    category: 'financial',
    frequency: 'monthly',
    sections: [
      {
        id: 'revenue-summary',
        title: 'Revenue Summary',
        type: 'kpi',
        content: 'Total Revenue, Monthly Growth, Year-over-Year',
        editable: true,
        required: true
      },
      {
        id: 'cost-analysis',
        title: 'Cost Analysis',
        type: 'chart',
        content: 'Breakdown of costs by category',
        editable: true,
        required: true
      },
      {
        id: 'profitability',
        title: 'Profitability Metrics',
        type: 'table',
        content: 'Gross Margin, Net Margin, EBITDA',
        editable: true,
        required: true
      },
      {
        id: 'budget-variance',
        title: 'Budget vs Actual',
        type: 'chart',
        content: 'Variance analysis by department',
        editable: true,
        required: true
      },
      {
        id: 'forecast',
        title: 'Financial Forecast',
        type: 'text',
        content: 'Projected performance for next quarter...',
        editable: true,
        required: false
      }
    ],
    lastGenerated: '2024-01-01',
    isCustom: false,
    tags: ['financial', 'revenue', 'costs', 'profitability']
  },
  {
    id: 4,
    name: 'Operational Health Check',
    description: 'Operational metrics and health indicators including system performance, customer service, and process efficiency.',
    category: 'operational',
    frequency: 'daily',
    sections: [
      {
        id: 'system-health',
        title: 'System Health',
        type: 'kpi',
        content: 'Uptime, Response Time, Error Rate',
        editable: true,
        required: true
      },
      {
        id: 'customer-service',
        title: 'Customer Service Metrics',
        type: 'table',
        content: 'Ticket Volume, Response Time, Satisfaction',
        editable: true,
        required: true
      },
      {
        id: 'inventory-status',
        title: 'Inventory Status',
        type: 'text',
        content: 'Current inventory levels and stockout risks...',
        editable: true,
        required: true
      },
      {
        id: 'alerts-summary',
        title: 'Active Alerts',
        type: 'list',
        content: '• High priority alerts: 2\n• Medium priority: 5\n• Low priority: 8',
        editable: true,
        required: true
      }
    ],
    lastGenerated: '2024-01-11',
    isCustom: false,
    tags: ['operational', 'health', 'monitoring']
  },
  {
    id: 5,
    name: 'Strategic Planning Update',
    description: 'Strategic initiatives progress, market analysis, and competitive intelligence for quarterly planning.',
    category: 'strategic',
    frequency: 'quarterly',
    sections: [
      {
        id: 'strategic-initiatives',
        title: 'Strategic Initiatives Progress',
        type: 'text',
        content: 'Update on key strategic initiatives...',
        editable: true,
        required: true
      },
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        type: 'text',
        content: 'Current market conditions and trends...',
        editable: true,
        required: true
      },
      {
        id: 'competitive-intelligence',
        title: 'Competitive Intelligence',
        type: 'list',
        content: '• Competitor A launched new product\n• Competitor B increased ad spend\n• Market share analysis',
        editable: true,
        required: true
      },
      {
        id: 'growth-opportunities',
        title: 'Growth Opportunities',
        type: 'text',
        content: 'Identified opportunities for expansion...',
        editable: true,
        required: false
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment',
        type: 'text',
        content: 'Key risks and mitigation strategies...',
        editable: true,
        required: true
      }
    ],
    lastGenerated: '2024-01-01',
    isCustom: false,
    tags: ['strategic', 'planning', 'market', 'competitive']
  },
  {
    id: 6,
    name: 'Custom Report Template',
    description: 'Fully customizable report template for specific business needs and requirements.',
    category: 'executive',
    frequency: 'monthly',
    sections: [
      {
        id: 'custom-section-1',
        title: 'Custom Section 1',
        type: 'text',
        content: 'Add your custom content here...',
        editable: true,
        required: false
      },
      {
        id: 'custom-section-2',
        title: 'Custom Section 2',
        type: 'text',
        content: 'Add your custom content here...',
        editable: true,
        required: false
      }
    ],
    lastGenerated: null,
    isCustom: true,
    tags: ['custom', 'template', 'flexible']
  }
];

export const getBriefTemplate = (id: number): BriefTemplate | undefined => {
  return briefTemplates.find(template => template.id === id);
};

export const getBriefTemplatesByCategory = (category: string): BriefTemplate[] => {
  return briefTemplates.filter(template => template.category === category);
};
