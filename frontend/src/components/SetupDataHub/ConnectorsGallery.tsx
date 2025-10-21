import React from 'react';
import ConnectorCard from './ConnectorCard';
import { connectorData } from '@/data/connectorData';

const ConnectorsGallery: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {connectorData.map((connector, index) => (
        <ConnectorCard
          key={index}
          name={connector.name}
          status={connector.status as 'Connected' | 'Disconnected'}
          logo={connector.logo}
          health={connector.health as 'Good' | 'Warning' | 'Broken'}
          lastSync={connector.lastSync}
        />
      ))}
    </div>
  );
};

export default ConnectorsGallery;
