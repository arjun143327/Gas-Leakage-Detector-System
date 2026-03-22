import { useState, useEffect } from 'react';
import { getReadings, getAlerts } from './api';
import StatusCard from './components/StatusCard';
import LiveChart  from './components/LiveChart';
import StatsRow   from './components/StatsRow';
import AlertLog   from './components/AlertLog';
import './App.css';

export default function App() {
  const [readings, setReadings] = useState([]);
  const [alerts,   setAlerts]   = useState([]);
  const [error, setError] = useState('');
  const refreshSeconds = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [r, a] = await Promise.all([getReadings(), getAlerts()]);
        setReadings(r.data);
        setAlerts(a.data);
        setError('');
      } catch (e) {
        console.error('Failed to fetch data', e);
        setError('Unable to load live sensor data right now.');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshSeconds * 1000);
    return () => clearInterval(interval);
  }, []);

  const latest = readings[readings.length - 1];
  const alertCount = alerts.filter((alert) => alert.status !== 'SAFE').length;

  return (
    <main className="monitor-page">
      <section className="monitor-shell">
        <header className="monitor-hero">
          <div>
            <p className="eyebrow">Smart safety dashboard</p>
            <h1>LPG gas leak monitor</h1>
            <p className="monitor-subtitle">NodeMCU · Kitchen sensor</p>
          </div>

          <div className="live-pill">
            <span className="pulse-dot" />
            <span>Live updates every {refreshSeconds}s</span>
          </div>
        </header>

        {error ? <div className="error-banner">{error}</div> : null}

        <section className="monitor-grid">
          <StatusCard reading={latest} />
          <LiveChart readings={readings} />
        </section>

        <StatsRow readings={readings} alertCount={alertCount} />
        <AlertLog alerts={alerts} reading={latest} />
      </section>
    </main>
  );
}
