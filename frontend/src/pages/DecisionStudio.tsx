import React from 'react';
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
import { decisionEvaluationData } from '@/data/decision';

export const DecisionStudio: React.FC = () => {
  const [showResults, setShowResults] = React.useState(false);

  const handleEvaluate = () => {
    setShowResults(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Decision Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title of decision</Label>
            <Input id="title" placeholder="e.g., Move 30% budget FB -> Google" />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select decision type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ad_realloc">Ad Budget Reallocation</SelectItem>
                <SelectItem value="pause_campaign">Pause Campaign</SelectItem>
                <SelectItem value="price_change">Price Change</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scope">Scope</Label>
            <Input id="scope" placeholder="e.g., Campaign ID / SKU / Region" />
          </div>
          <Button onClick={handleEvaluate} className="w-full">
            Evaluate
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evaluation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg font-semibold">
                {decisionEvaluationData.verdict.replace('_', ' ').toUpperCase()}
              </p>
              <p>Confidence: {decisionEvaluationData.confidence}%</p>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">Reasons:</h3>
              <ul className="list-disc list-inside">
                {decisionEvaluationData.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
