export const chatData = [
  {
    sender: 'user',
    message: 'Why did our ROAS drop last week?',
    timestamp: '10:30 AM',
  },
  {
    sender: 'bot',
    message: 'It looks like the ROAS for the "Summer Sale" campaign decreased by 30%. This was primarily driven by a 20% increase in ad spend and a 10% decrease in conversions.',
    timestamp: '10:31 AM',
    confidence: 0.95,
    modelVersion: 'v1.4',
    dataSources: ['Google Ads', 'Shopify (last 90d)'],
  },
  {
    sender: 'user',
    message: 'What can we do to fix it?',
    timestamp: '10:32 AM',
  },
  {
    sender: 'bot',
    message: 'I recommend pausing the underperforming ad sets and reallocating the budget to the top-performing ones. I can create a plan for you to review.',
    timestamp: '10:33 AM',
  },
];
