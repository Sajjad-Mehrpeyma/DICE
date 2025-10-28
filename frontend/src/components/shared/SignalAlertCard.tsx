import { Alert } from '@/data/alertData';
import { Signal } from '@/data/signalData';

type Item = Alert | Signal;

interface SignalAlertCardProps {
  item: Item;
  onClick?: () => void;
}

const SignalAlertCard = ({ item, onClick }: SignalAlertCardProps) => {
  const isSignal = (i: Item): i is Signal =>
    (i as Signal).headline !== undefined;

  const title = isSignal(item) ? item.headline : item.title;
  const minimalDescription = isSignal(item)
    ? item.description
    : item.description;

  const relevance = isSignal(item)
    ? item.relevance
    : item.severity === 'Critical' || item.severity === 'High'
      ? 'High'
      : item.severity === 'Medium'
        ? 'Medium'
        : 'Low';

  const category = item.category;

  const confidence = isSignal(item) ? `${Math.round(item.confidence)}%` : '80%';

  return (
    <div
      className="card p-4 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-primary/20"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {minimalDescription}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
          Relevance: {relevance}
        </span>
        <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          Category: {category}
        </span>
        <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          Confidence: {confidence}
        </span>
      </div>
    </div>
  );
};

export default SignalAlertCard;
