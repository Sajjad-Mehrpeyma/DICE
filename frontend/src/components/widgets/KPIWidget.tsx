import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface KPIWidgetProps {
  title: string;
  value: string | number;
  percentChange?: number;
  icon?: ReactNode;
  className?: string;
}

export const KPIWidget = ({
  title,
  value,
  percentChange,
  icon,
  className,
}: KPIWidgetProps) => {
  const isPositive = percentChange && percentChange > 0;
  const isNegative = percentChange && percentChange < 0;

  return (
    <div className={clsx('card', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {percentChange !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
              <span
                className={clsx(
                  'text-sm font-medium ml-1',
                  isPositive && 'text-green-600',
                  isNegative && 'text-red-600',
                  !isPositive && !isNegative && 'text-gray-600',
                )}
              >
                {Math.abs(percentChange).toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
