import { useState, useEffect } from 'react';
import { getReadings, getAlerts } from './api';
import StatusCard from './components/StatusCard';
import LiveChart  from './components/LiveChart';
import StatsRow   from './components/StatsRow';
import AlertLog   from './components/AlertLog';

export default function App() {
  const [readings, setReadings] = useState([]);
  const [alerts,   setAlerts]   = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const r = await getReadings();
        const a = await getAlerts();
        setReadings(r.data);
        setAlerts(a.data);
      } catch (e) {
        console.error("Failed to fetch data", e);
      }
    };
    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  const latest = readings[readings.length - 1];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>LPG Gas Leak Monitor</h2>
      <StatusCard reading={latest} />
      <LiveChart  readings={readings} />
      <StatsRow   readings={readings} alertCount={alerts.length} />
      <AlertLog   alerts={alerts} />
    </div>
  );
}
