import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BriefCardProps {
  title: string;
  date: string;
  summary: string;
}

const BriefCard = ({ title, date, summary }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-muted-foreground">{date}</div>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BriefCard;
