import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  sparkline: number[];
  onClick: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({
  id,
  title,
  value,
  change,
  changeType,
  sparkline,
  onClick,
}) => {
  const chartData = sparkline.map((value, index) => ({ name: index, value }));

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="kpi-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div className="kpi-card__header">
        <h3 className="kpi-card__title">{title}</h3>
        <MessageSquare className="kpi-card__icon" aria-hidden="true" />
      </div>

      <div className="kpi-card__content">
        <div className="kpi-card__value">{value}</div>

        <div className={`kpi-card__delta kpi-card__delta--${changeType}`}>
          {changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4 inline mr-1" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-4 h-4 inline mr-1" aria-hidden="true" />
          )}
          {change} from last month
        </div>

        <div className="kpi-card__sparkline">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`color-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                fillOpacity={1}
                fill={`url(#color-${id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
