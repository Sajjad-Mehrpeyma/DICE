import AlertInbox from '@/components/PulseAlerts/AlertInbox';

const PulseAlerts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pulse & Alerts</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Alert Inbox</h2>
        <AlertInbox />
      </div>
    </div>
  );
};

export default PulseAlerts;
