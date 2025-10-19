import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { executiveSnapshotData } from '@/data/executive-snapshot';
import jsPDF from 'jspdf';
import { Download, Slack, BarChart } from 'lucide-react';

const ExecutiveSnapshotCard: React.FC = () => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Executive Snapshot', 10, 10);
    doc.text(`Summary: ${executiveSnapshotData.summary}`, 10, 20);
    doc.text(`Confidence: ${executiveSnapshotData.confidence}%`, 10, 30);
    executiveSnapshotData.kpis.forEach((kpi, index) => {
      doc.text(`${kpi.label}: ${kpi.value}`, 10, 40 + index * 10);
    });
    doc.save('executive-snapshot.pdf');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Executive Snapshot — Immediate Actions</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Slack className="mr-2 h-4 w-4" />
              Send to C-suite Slack
            </Button>
            <Button size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              Open full analysis
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <p className="text-lg">{executiveSnapshotData.summary}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold text-primary-700">
              {executiveSnapshotData.confidence}%
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {executiveSnapshotData.kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  {kpi.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSnapshotCard;
