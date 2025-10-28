import { useState } from 'react';
import { connectorData, Connector } from '@/data/connectorData';
import ConnectorCard from '@/components/setup/ConnectorCard';
import FileUpload from '@/components/setup/FileUpload';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

const SetupDataHub = () => {
  const [connectors, setConnectors] = useState<Connector[]>(connectorData);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleToggleConnector = (
    id: string,
    newStatus: 'Connected' | 'Disconnected',
  ) => {
    setConnectors(prev =>
      prev.map(connector =>
        connector.id === id
          ? {
              ...connector,
              status: newStatus,
              isEnabled: newStatus === 'Connected',
            }
          : connector,
      ),
    );
    console.log('toggleConnector', id, newStatus);
  };

  const handleFileUpload = (file: File) => {
    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type,
    };
    setUploadedFiles(prev => [...prev, uploadedFile]);
    console.log('uploadFile', uploadedFile);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="setup-page">
      <div className="setup-page__header">
        <h1 className="setup-page__title">Setup & Data Hub</h1>
        <p className="setup-page__description">
          Connect your data sources and manage integrations to power your
          business intelligence.
        </p>
      </div>

      <div className="setup-page__connectors">
        <div className="setup-page__connectors-header">
          <h2 className="setup-page__connectors-title">Data Connectors</h2>
          <p className="setup-page__connectors-description">
            Connect your business tools and data sources to get comprehensive
            insights.
          </p>
        </div>

        <div className="setup-page__connectors-grid">
          {connectors.map(connector => (
            <ConnectorCard
              key={connector.id}
              connector={connector}
              onToggle={newStatus =>
                handleToggleConnector(connector.id, newStatus)
              }
            />
          ))}
        </div>
      </div>

      <div className="setup-page__upload">
        <div className="setup-page__upload-header">
          <h2 className="setup-page__upload-title">Document Upload</h2>
          <p className="setup-page__upload-description">
            Upload documents, reports, or data files to include in your
            analysis.
          </p>
        </div>

        <FileUpload
          onFileUpload={handleFileUpload}
          uploadedFiles={uploadedFiles}
          onRemoveFile={handleRemoveFile}
        />
      </div>
    </div>
  );
};

export default SetupDataHub;
