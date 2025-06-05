// src/components/dashboard/VoltageGauge.tsx
import React from 'react';

interface VoltageGaugeProps {
  currentVoltage: number;
  targetVoltage: number;
  tolerance: number;
  unit?: string;
}

const VoltageGauge: React.FC<VoltageGaugeProps> = ({ 
  currentVoltage, 
  targetVoltage, 
  tolerance,
  unit = 'V'
}) => {
  // Calculate voltage range
  const minVoltage = targetVoltage - (targetVoltage * 10 / 100);
  const maxVoltage = targetVoltage + (targetVoltage * 5 / 100);
  // const rangeVoltage = maxVoltage - minVoltage;
  
  // Determine if voltage is within acceptable range
  const isInRange = currentVoltage >= minVoltage && currentVoltage <= maxVoltage;
  const isLow = currentVoltage < minVoltage;
  const isHigh = currentVoltage > maxVoltage;
  
  // Calculate percentage for gauge (based on extended range for better visualization)
  const gaugeMin = minVoltage;
  const gaugeMax = maxVoltage;
  const gaugeRange = gaugeMax - gaugeMin;
  const percentage = Math.min(Math.max(((currentVoltage - gaugeMin) / gaugeRange) * 100, 0), 100);
  
  // Determine color based on voltage status
  const getColor = () => {
    if (isInRange) return '#10B981'; // Green - In range
    if (isLow) return '#3B82F6'; // Blue - Low
    if (isHigh) return '#EF4444'; // Red - High
    return '#6B7280'; // Gray - Default
  };

  const color = getColor();
  
  // Calculate stroke dash array for the gauge
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculate positions for target range indicators
  const targetMinPercentage = ((minVoltage - gaugeMin) / gaugeRange) * 100;
  const targetMaxPercentage = ((maxVoltage - gaugeMin) / gaugeRange) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-center">Voltage Monitor</h3>
      
      <div className="flex justify-center items-center">
        <div className="relative w-64 h-64">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
            {/* Main background circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            
            {/* Target range indicator */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="#D1FAE5"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - ((targetMaxPercentage - targetMinPercentage) / 100) * circumference}
              transform={`rotate(${(targetMinPercentage / 100) * 360} 140 140)`}
            />
            
            {/* Current voltage indicator */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke={color}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-2" style={{ color }}>
              {currentVoltage.toFixed(1)}
            </div>
            <div className="text-lg text-gray-500 mb-2">{unit}</div>
            <div className="text-sm text-gray-400 text-center">
              Target: {targetVoltage}{unit} ± {tolerance}{unit}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-lg font-medium">
            {isInRange ? 'Normal' : isLow ? 'Under Voltage' : 'Over Voltage'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {isInRange 
            ? 'Voltage is within acceptable range' 
            : isLow 
              ? `${(minVoltage - currentVoltage).toFixed(1)}${unit} below minimum`
              : `${(currentVoltage - maxVoltage).toFixed(1)}${unit} above maximum`
          }
        </div>
      </div>
      
      {/* Voltage range indicators */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Minimum</div>
            <div className="font-medium text-blue-600">{minVoltage.toFixed(1)}{unit}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Target</div>
            <div className="font-medium text-green-600">{targetVoltage.toFixed(1)}{unit}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Maximum</div>
            <div className="font-medium text-red-600">{maxVoltage.toFixed(1)}{unit}</div>
          </div>
        </div>
        
        {/* Visual range bar */}
        <div className="mt-3 relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-200 absolute"
              style={{
                left: `${targetMinPercentage}%`,
                width: `${targetMaxPercentage - targetMinPercentage}%`
              }}
            />
            <div 
              className="h-full w-1 absolute transform -translate-x-1/2"
              style={{
                left: `${percentage}%`,
                backgroundColor: color
              }}
              
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{gaugeMin.toFixed(0)}{unit}</span>
            <span>{gaugeMax.toFixed(0)}{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoltageGauge;