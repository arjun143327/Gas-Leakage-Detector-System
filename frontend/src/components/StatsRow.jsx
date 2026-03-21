export default function StatsRow({ readings, alertCount }) {
  const ppms = readings.map(r => r.ppm);
  const min  = ppms.length ? Math.min(...ppms) : '-';
  const max  = ppms.length ? Math.max(...ppms) : '-';
  const avg  = ppms.length ? Math.round(ppms.reduce((a,b) => a+b, 0) / ppms.length) : '-';
  const stats = [['Session min', min], ['Session max', max],
                 ['Session avg', avg], ['Alerts sent', alertCount]];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
      {stats.map(([label, val]) => (
        <div key={label} style={{ background: '#f5f5f5', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, color: '#888' }}>{label}</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{val}</div>
        </div>
      ))}
    </div>
  );
}
