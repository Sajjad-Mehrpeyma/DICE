import React from 'react';
import { scenarioData } from '@/data/scenarioData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const ScenarioCanvas: React.FC = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Levers */}
      <Card>
        <CardHeader>
          <CardTitle>Levers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenarioData.levers.map((lever, index) => (
            <div key={index}>
              <Label>{lever.name}</Label>
              <Slider
                defaultValue={[lever.value]}
                min={lever.min}
                max={lever.max}
                step={lever.step}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Constraints */}
      <Card>
        <CardHeader>
          <CardTitle>Constraints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenarioData.constraints.map((constraint, index) => (
            <div key={index} className="flex items-center justify-between">
              <Label>{constraint.name}</Label>
              <Switch defaultChecked={constraint.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenarioData.events.map((event, index) => (
            <div key={index} className="flex items-center justify-between">
              <Label>{event.name}</Label>
              <Switch defaultChecked={event.active} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioCanvas;
