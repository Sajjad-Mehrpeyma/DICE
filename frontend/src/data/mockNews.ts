export interface NewsItem {
  id: string;
  title: string;
  source: string;
  journal: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  description: string;
  url: string;
  priority: 'high' | 'medium' | 'low';
  businessImpact: string;
}

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Tech Stocks Rally as AI Investments Surge',
    source: 'Bloomberg',
    journal: 'Financial Times',
    date: '2024-01-15',
    sentiment: 'positive',
    description: 'Major technology companies saw significant gains in today\'s trading session as investors continue to show strong confidence in artificial intelligence and machine learning technologies. The rally was led by companies with substantial AI portfolios, including several that have recently announced new partnerships and product launches in the space.',
    url: 'https://bloomberg.com/news/tech-stocks-rally-ai',
    priority: 'high',
    businessImpact: 'This positive market sentiment towards AI investments could benefit our technology portfolio and create opportunities for strategic partnerships in the AI space. Consider reviewing our AI-related holdings and potential investment opportunities.'
  },
  {
    id: '2',
    title: 'Federal Reserve Maintains Current Interest Rates',
    source: 'Reuters',
    journal: 'Wall Street Journal',
    date: '2024-01-14',
    sentiment: 'neutral',
    description: 'The Federal Reserve announced today that it will maintain the current federal funds rate at 5.25-5.50%, citing ongoing concerns about inflation while acknowledging recent economic stability. The decision comes after months of speculation about potential rate cuts.',
    url: 'https://reuters.com/business/fed-rates-decision',
    priority: 'high',
    businessImpact: 'The Fed\'s decision to maintain current rates suggests continued economic uncertainty. This may impact our borrowing costs and investment strategies. Review our debt portfolio and consider the implications for future financing decisions.'
  },
  {
    id: '3',
    title: 'Climate Change Report Shows Accelerating Global Warming',
    source: 'The Guardian',
    journal: 'Nature Climate Change',
    date: '2024-01-13',
    sentiment: 'negative',
    description: 'A comprehensive new study published in Nature Climate Change reveals that global warming is accelerating faster than previously predicted, with 2023 marking the hottest year on record. The report warns of severe consequences for ecosystems and human societies if immediate action is not taken.',
    url: 'https://theguardian.com/environment/climate-accelerating',
    priority: 'medium',
    businessImpact: 'Increased climate regulations and ESG requirements may impact our operations and investment criteria. Consider reviewing our sustainability initiatives and potential exposure to climate-related risks in our portfolio.'
  },
  {
    id: '4',
    title: 'Renewable Energy Breakthrough in Solar Panel Efficiency',
    source: 'TechCrunch',
    journal: 'MIT Technology Review',
    date: '2024-01-12',
    sentiment: 'positive',
    description: 'Scientists at MIT have developed a new type of solar panel that achieves 47% efficiency, nearly doubling the current industry standard. The breakthrough could significantly reduce the cost of solar energy and accelerate the transition to renewable power sources worldwide.',
    url: 'https://techcrunch.com/2024/01/12/solar-efficiency-breakthrough',
    priority: 'medium',
    businessImpact: 'This breakthrough could reduce our operational energy costs if we invest in solar infrastructure. Consider evaluating renewable energy investments and potential cost savings for our facilities.'
  },
  {
    id: '5',
    title: 'Global Supply Chain Disruptions Continue in Q1',
    source: 'Wall Street Journal',
    journal: 'Supply Chain Management Review',
    date: '2024-01-11',
    sentiment: 'negative',
    description: 'Ongoing supply chain disruptions are expected to continue through the first quarter of 2024, affecting multiple industries including automotive, electronics, and pharmaceuticals. Companies are reporting increased costs and delayed deliveries as they navigate these challenges.',
    url: 'https://wsj.com/articles/supply-chain-disruptions-q1',
    priority: 'low',
    businessImpact: 'Supply chain disruptions may affect our vendor relationships and operational costs. Monitor our key suppliers and consider diversifying our supply chain to mitigate potential risks.'
  }
];
