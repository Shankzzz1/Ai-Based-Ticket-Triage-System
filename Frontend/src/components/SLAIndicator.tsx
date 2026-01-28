import React, { useEffect, useState } from 'react';

interface SLAIndicatorProps {
  dueBy?: string;       // optional for safety
  breached?: boolean;   // optional for safety
}

const SLAIndicator: React.FC<SLAIndicatorProps> = ({ dueBy, breached }) => {
  const [remaining, setRemaining] = useState<string>('');

  // 🔒 Safety: SLA not assigned yet
  if (!dueBy) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">
          SLA: Not assigned
        </span>
      </div>
    );
  }

  useEffect(() => {
    if (breached) return;

    const updateRemaining = () => {
      const now = new Date().getTime();
      const due = new Date(dueBy).getTime();
      const diff = due - now;

      if (diff <= 0) {
        setRemaining('Due now');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) {
        setRemaining(`${days}d ${hours}h`);
      } else {
        setRemaining(
          `${hours.toString().padStart(2, '0')}h ` +
          `${minutes.toString().padStart(2, '0')}m ` +
          `${seconds.toString().padStart(2, '0')}s`
        );
      }
    };

    updateRemaining(); // initial run
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [dueBy, breached]);

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-600">
        SLA:{' '}
        <span
          className={
            breached
              ? 'font-semibold text-red-600'
              : 'font-medium text-gray-800'
          }
        >
          {breached ? 'Overdue' : remaining}
        </span>
      </div>

      {breached && (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-300">
          Breached
        </span>
      )}
    </div>
  );
};

export default SLAIndicator;
