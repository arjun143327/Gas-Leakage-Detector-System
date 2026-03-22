export default function StatusCard({ reading }) {
  const status = reading?.status || 'SAFE';
  const labels = { SAFE: 'Safe', WARNING: 'Warning', DANGER: 'Danger' };

  return (
    <article className="monitor-panel status-panel">
      <p className="panel-label">Current sensor state</p>
      <div className={`status-chip ${status.toLowerCase()}`}>{labels[status]}</div>
      <div className="reading-wrap">
        <span className="reading-value">{reading?.ppm ?? '--'}</span>
        <span className="reading-unit">ppm</span>
      </div>
      <p className="reading-caption">Current LPG concentration</p>
      <p className="updated-at">
        {reading ? `Last updated ${new Date(reading.timestamp).toLocaleTimeString()}` : 'Waiting for sensor data'}
      </p>
    </article>
  );
}
