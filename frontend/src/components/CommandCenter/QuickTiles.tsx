import React from 'react';
import QuickTile from './QuickTile';
import { quickTileData } from '@/data/quickTileData';

const QuickTiles: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickTileData.map((tile, index) => (
        <QuickTile
          key={index}
          title={tile.title}
          data={tile.data}
          value={tile.value}
          description={tile.description}
        />
      ))}
    </div>
  );
};

export default QuickTiles;
