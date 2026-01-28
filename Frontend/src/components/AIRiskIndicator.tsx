import React from 'react';

interface AIRiskIndicatorProps {
  risk?: number; // 0–1
}

const AIRiskIndicator: React.FC<AIRiskIndicatorProps> = ({ risk }) => {
  if (risk === undefined || risk === null) {
    return (
      <span className="text-xs text-gray-400">
        AI Risk: N/A
      </span>
    );
  }

  const percentage = Math.round(risk * 100);

  let color = 'bg-green-100 text-green-800 border-green-300';
  let label = 'Low';

  if (percentage > 70) {
    color = 'bg-red-100 text-red-800 border-red-300';
    label = 'High';
  } else if (percentage > 40) {
    color = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    label = 'Medium';
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${color}`}
      title={`AI predicted breach risk: ${percentage}%`}
    >
      🔮 {label} Risk ({percentage}%)
    </span>
  );
};

export default AIRiskIndicator;
