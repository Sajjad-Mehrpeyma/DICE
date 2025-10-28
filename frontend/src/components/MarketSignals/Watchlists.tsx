import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

interface WatchlistItem {
  sku: string;
  competitor: string;
  competitorPrice: string;
  delta: string;
}

const watchlistItems: WatchlistItem[] = [
  { sku: 'SKU-123', competitor: 'Competitor A', competitorPrice: '$49.99', delta: '-5.00%' },
  { sku: 'SKU-456', competitor: 'Competitor B', competitorPrice: '$24.99', delta: '+2.50%' },
  { sku: 'SKU-789', competitor: 'Competitor C', competitorPrice: '$99.99', delta: '0.00%' },
];

const Watchlists = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Watchlists</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Competitor</TableHead>
            <TableHead>Competitor Price</TableHead>
            <TableHead>Delta %</TableHead>
            <TableHead>Alert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlistItems.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.competitor}</TableCell>
              <TableCell>{item.competitorPrice}</TableCell>
              <TableCell className={item.delta.startsWith('-') ? 'text-red-500' : 'text-green-500'}>{item.delta}</TableCell>
              <TableCell><Switch /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Watchlists;
