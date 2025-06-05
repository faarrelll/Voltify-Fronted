// src/components/dashboard/CurrentGauge.tsx
import React from 'react';

interface CurrentGaugeProps {
  current: number;
  maxCurrent?: number;
  unit?: string;
}

const CurrentGauge: React.FC<CurrentGaugeProps> = ({ 
  current, 
  maxCurrent = 20, // Default maximum current of 20A
  unit = 'A' 
}) => {
  // Calculate percentage for gauge
  const percentage = Math.min(((current/1000) / maxCurrent) * 100, 100);
  
  // Determine color based on current level
  const getColor = (percentage: number) => {
    if (percentage < 30) return '#10B981'; // Green - Low
    if (percentage < 70) return '#F59E0B'; // Yellow - Medium
    return '#EF4444'; // Red - High
  };

  const color = getColor(percentage);
  
  // Calculate stroke dash array for the gauge
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">Current Monitor</h3>
      
      <div className="flex justify-center items-center">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold" style={{ color }}>
              {(current/1000).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">{unit}</div>
            <div className="text-xs text-gray-400 mt-1">
              {percentage.toFixed(1)}% of {maxCurrent}{unit}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium">
            {percentage < 30 ? 'Normal' : percentage < 70 ? 'Medium' : 'High'} Load
          </span>
        </div>
      </div>
      
      {/* Scale indicators */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>0{unit}</span>
        <span>{(maxCurrent * 0.25).toFixed(1)}{unit}</span>
        <span>{(maxCurrent * 0.5).toFixed(1)}{unit}</span>
        <span>{(maxCurrent * 0.75).toFixed(1)}{unit}</span>
        <span>{maxCurrent}{unit}</span>
      </div>
    </div>
  );
};

export default CurrentGauge;