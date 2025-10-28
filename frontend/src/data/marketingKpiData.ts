export interface MarketingKpi {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  sparkline: number[];
  category: 'revenue' | 'acquisition' | 'engagement' | 'conversion' | 'retention';
  description: string;
  trend: {
    direction: 'up' | 'down' | 'stable';
    velocity: 'fast' | 'moderate' | 'slow';
    forecast: number[];
  };
  benchmark: {
    industry: number;
    target: number;
    performance: 'above' | 'at' | 'below';
  };
  segments: {
    channel: { [key: string]: number };
    product: { [key: string]: number };
    region: { [key: string]: number };
  };
  relatedKpis: string[];
  insights: string[];
  recommendations: string[];
}

export const marketingKpiData: MarketingKpi[] = [
  {
    id: 'total-revenue',
    title: 'Total Revenue',
    value: '$4,200,000',
    change: '+12.5%',
    changeType: 'positive',
    sparkline: [10, 20, 15, 25, 30, 22, 35],
    category: 'revenue',
    description: 'Total revenue generated across all channels and products',
    trend: {
      direction: 'up',
      velocity: 'moderate',
      forecast: [35, 38, 42, 45, 48, 50, 52]
    },
    benchmark: {
      industry: 8.2,
      target: 15.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 35, 'Paid': 28, 'Email': 20, 'Social': 17 },
      product: { 'Shoes': 45, 'Apparel': 30, 'Accessories': 25 },
      region: { 'North America': 50, 'Europe': 30, 'Asia': 20 }
    },
    relatedKpis: ['roas', 'aov', 'conversion-rate'],
    insights: ['Revenue growth driven by Q4 holiday campaigns', 'Mobile revenue up 23%'],
    recommendations: ['Focus on high-value customer segments', 'Optimize mobile checkout flow']
  },
  {
    id: 'roas',
    title: 'Return on Ad Spend (ROAS)',
    value: '4.2x',
    change: '-2.1%',
    changeType: 'negative',
    sparkline: [35, 28, 30, 25, 22, 20, 18],
    category: 'acquisition',
    description: 'Revenue generated per dollar spent on advertising',
    trend: {
      direction: 'down',
      velocity: 'slow',
      forecast: [18, 19, 20, 21, 22, 23, 24]
    },
    benchmark: {
      industry: 3.5,
      target: 5.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Google Ads': 4.8, 'Facebook': 3.9, 'Instagram': 3.2, 'TikTok': 2.8 },
      product: { 'Shoes': 5.1, 'Apparel': 3.8, 'Accessories': 3.5 },
      region: { 'North America': 4.5, 'Europe': 3.9, 'Asia': 3.1 }
    },
    relatedKpis: ['total-revenue', 'cac', 'conversion-rate'],
    insights: ['ROAS declining due to increased competition', 'Google Ads performing best'],
    recommendations: ['Optimize underperforming ad creatives', 'Increase budget for high-ROAS channels']
  },
  {
    id: 'cac',
    title: 'Customer Acquisition Cost (CAC)',
    value: '$120.50',
    change: '+5.8%',
    changeType: 'negative',
    sparkline: [100, 110, 105, 115, 120, 118, 125],
    category: 'acquisition',
    description: 'Average cost to acquire a new customer',
    trend: {
      direction: 'up',
      velocity: 'slow',
      forecast: [125, 128, 130, 132, 135, 138, 140]
    },
    benchmark: {
      industry: 150.0,
      target: 100.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 45, 'Paid': 180, 'Email': 25, 'Social': 95 },
      product: { 'Shoes': 110, 'Apparel': 130, 'Accessories': 140 },
      region: { 'North America': 125, 'Europe': 115, 'Asia': 105 }
    },
    relatedKpis: ['roas', 'clv', 'conversion-rate'],
    insights: ['CAC increasing due to higher ad costs', 'Organic channels most efficient'],
    recommendations: ['Invest in organic growth strategies', 'Optimize paid channel targeting']
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: '3.5%',
    change: '+0.5%',
    changeType: 'positive',
    sparkline: [2, 3, 2.5, 3.5, 4, 3.8, 4.2],
    category: 'conversion',
    description: 'Percentage of visitors who complete a purchase',
    trend: {
      direction: 'up',
      velocity: 'moderate',
      forecast: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8]
    },
    benchmark: {
      industry: 2.8,
      target: 4.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 4.2, 'Paid': 3.1, 'Email': 5.8, 'Social': 2.9 },
      product: { 'Shoes': 4.1, 'Apparel': 3.2, 'Accessories': 3.8 },
      region: { 'North America': 3.8, 'Europe': 3.2, 'Asia': 2.9 }
    },
    relatedKpis: ['total-revenue', 'aov', 'funnel-dropoff'],
    insights: ['Email campaigns driving highest conversions', 'Mobile conversion rate improving'],
    recommendations: ['Optimize checkout process', 'A/B test landing pages']
  },
  {
    id: 'email-ctr',
    title: 'Email Click-Through Rate',
    value: '4.8%',
    change: '+0.3%',
    changeType: 'positive',
    sparkline: [3.5, 4.0, 3.8, 4.2, 4.5, 4.6, 4.8],
    category: 'engagement',
    description: 'Percentage of email recipients who click on links',
    trend: {
      direction: 'up',
      velocity: 'slow',
      forecast: [4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4]
    },
    benchmark: {
      industry: 2.6,
      target: 5.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Newsletter': 3.2, 'Promotional': 6.1, 'Transactional': 8.5, 'Abandoned Cart': 12.3 },
      product: { 'Shoes': 5.2, 'Apparel': 4.5, 'Accessories': 4.1 },
      region: { 'North America': 5.1, 'Europe': 4.6, 'Asia': 4.2 }
    },
    relatedKpis: ['email-open-rate', 'conversion-rate', 'revenue-per-email'],
    insights: ['Abandoned cart emails performing exceptionally well', 'Personalization improving engagement'],
    recommendations: ['Expand abandoned cart email series', 'Test new email templates']
  },
  {
    id: 'clv',
    title: 'Customer Lifetime Value',
    value: '$1,250',
    change: '+8.2%',
    changeType: 'positive',
    sparkline: [950, 1000, 1050, 1100, 1150, 1200, 1250],
    category: 'retention',
    description: 'Average revenue generated per customer over their lifetime',
    trend: {
      direction: 'up',
      velocity: 'moderate',
      forecast: [1250, 1280, 1310, 1340, 1370, 1400, 1430]
    },
    benchmark: {
      industry: 850,
      target: 1200,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 1450, 'Paid': 1100, 'Email': 1600, 'Social': 950 },
      product: { 'Shoes': 1400, 'Apparel': 1200, 'Accessories': 1000 },
      region: { 'North America': 1350, 'Europe': 1200, 'Asia': 1000 }
    },
    relatedKpis: ['cac', 'retention-rate', 'aov'],
    insights: ['Email customers have highest CLV', 'Subscription model increasing retention'],
    recommendations: ['Focus on email list growth', 'Implement loyalty program']
  },
  {
    id: 'lead-conversion',
    title: 'Lead Conversion Rate',
    value: '18.5%',
    change: '+2.1%',
    changeType: 'positive',
    sparkline: [12, 14, 15, 16, 17, 18, 18.5],
    category: 'conversion',
    description: 'Percentage of leads that convert to customers',
    trend: {
      direction: 'up',
      velocity: 'moderate',
      forecast: [18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.5]
    },
    benchmark: {
      industry: 15.0,
      target: 20.0,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 22, 'Paid': 16, 'Email': 28, 'Social': 12 },
      product: { 'Shoes': 20, 'Apparel': 17, 'Accessories': 19 },
      region: { 'North America': 19, 'Europe': 18, 'Asia': 16 }
    },
    relatedKpis: ['conversion-rate', 'cac', 'funnel-dropoff'],
    insights: ['Email leads converting at highest rate', 'Lead quality improving'],
    recommendations: ['Optimize lead nurturing sequences', 'Improve lead scoring']
  },
  {
    id: 'funnel-dropoff',
    title: 'Funnel Drop-off Rate',
    value: '65%',
    change: '-3.2%',
    changeType: 'positive',
    sparkline: [75, 72, 70, 68, 67, 66, 65],
    category: 'conversion',
    description: 'Percentage of users who abandon the purchase funnel',
    trend: {
      direction: 'down',
      velocity: 'slow',
      forecast: [65, 64, 63, 62, 61, 60, 59]
    },
    benchmark: {
      industry: 70,
      target: 60,
      performance: 'above'
    },
    segments: {
      channel: { 'Organic': 58, 'Paid': 68, 'Email': 45, 'Social': 72 },
      product: { 'Shoes': 62, 'Apparel': 68, 'Accessories': 70 },
      region: { 'North America': 63, 'Europe': 67, 'Asia': 70 }
    },
    relatedKpis: ['conversion-rate', 'lead-conversion', 'aov'],
    insights: ['Email traffic has lowest drop-off', 'Mobile optimization reducing abandonment'],
    recommendations: ['Simplify checkout process', 'Add progress indicators']
  }
];

