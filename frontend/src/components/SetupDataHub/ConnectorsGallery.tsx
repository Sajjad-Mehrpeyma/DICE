import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Connector {
  name: string;
  category: string;
  status: 'Connected' | 'Disconnected';
}

const connectors: Connector[] = [
  { name: 'Google Ads', category: 'Ads', status: 'Connected' },
  { name: 'Google Analytics', category: 'Analytics', status: 'Connected' },
  { name: 'Shopify', category: 'PIM', status: 'Disconnected' },
  { name: 'Salesforce', category: 'CRM', status: 'Disconnected' },
];

const ConnectorsGallery: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Connectors Gallery</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {connectors.map((connector) => (
          <Card key={connector.name} className="p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">{connector.name}</h4>
                <Badge variant={connector.status === 'Connected' ? 'default' : 'destructive'}>
                  {connector.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{connector.category}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              {connector.status === 'Connected' ? 'Test Sync' : 'Connect'}
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ConnectorsGallery;
