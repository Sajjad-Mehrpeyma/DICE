import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

interface ConnectorCardProps {
  name: string;
  status: 'Connected' | 'Disconnected';
  logo: string;
  health: 'Good' | 'Warning' | 'Broken';
  lastSync: string;
}

const ConnectorCard = ({
  name,
  status,
  logo,
  health,
  lastSync,
}: ConnectorCardProps) => {
  const isConnected = status === 'Connected';

  const healthConfig = {
    Good: 'bg-green-500',
    Warning: 'bg-yellow-500',
    Broken: 'bg-red-500',
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <img src={logo} alt={`${name} logo`} className="h-12 w-12 mb-4" />
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center mt-2">
          <Badge className={`${healthConfig[health]} text-white`}>
            {health}
          </Badge>
          <p
            className={`text-sm ml-2 ${isConnected ? 'text-green-500' : 'text-red-500'}`}
          >
            {status}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Last sync: {lastSync}
        </p>
        <Button
          variant={isConnected ? 'outline' : 'default'}
          size="sm"
          className="mt-4"
        >
          {isConnected ? 'Manage' : 'Connect'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectorCard;
