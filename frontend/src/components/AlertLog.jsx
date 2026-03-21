export default function AlertLog({ alerts }) {
  const color = { WARNING: 'orange', DANGER: 'red', SAFE: 'green' };
  if (!alerts || alerts.length === 0) {
    return (
      <div>
        <h4>Alert log</h4>
        <p>No alerts yet.</p>
      </div>
    );
  }
  return (
    <div>
      <h4>Alert log</h4>
      {alerts.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0',
                             borderBottom: '1px solid #eee', fontSize: 13 }}>
          <span style={{ color: color[a.status], fontWeight: 600 }}>{a.status}</span>
          <span>{a.ppm} ppm</span>
          <span style={{ marginLeft: 'auto', color: '#aaa' }}>
            {new Date(a.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
}
