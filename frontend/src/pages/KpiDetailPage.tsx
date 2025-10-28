import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { kpisData } from '@/data/kpis';
import { ArrowLeft } from 'lucide-react';

export const KpiDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const kpi = kpisData.kpis.find(k => k.id === id);

  if (!kpi) {
    return <div>KPI not found</div>;
  }

  return (
    <div className="space-y-6">
      <Link to="/dashboard">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{kpi.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{kpi.value}</div>
          <p className="text-muted-foreground">
            {kpi.delta > 0 ? `+${kpi.delta}` : kpi.delta}% from last week
          </p>
          {/* Add more detailed information here */}
        </CardContent>
      </Card>
    </div>
  );
};
