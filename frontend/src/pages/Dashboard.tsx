import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import KpiDetailPanel from '@/components/dashboard/KpiDetailPanel';
import KpiDetailOverlay from '@/components/dashboard/KpiDetailOverlay';
import CopilotChatPane from '@/components/dashboard/CopilotChatPane';
import SignalAlertCard from '@/components/shared/SignalAlertCard';
import { MarketingKpi } from '@/data/marketingKpiData';
import { alertData } from '@/data/alertData';
import { signalData } from '@/data/signalData';
import { useMarketingKpis } from '@/hooks/useMarketingKpis';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<MarketingKpi | null>(null);
  const { data: kpis = [], isLoading: kpisLoading } = useMarketingKpis();
  const [copilotContext, setCopilotContext] = useState<string>('');

  useEffect(() => {
    // Check if copilot should be focused from URL params
    const focus = searchParams.get('focus');
    if (focus === 'copilot') {
      setIsCopilotOpen(true);
    }
  }, [searchParams]);

  // Filter high-priority alerts and signals
  const highPriorityAlerts = useMemo(() => {
    return alertData
      .filter(
        alert =>
          (alert.severity === 'Critical' || alert.severity === 'High') &&
          (alert.status === 'New' || alert.status === 'Investigating'),
      )
      .slice(0, 3);
  }, []);

  const highPrioritySignals = useMemo(() => {
    return signalData
      .filter(
        signal => signal.priority === 'Critical' || signal.priority === 'High',
      )
      .slice(0, 3);
  }, []);

  const handleKpiClick = (kpiId: string) => {
    const kpi = kpis.find(k => k.id === kpiId);
    if (kpi) {
      setSelectedKpi(kpi);
      setIsCopilotOpen(true);
      setCopilotContext(
        `Analyze this KPI: ${kpi.title}. Current value: ${kpi.value}, Change: ${kpi.change}%`,
      );
    }
  };

  const handleKpiClose = () => {
    setSelectedKpi(null);
    setIsCopilotOpen(false);
  };

  const handleCopilotToggle = () => {
    setIsCopilotOpen(!isCopilotOpen);
  };

  const handleAlertAcknowledge = (alertId: number) => {
    console.log('Acknowledge alert', alertId);
    // TODO: Implement alert acknowledgment
  };

  const handleAlertExpand = (alertId: number) => {
    navigate('/signals');
  };

  const handleSignalAcknowledge = (signalId: number) => {
    console.log('Acknowledge signal', signalId);
    // TODO: Implement signal acknowledgment
  };

  const handleSignalExpand = (signalId: number) => {
    navigate('/signals');
  };

  return (
    <div className="dashboard">
      {selectedKpi ? (
        <div className="dashboard__kpi-detail-layout">
          {/* KPI Details on Left */}
          <div className="dashboard__kpi-details">
            <KpiDetailOverlay
              kpi={selectedKpi}
              isOpen={true}
              onClose={handleKpiClose}
              isEmbedded={true}
            />
          </div>

          {/* Copilot on Right */}
            <CopilotChatPane
              isOpen={true}
              onToggle={handleCopilotToggle}
              context={copilotContext}
              isEmbedded={true}
            />
        </div>
      ) : (
        <div className="dashboard__container">
          {/* KPI Section */}
          <div className="dashboard__kpi-section">
            <KpiDetailPanel
              kpis={kpis}
              onKpiClick={handleKpiClick}
            />
          </div>

          {/* High-Priority Alerts and Signals in 2 columns */}
          <div className="dashboard__priority-section">
            <div className="dashboard__alerts-column">
              <div className="dashboard__section-header">
                <h2 className="dashboard__section-title">
                  High-Priority Alerts
                </h2>
                <p className="dashboard__section-subtitle">
                  Critical and high-severity alerts requiring immediate
                  attention
                </p>
              </div>
              <div className="dashboard__alerts-grid">
                {highPriorityAlerts.map(alert => (
                  <SignalAlertCard
                    key={alert.id}
                    item={alert}
                    onClick={() => handleAlertExpand(alert.id)}
                  />
                ))}
              </div>
            </div>

            <div className="dashboard__signals-column">
              <div className="dashboard__section-header">
                <h2 className="dashboard__section-title">
                  High-Priority Signals
                </h2>
                <p className="dashboard__section-subtitle">
                  Critical and high-priority market signals and insights
                </p>
              </div>
              <div className="dashboard__signals-grid">
                {highPrioritySignals.map(signal => (
                  <SignalAlertCard
                    key={signal.id}
                    item={signal}
                    onClick={() => handleSignalExpand(signal.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copilot Sidebar for non-KPI views */}
      {!selectedKpi && (
        <CopilotChatPane
          isOpen={isCopilotOpen}
          onToggle={handleCopilotToggle}
          context={copilotContext}
        />
      )}
    </div>
  );
};

export default Dashboard;
