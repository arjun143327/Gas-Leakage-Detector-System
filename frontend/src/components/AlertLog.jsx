const messages = {
  SAFE: 'System stable',
  WARNING: 'Gas limit exceeded',
  DANGER: 'Critical gas level + Buzzer',
};

const labels = {
  SAFE: 'Safe',
  WARNING: 'Warning',
  DANGER: 'Danger',
};

export default function AlertLog({ alerts, reading }) {
  const rows = alerts.slice(0, 8);

  return (
    <section className="monitor-panel alert-panel">
      <div className="alert-head">
        <div>
          <p className="panel-label">Alert log</p>
          <h2>Recent events</h2>
        </div>
      </div>

      {rows.length ? (
        <div className="alert-list">
          {rows.map((alert, index) => (
            <article key={`${alert.timestamp}-${index}`} className="alert-row">
              <span className={`alert-badge ${alert.status.toLowerCase()}`}>
                {labels[alert.status]}
              </span>
              <span className="alert-reading">{alert.ppm} ppm</span>
              <span className="alert-message">{messages[alert.status]}</span>
              <span className="alert-time">
                {new Date(alert.timestamp).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {reading ? 'No warning or danger alerts yet.' : 'Waiting for first sensor reading.'}
        </div>
      )}
    </section>
  );
}
