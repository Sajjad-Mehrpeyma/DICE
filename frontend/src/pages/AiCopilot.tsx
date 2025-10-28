import { useState } from 'react';
import ChatPane from '@/components/AiCopilot/ChatPane';
import EvidencePanel from '@/components/AiCopilot/EvidencePanel';

const AiCopilot = () => {
  const [evidenceItems, setEvidenceItems] = useState<any[]>([]);
  return (
    <div className="copilot-page">
      <div className="copilot-page__header">
        <h1 className="copilot-page__title">AI Copilot</h1>
        <p className="copilot-page__description">
          Get AI-powered insights and assistance for your business decisions.
        </p>
      </div>

      <div className="copilot-page__container">
        <div className="copilot-page__evidence">
          <EvidencePanel items={evidenceItems} />
        </div>
        <div className="copilot-page__chat">
          <ChatPane onEvidenceUpdate={setEvidenceItems} />
        </div>
      </div>
    </div>
  );
};

export default AiCopilot;
