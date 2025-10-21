import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ConnectorCardProps {
  name: string;
  status: 'Connected' | 'Disconnected';
  logo: string;
}

const ConnectorCard: React.FC<ConnectorCardProps> = ({ name, status, logo }) => {
  const isConnected = status === 'Connected';

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <img src={logo} alt={`${name} logo`} className="h-12 w-12 mb-4" />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
        <Button variant={isConnected ? 'outline' : 'default'} size="sm" className="mt-4">
          {isConnected ? 'Manage' : 'Connect'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectorCard;
