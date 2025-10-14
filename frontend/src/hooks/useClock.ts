import { useState, useEffect } from 'react';

/**
 * Hook for managing live date and time display
 * Updates every second to show current date and time
 * 
 * @returns Object containing formatted date and time strings
 */
export const useClock = () => {
  const [dateString, setDateString] = useState<string>('');
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    /**
     * Updates the date and time strings
     */
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date as MMM D, YYYY (e.g. Oct 14, 2025)
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      const formattedDate = now.toLocaleDateString('en-US', dateOptions);
      setDateString(formattedDate);
      
      // Format time as HH:mm:ss
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      setTimeString(formattedTime);
    };

    // Update immediately
    updateDateTime();

    // Set up interval to update every second
    const interval = setInterval(updateDateTime, 1000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    dateString,
    timeString
  };
};
