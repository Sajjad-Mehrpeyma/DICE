import React from 'react';
import { useClock } from '@/hooks/useClock';

/**
 * ClockHeader component displays live date and time in the header
 * Uses monospace font for time to prevent layout shift
 */
export const ClockHeader: React.FC = () => {
    const { dateString, timeString } = useClock();
  
    // Strip seconds (e.g., convert "14:32:45" → "14:32")
    const timeWithoutSeconds = timeString.slice(0, 5);
  
    return (
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        <span className="text-gray-800 dark:text-gray-500">{dateString}</span>
        <span className="ml-4 font-mono text-gray-800 dark:text-gray-500">
          {timeWithoutSeconds}
        </span>
      </div>
    );
  };