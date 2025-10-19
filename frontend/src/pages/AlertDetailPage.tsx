import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { alertDetailData } from '@/data/alert-detail';
import { MessageSquare } from 'lucide-react';

export const AlertDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const alert = alertDetailData[id];

  if (!alert) {
    return <div>Alert not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{alert.title}</CardTitle>
              <p className="text-gray-500 mt-1">{alert.summary}</p>
            </div>
            <Badge className="bg-blue-500 text-white">
              Score: {alert.score}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold">Provenance</h3>
              <div className="space-y-4 mt-4">
                {alert.sources.map(source => (
                  <Card key={source.id}>
                    <CardContent className="p-4">
                      <p className="font-semibold">{source.type}</p>
                      <p>{source.author || source.source}</p>
                      <a href={source.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        View Source
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Actions</h3>
              <div className="space-y-4 mt-4">
                {alert.recommendedPlaybooks.map(playbook => (
                  <Card key={playbook.id}>
                    <CardContent className="p-4">
                      <p className="font-semibold">{playbook.title}</p>
                      <p>Cost: ${playbook.cost}</p>
                      <p>Expected Change: {playbook.expectedChange}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link to={`/copilot?alertId=${alert.id}`}>
                <Button className="mt-4 w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Copilot
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
