import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoryEntry } from '../../types/device.types';

interface ReadingsChartProps {
  historyData: HistoryEntry[];
}

type ReadingType = 'voltage' | 'current' | 'power' | 'energy' | 'temperature' | 'humidity' | 'frequency';

const ReadingsChart: React.FC<ReadingsChartProps> = ({ historyData }) => {
  const [selectedReading, setSelectedReading] = useState<ReadingType>('voltage');
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  // Ensure data is sorted by timestamp
  const sortedData = [...historyData].sort((a, b) => {
    const timeA = a.timestamp || 0;
    const timeB = b.timestamp || 0;
    return timeA - timeB;
  });
  
  const readings = [
    { id: 'voltage', name: 'Voltage (V)', color: '#8884d8' },
    { id: 'current', name: 'Current (A)', color: '#82ca9d' },
    { id: 'power', name: 'Power (W)', color: '#ff7300' },
    { id: 'energy', name: 'Energy (kWh)', color: '#0088fe' },
    { id: 'temperature', name: 'Temperature (°C)', color: '#ff8042' },
    { id: 'humidity', name: 'Humidity (%)', color: '#00C49F' },
    { id: 'frequency', name: 'Frequency (Hz)', color: '#FFBB28' },
  ];
  
  const getCurrentReading = () => {
    return readings.find(r => r.id === selectedReading) || readings[0];
  };
  
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {readings.map((reading) => (
          <button
            key={reading.id}
            onClick={() => setSelectedReading(reading.id as ReadingType)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedReading === reading.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {reading.name}
          </button>
        ))}
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sortedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatDate} 
              label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }}
            />
            <YAxis 
              label={{ 
                value: getCurrentReading().name, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} 
            />
            <Tooltip 
              labelFormatter={(timestamp) => `Time: ${formatDate(timestamp as number)}`}
              formatter={(value) => [value, getCurrentReading().name]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedReading}
              stroke={getCurrentReading().color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {sortedData.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No history data available for this device.
        </div>
      )}
    </div>
  );
};

export default ReadingsChart;