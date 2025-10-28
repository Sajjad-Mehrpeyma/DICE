import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { sourceLogoMap, sourceUrlMap } from '@/data/logoMap';

interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  source: string;
  fullContent: string;
  timestamp: string;
  relevance: 'High' | 'Medium' | 'Low';
}

const mockEvidence: EvidenceItem[] = [
  {
    id: '1',
    title: 'Website Traffic Analytics Report',
    description:
      'Traffic increased by 24% this month with 45K unique visitors and improved bounce rate.',
    source: 'Google Analytics',
    fullContent:
      'Detailed analytics show our website received 45,000 unique visitors this month, up 24% from last month. Bounce rate improved to 42% (down from 51%). Top traffic sources: Organic search (35%), Direct (28%), Social media (20%), Referral (12%), Paid ads (5%). Most popular pages: Product landing page (12K views), Blog articles (8.5K views), Pricing page (6.2K views). Average session duration increased to 3m 42s. Mobile traffic now represents 62% of total traffic, up from 58% last month.',
    timestamp: '2024-01-15',
    relevance: 'High',
  },
  {
    id: '2',
    title: 'E-commerce Orders & Revenue',
    description:
      'Shopify store generated $342K revenue with 1,247 orders and 3.8% conversion rate.',
    source: 'Shopify',
    fullContent:
      'January e-commerce performance: $342,000 in revenue from 1,247 completed orders. Average order value: $274. Conversion rate: 3.8% (up from 3.2% last month). Top selling products: Product A (342 units, $89K), Product B (228 units, $62K), Product C (195 units, $48K). Cart abandonment rate: 68% (industry avg: 70%). Mobile orders: 58% of total. Peak shopping times: Weekday evenings 6pm-9pm, Weekend afternoons 2pm-5pm. Customer retention rate: 42% returning customers.',
    timestamp: '2024-01-12',
    relevance: 'High',
  },
  {
    id: '3',
    title: 'Paid Ad Campaign Results',
    description:
      'Google Ads campaigns achieved $152K revenue with 4.2x ROAS and 8.2% CTR.',
    source: 'Google Ads',
    fullContent:
      'Google Ads performance for January: $36K ad spend generated $152K in attributed revenue (4.2x ROAS). Total impressions: 2.8M, Total clicks: 228K, Average CTR: 8.2% (industry avg: 3.5%). Cost per click: $0.16. Top performing campaigns: Brand search (7.8x ROAS), Product remarketing (5.2x ROAS), Generic keywords (2.8x ROAS). Conversion rate: 4.1%. Best performing ad groups: "Premium Collection" (238 conversions), "Sale Items" (186 conversions). Quality Score average: 7.8/10.',
    timestamp: '2024-01-10',
    relevance: 'High',
  },
  {
    id: '4',
    title: 'Team Collaboration & Activity',
    description:
      'Slack workspace shows 12,400 messages sent with high team engagement across channels.',
    source: 'Slack',
    fullContent:
      'January Slack activity metrics: 12,400 total messages sent across 28 active channels. Most active channels: #general (2,800 messages), #marketing (2,100 messages), #sales (1,900 messages), #product (1,650 messages). Average response time: 8 minutes. Files shared: 420. Integrations used: 18 different apps. Peak activity times: Weekdays 10am-12pm and 2pm-4pm. Active users: 45/48 team members (94% engagement). App usage: 72% desktop, 28% mobile.',
    timestamp: '2024-01-08',
    relevance: 'High',
  },
];

interface EvidencePanelProps {
  items?: EvidenceItem[];
}

const EvidencePanel: React.FC<EvidencePanelProps> = ({ items }) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(
    null,
  );
  const evidence = items && items.length ? items : mockEvidence;

  const topSources = useMemo(() => {
    const counts: Record<string, number> = {};
    evidence.forEach(e => {
      counts[e.source] = (counts[e.source] || 0) + 1;
    });
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 3);
  }, [evidence]);

  const openAllSources = () => {
    topSources.forEach(src => {
      const url = sourceUrlMap[src] || 'https://example.com';
      window.open(url, '_blank', 'noopener');
    });
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'High':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="evidence-panel">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Evidence Sources
            </CardTitle>
            {topSources.length > 0 && (
              <button
                className="flex items-center evidence-logos-group"
                onClick={openAllSources}
                title="Open all sources"
              >
                {topSources.map((src, idx) => (
                  <img
                    key={src}
                    src={sourceLogoMap[src] || '/public/logos/generic.png'}
                    alt={src}
                    className={`evidence-logo ${idx > 0 ? 'evidence-logo--overlap' : ''}`}
                  />
                ))}
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedEvidence ? (
            <div className="evidence-detail">
              <div className="evidence-detail__header">
                <button
                  onClick={() => setSelectedEvidence(null)}
                  className="evidence-detail__back-btn"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Evidence
                </button>
                <div className="evidence-detail__meta">
                  <span className="evidence-detail__source">
                    {selectedEvidence.source}
                  </span>
                  <span className="evidence-detail__timestamp">
                    {selectedEvidence.timestamp}
                  </span>
                </div>
              </div>
              <h3 className="evidence-detail__title">
                {selectedEvidence.title}
              </h3>
              <div className="evidence-detail__content">
                {selectedEvidence.fullContent}
              </div>
              <div className="evidence-detail__actions">
                <button className="evidence-detail__external-btn">
                  <ExternalLink className="w-4 h-4" />
                  View Full Source
                </button>
              </div>
            </div>
          ) : (
            <div className="evidence-list">
              {evidence.map(evidence => (
                <div
                  key={evidence.id}
                  className="evidence-item"
                  onClick={() => setSelectedEvidence(evidence)}
                >
                  <div className="evidence-item__header">
                    <h4 className="evidence-item__title">{evidence.title}</h4>
                    <span
                      className={`evidence-item__relevance ${getRelevanceColor(evidence.relevance)}`}
                    >
                      {evidence.relevance}
                    </span>
                  </div>
                  <p className="evidence-item__description">
                    {evidence.description}
                  </p>
                  <div className="evidence-item__meta">
                    <span className="evidence-item__source">
                      {evidence.source}
                    </span>
                    <span className="evidence-item__timestamp">
                      {evidence.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidencePanel;
