import BriefCard from './BriefCard';
import { briefData } from '@/data/briefData';

const ExecutiveBriefs = () => {
  return (
    <div className="space-y-4">
      {briefData.map((brief) => (
        <BriefCard
          key={brief.id}
          title={brief.title}
          date={brief.date}
          summary={brief.summary}
        />
      ))}
    </div>
  );
};

export default ExecutiveBriefs;
