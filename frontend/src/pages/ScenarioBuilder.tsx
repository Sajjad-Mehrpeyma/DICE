import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatHistoryData } from '@/data/chat-history';
import { scenarioData } from '@/data/scenario';

export const ScenarioBuilder: React.FC = () => {
  const [conditions, setConditions] = useState<string[]>(['']);
  const [timeWindow, setTimeWindow] = useState<string>('1_month');
  const [completedInfo, setCompletedInfo] = useState('');
  const navigate = useNavigate();

  const handleAddCondition = () => {
    if (conditions.length < 10) {
      setConditions([...conditions, '']);
    }
  };

  const handleRemoveCondition = (index: number) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const handleConditionChange = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = value;
    setConditions(newConditions);
  };

  const handleCheckInfo = () => {
    setCompletedInfo(scenarioData.completedInfo);
  };

  const handleCreateScenario = () => {
    const newChatId = `chat-${Date.now()}`;
    chatHistoryData.push({
      id: newChatId,
      title: 'Scenario: ' + conditions.join(', '),
      type: 'scenario',
      messages: [
        { author: 'user', text: `What if ${conditions.join(' and ')} in ${timeWindow.replace('_', ' ')}?` },
        { author: 'bot', text: completedInfo },
      ],
    });
    navigate(`/copilot?contextId=${newChatId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Scenario Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Time Window</Label>
            <Select value={timeWindow} onValueChange={setTimeWindow}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1_week">1 Week</SelectItem>
                <SelectItem value="1_month">1 Month</SelectItem>
                <SelectItem value="3_months">3 Months</SelectItem>
                <SelectItem value="6_months">6 Months</SelectItem>
                <SelectItem value="1_year">1 Year</SelectItem>
                <SelectItem value="2_years">2 Years</SelectItem>
                <SelectItem value="5_years">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={condition}
                onChange={(e) => handleConditionChange(index, e.target.value)}
                placeholder={`Condition ${index + 1}`}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveCondition(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={handleAddCondition} disabled={conditions.length >= 10}>
            <Plus className="mr-2 h-4 w-4" />
            Add Condition
          </Button>
          <Button onClick={handleCheckInfo} className="w-full">
            Check Info
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={completedInfo}
            onChange={(e) => setCompletedInfo(e.target.value)}
            rows={10}
          />
          <Button onClick={handleCreateScenario} className="w-full mt-4">
            Create Scenario
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
