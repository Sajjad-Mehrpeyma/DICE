import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConditionBuilder from '@/components/planning/ConditionBuilder';
import GeneratedPlan from '@/components/planning/GeneratedPlan';
import RoadmapRecommender from '@/components/planning/RoadmapRecommender';

interface Condition {
  id: string;
  text: string;
}

const Planning = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<Condition[]>([
    { id: '1', text: 'Revenue increases by 20%' },
    { id: '2', text: 'Customer acquisition cost decreases by 15%' },
  ]);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapItems, setRoadmapItems] = useState<any[]>([]);

  const handleAddCondition = (newCondition: string) => {
    const condition: Condition = {
      id: Date.now().toString(),
      text: newCondition,
    };
    setConditions([...conditions, condition]);
    console.log('addCondition', [...conditions, condition]);
  };

  const handleRemoveCondition = (id: string) => {
    const updatedConditions = conditions.filter(c => c.id !== id);
    setConditions(updatedConditions);
    console.log('addCondition', updatedConditions);
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    try {
      // Mock API call
      const response = await fetch('/api/future-plan/mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conditions }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedPlan(data.plan);
      } else {
        // Fallback mock response
        setGeneratedPlan(`Based on your conditions, here's a comprehensive future plan:

**Strategic Overview:**
Your conditions focus on revenue growth and cost optimization, which are excellent foundational goals for sustainable business expansion.

**Key Initiatives:**

1. **Revenue Growth Strategy (20% Target)**
   - Expand into new market segments identified through data analysis
   - Launch premium product lines with higher margins
   - Implement dynamic pricing strategies based on demand patterns
   - Strengthen customer retention programs to increase lifetime value

2. **Cost Optimization (15% CAC Reduction)**
   - Optimize marketing channel mix to focus on highest-converting sources
   - Implement advanced targeting to reduce wasted ad spend
   - Develop referral programs to leverage organic growth
   - Automate lead qualification processes to improve efficiency

3. **Operational Excellence**
   - Invest in predictive analytics for better demand forecasting
   - Streamline supply chain operations to reduce costs
   - Implement customer success programs to improve retention
   - Develop strategic partnerships for market expansion

**Timeline & Milestones:**
- Q1: Complete market analysis and strategy development
- Q2: Launch new product lines and pricing strategies
- Q3: Implement automation and optimization tools
- Q4: Scale successful initiatives and measure results

**Success Metrics:**
- Monthly recurring revenue growth rate
- Customer acquisition cost by channel
- Customer lifetime value improvement
- Market share expansion in target segments

This plan provides a structured approach to achieving your stated conditions while building sustainable competitive advantages.`);
      }
    } catch (error) {
      console.error('Error generating plan:', error);
      // Fallback mock response
      setGeneratedPlan('Error generating plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRecommendRoadmap = (query: string) => {
    console.log('recommendRoadmap', query);

    // Mock roadmap recommendations
    const mockRoadmap = [
      {
        id: '1',
        title: 'Market Expansion Initiative',
        description:
          'Expand into 3 new geographic markets with localized strategies',
        priority: 'High',
        estimatedDuration: '6 months',
        resources: ['Marketing Team', 'Sales Team', 'Legal Team'],
      },
      {
        id: '2',
        title: 'Product Innovation Program',
        description:
          'Develop and launch 2 new product lines based on market research',
        priority: 'Medium',
        estimatedDuration: '9 months',
        resources: ['Product Team', 'R&D', 'Marketing Team'],
      },
      {
        id: '3',
        title: 'Digital Transformation',
        description:
          'Implement AI-powered analytics and automation across all departments',
        priority: 'High',
        estimatedDuration: '12 months',
        resources: ['IT Team', 'Data Science', 'Operations'],
      },
      {
        id: '4',
        title: 'Customer Experience Enhancement',
        description:
          'Redesign customer journey and implement omnichannel support',
        priority: 'Medium',
        estimatedDuration: '4 months',
        resources: ['Customer Success', 'Design Team', 'Engineering'],
      },
    ];

    setRoadmapItems(mockRoadmap);
  };

  const handleProcessRoadmap = (itemId: string) => {
    console.log('processRoadmap', itemId);
    // Redirect to dashboard with copilot focus
    navigate('/dashboard?focus=copilot&context=Future Planning Assistance');
  };

  return (
    <div className="planning-page">
      <div className="planning-page__header">
        <h1 className="planning-page__title">Future Planning</h1>
        <p className="planning-page__description">
          Build scenarios, generate strategic plans, and get AI-powered
          recommendations for your business future.
        </p>
      </div>

      <div className="planning-page__container">
        <div className="planning-page__left-panel">
          <ConditionBuilder
            conditions={conditions}
            onAddCondition={handleAddCondition}
            onRemoveCondition={handleRemoveCondition}
            onGeneratePlan={handleGeneratePlan}
            isGenerating={isGenerating}
          />
        </div>

        <div className="planning-page__right-panel">
          <GeneratedPlan
            plan={generatedPlan}
            onPlanChange={setGeneratedPlan}
            isGenerating={isGenerating}
          />
        </div>
      </div>

      <div className="planning-page__roadmap">
        <RoadmapRecommender
          onRecommend={handleRecommendRoadmap}
          roadmapItems={roadmapItems}
          onProcessItem={handleProcessRoadmap}
        />
      </div>
    </div>
  );
};

export default Planning;
