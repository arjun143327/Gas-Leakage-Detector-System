export default function StatusCard({ reading }) {
  if (!reading) return <p>Waiting for sensor...</p>;
  const colors = { SAFE: 'green', WARNING: 'orange', DANGER: 'red' };
  return (
    <div style={{ border: '2px solid', borderColor: colors[reading.status],
                  borderRadius: 12, padding: 24, marginBottom: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 14, color: colors[reading.status] }}>{reading.status}</div>
      <div style={{ fontSize: 48, fontWeight: 600 }}>{reading.ppm}</div>
      <div style={{ fontSize: 12, color: '#888' }}>current reading (ppm)</div>
    </div>
  );
}
