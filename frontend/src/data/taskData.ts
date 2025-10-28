export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedDuration: number; // in seconds for demo
  category: 'analysis' | 'data' | 'communication' | 'strategy' | 'execution';
  priority: 'high' | 'medium' | 'low';
}

export interface TaskScenario {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export const taskScenarios: TaskScenario[] = [
  {
    id: 'revenue-analysis',
    name: 'Revenue Analysis Deep Dive',
    description: 'Comprehensive analysis of revenue trends and optimization opportunities',
    tasks: [
      {
        id: 'task-1',
        title: 'Gather revenue data from last 12 months',
        description: 'Collect and validate revenue data from all sources including CRM, payment systems, and analytics platforms',
        completed: false,
        estimatedDuration: 3,
        category: 'data',
        priority: 'high'
      },
      {
        id: 'task-2',
        title: 'Analyze revenue by product line',
        description: 'Break down revenue by individual products and services to identify top performers',
        completed: false,
        estimatedDuration: 4,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-3',
        title: 'Identify seasonal patterns',
        description: 'Examine revenue trends across different time periods to spot seasonal variations',
        completed: false,
        estimatedDuration: 3,
        category: 'analysis',
        priority: 'medium'
      },
      {
        id: 'task-4',
        title: 'Calculate customer lifetime value',
        description: 'Determine CLV for different customer segments to inform retention strategies',
        completed: false,
        estimatedDuration: 5,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-5',
        title: 'Review pricing strategy effectiveness',
        description: 'Analyze how pricing changes have impacted revenue and customer acquisition',
        completed: false,
        estimatedDuration: 4,
        category: 'strategy',
        priority: 'medium'
      },
      {
        id: 'task-6',
        title: 'Identify revenue optimization opportunities',
        description: 'Find specific areas where revenue can be increased through targeted actions',
        completed: false,
        estimatedDuration: 6,
        category: 'strategy',
        priority: 'high'
      },
      {
        id: 'task-7',
        title: 'Create executive summary',
        description: 'Compile key findings into a concise summary for leadership review',
        completed: false,
        estimatedDuration: 3,
        category: 'communication',
        priority: 'high'
      },
    ]
  },
  {
    id: 'market-expansion',
    name: 'Market Expansion Strategy',
    description: 'Develop comprehensive strategy for entering new markets',
    tasks: [
      {
        id: 'task-11',
        title: 'Research target markets',
        description: 'Conduct market research on potential new geographic regions or customer segments',
        completed: false,
        estimatedDuration: 4,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-12',
        title: 'Analyze competitive landscape',
        description: 'Identify key competitors in target markets and assess their positioning',
        completed: false,
        estimatedDuration: 3,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-13',
        title: 'Assess market entry barriers',
        description: 'Evaluate regulatory, cultural, and operational challenges for each market',
        completed: false,
        estimatedDuration: 4,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-14',
        title: 'Develop market entry strategy',
        description: 'Create detailed plan for how to enter each target market successfully',
        completed: false,
        estimatedDuration: 6,
        category: 'strategy',
        priority: 'high'
      },
      {
        id: 'task-15',
        title: 'Calculate investment requirements',
        description: 'Estimate financial resources needed for market expansion initiatives',
        completed: false,
        estimatedDuration: 3,
        category: 'analysis',
        priority: 'medium'
      },
      {
        id: 'task-16',
        title: 'Identify local partners',
        description: 'Research and evaluate potential local partners for market entry',
        completed: false,
        estimatedDuration: 4,
        category: 'strategy',
        priority: 'medium'
      },
      {
        id: 'task-17',
        title: 'Create go-to-market plan',
        description: 'Develop detailed marketing and sales strategy for new markets',
        completed: false,
        estimatedDuration: 5,
        category: 'strategy',
        priority: 'high'
      },
      {
        id: 'task-18',
        title: 'Prepare risk assessment',
        description: 'Identify and evaluate potential risks associated with market expansion',
        completed: false,
        estimatedDuration: 3,
        category: 'analysis',
        priority: 'medium'
      },
      {
        id: 'task-19',
        title: 'Present strategy to board',
        description: 'Prepare and deliver presentation to board of directors for approval',
        completed: false,
        estimatedDuration: 2,
        category: 'communication',
        priority: 'high'
      },
      {
        id: 'task-20',
        title: 'Begin pilot program',
        description: 'Launch small-scale pilot in selected market to test strategy',
        completed: false,
        estimatedDuration: 8,
        category: 'execution',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'customer-retention',
    name: 'Customer Retention Optimization',
    description: 'Improve customer retention rates through targeted initiatives',
    tasks: [
      {
        id: 'task-21',
        title: 'Analyze churn patterns',
        description: 'Identify when and why customers are leaving the business',
        completed: false,
        estimatedDuration: 4,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-22',
        title: 'Segment customers by risk',
        description: 'Categorize customers based on their likelihood to churn',
        completed: false,
        estimatedDuration: 3,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-23',
        title: 'Identify retention drivers',
        description: 'Determine key factors that influence customer loyalty and retention',
        completed: false,
        estimatedDuration: 4,
        category: 'analysis',
        priority: 'high'
      },
      {
        id: 'task-24',
        title: 'Design retention campaigns',
        description: 'Create targeted marketing campaigns for at-risk customer segments',
        completed: false,
        estimatedDuration: 5,
        category: 'strategy',
        priority: 'high'
      },
      {
        id: 'task-25',
        title: 'Improve customer support',
        description: 'Enhance customer service processes and response times',
        completed: false,
        estimatedDuration: 6,
        category: 'execution',
        priority: 'medium'
      },
      {
        id: 'task-26',
        title: 'Implement loyalty program',
        description: 'Develop and launch customer loyalty rewards program',
        completed: false,
        estimatedDuration: 7,
        category: 'execution',
        priority: 'medium'
      },
      {
        id: 'task-27',
        title: 'Create win-back campaigns',
        description: 'Design campaigns to re-engage customers who have churned',
        completed: false,
        estimatedDuration: 4,
        category: 'strategy',
        priority: 'low'
      },
      {
        id: 'task-28',
        title: 'Set up retention metrics',
        description: 'Establish KPIs and monitoring systems for retention efforts',
        completed: false,
        estimatedDuration: 3,
        category: 'execution',
        priority: 'high'
      },
      {
        id: 'task-29',
        title: 'Train customer success team',
        description: 'Provide training on retention strategies and customer engagement',
        completed: false,
        estimatedDuration: 2,
        category: 'execution',
        priority: 'medium'
      },
      {
        id: 'task-30',
        title: 'Monitor and optimize',
        description: 'Continuously track retention metrics and optimize strategies',
        completed: false,
        estimatedDuration: 4,
        category: 'execution',
        priority: 'low'
      }
    ]
  }
];

export const getTasksForScenario = (scenarioId: string): Task[] => {
  const scenario = taskScenarios.find(s => s.id === scenarioId);
  return scenario ? scenario.tasks : [];
};

export const getTaskScenario = (scenarioId: string): TaskScenario | undefined => {
  return taskScenarios.find(s => s.id === scenarioId);
};
