import React from 'react';

interface VoltageGaugeProps {
  currentVoltage: number;
  targetVoltage: number;
  tolerance: number;
}

const VoltageGauge: React.FC<VoltageGaugeProps> = ({
  currentVoltage,
  targetVoltage,
  tolerance,
}) => {
  // Calculate min and max acceptable voltage
  const minVoltage = targetVoltage - tolerance;
  const maxVoltage = targetVoltage + tolerance;
  
  // Determine if current voltage is within acceptable range
  const isWithinRange = currentVoltage >= minVoltage && currentVoltage <= maxVoltage;
  
  // Calculate percentage for gauge (assuming range from 0 to targetVoltage*1.5)
  const maxDisplay = targetVoltage * 1.5;
  const percentage = (currentVoltage / maxDisplay) * 100;
  
  // Determine color based on whether voltage is within range
  const getStatusColor = () => {
    if (!isWithinRange) {
      return 'text-red-500';
    }
    return 'text-green-500';
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Voltage Monitor</h2>
      
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4">
          {/* Create circular gauge */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            
            {/* Target range indicator */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#d1fae5"
              strokeWidth="8"
              strokeDasharray={`${(tolerance * 2 / maxDisplay) * 283}`}
              strokeDashoffset={`${(1 - (minVoltage / maxDisplay)) * 283}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            
            {/* Value indicator */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isWithinRange ? "#10b981" : "#ef4444"}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={`${(1 - percentage / 100) * 283}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            
            {/* Center text showing current voltage */}
            <text
              x="50"
              y="45"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="currentColor"
              className={getStatusColor()}
            >
              {currentVoltage}
            </text>
            <text
              x="50"
              y="60"
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              Volts
            </text>
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">Target: {targetVoltage} V (±{tolerance} V)</p>
          <p className="text-gray-600">Acceptable Range: {minVoltage}-{maxVoltage} V</p>
          <p className={`mt-2 font-medium ${getStatusColor()}`}>
            {isWithinRange ? "Voltage Normal" : "Voltage Out of Range"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoltageGauge;