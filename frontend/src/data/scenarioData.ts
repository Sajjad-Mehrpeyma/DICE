export const scenarioData = {
  levers: [
    { name: 'Ad Spend', value: 100000, min: 50000, max: 200000, step: 10000 },
    { name: 'Price per Unit', value: 50, min: 40, max: 60, step: 1 },
    { name: 'Discount Percentage', value: 10, min: 0, max: 25, step: 1 },
  ],
  constraints: [
    { name: 'Maintain Margin >= 25%', enabled: true },
    { name: 'Keep Ad Spend <= $150,000', enabled: true },
  ],
  events: [
    { name: 'USD +8% on Nov 1, 2025', active: true },
    { name: 'Competitor X price drop', active: false },
  ],
};
