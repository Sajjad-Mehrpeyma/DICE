import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
}

const events: Event[] = [
  { id: '1', name: 'USD +8%', type: 'Currency Shock', date: '2025-11-01' },
  { id: '2', name: 'Heatwave', type: 'Weather', date: '2025-07-15' },
  { id: '3', name: 'Competitor X Sale', type: 'Competitor Action', date: '2025-11-24' },
];

const EventsRegistry = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Events & Exogenous Rules</h3>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="text-xs p-2 rounded-md bg-secondary flex justify-between items-center">
            <div>
              <p className="font-semibold">{event.name}</p>
              <p className="text-muted-foreground">{event.type}</p>
            </div>
            <p className="text-muted-foreground">{event.date}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EventsRegistry;
