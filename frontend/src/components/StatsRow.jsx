export default function StatsRow({ readings, alertCount }) {
  const ppms = readings.map(r => r.ppm);
  const min  = ppms.length ? Math.min(...ppms) : '-';
  const max  = ppms.length ? Math.max(...ppms) : '-';
  const avg  = ppms.length ? Math.round(ppms.reduce((a,b) => a+b, 0) / ppms.length) : '-';
  const stats = [['Session min', min], ['Session max', max],
                 ['Session avg', avg], ['Alerts sent', alertCount]];

  return (
    <section className="stats-grid">
      {stats.map(([label, val]) => (
        <article key={label} className="stat-card">
          <p>{label}</p>
          <strong>
            {val}
            {label === 'Alerts sent' ? null : <span> ppm</span>}
          </strong>
        </article>
      ))}
    </section>
  );
}
