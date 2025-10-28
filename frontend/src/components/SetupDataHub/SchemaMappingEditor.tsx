import { Card } from '@/components/ui/card';

const SchemaMappingEditor = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Schema & Mapping Editor</h3>
      <div className="flex justify-between">
        <div className="w-1/2 pr-2">
          <h4 className="text-xs font-medium mb-2">Source Fields</h4>
          {/* Placeholder for source fields */}
          <div className="text-xs text-muted-foreground border p-2 rounded-md h-48 overflow-y-auto">
            <p>Source fields will be listed here.</p>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <h4 className="text-xs font-medium mb-2">Canonical Schema</h4>
          {/* Placeholder for canonical schema */}
          <div className="text-xs text-muted-foreground border p-2 rounded-md h-48 overflow-y-auto">
            <p>Canonical schema will be listed here.</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SchemaMappingEditor;
