import { useEffect, useState } from "react";
import { database } from "./config/firebase";
import { ref, onValue } from "firebase/database";
import { DeviceReadings } from "./types/device.types";

function App() {
  const [reading, setReading] = useState<DeviceReadings | null>(null);

  useEffect(() => {
    const deviceMac = "e4:65:b8:d9:95:94"; // MAC Address device kamu
    const readingsRef = ref(database, `voltage_controller/devices/${deviceMac}/readings`);

    const unsubscribe = onValue(readingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReading(data);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Realtime Voltage Controller Data</h1>

      {reading ? (
        <ul className="space-y-1 bg-gray-100 rounded p-4 shadow max-w-md">
          <li>Voltage: {reading.voltage} V</li>
          <li>Current: {reading.current} A</li>
          <li>Power: {reading.power} W</li>
          <li>Energy: {reading.energy} Wh</li>
          <li>Frequency: {reading.frequency} Hz</li>
          <li>Humidity: {reading.humidity} %</li>
          <li>Temperature: {reading.temperature} °C</li>
          <li>Timestamp: {new Date(reading.timestamp).toLocaleString()}</li>
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
