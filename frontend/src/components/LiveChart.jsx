import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LiveChart({ readings }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h4>Live trend — last 60 readings</h4>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart data={readings}>
          <XAxis dataKey='timestamp' hide />
          <YAxis domain={[0, 1024]} />
          <Tooltip />
          <Line type='monotone' dataKey='ppm' stroke='#1D9E75' dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
