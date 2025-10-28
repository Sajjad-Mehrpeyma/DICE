import AlertCard from './AlertCard';
import { alertData } from '@/data/alertData';

const AlertInbox = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {alertData.map(alert => (
        <AlertCard
          key={alert.id}
          title={alert.title}
          description={alert.description}
          status={alert.status as 'New' | 'Investigating' | 'Resolved'}
          severity={alert.severity as 'High' | 'Medium' | 'Low'}
        />
      ))}
    </div>
  );
};

export default AlertInbox;
