import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function LiveChart({ readings }) {
  const chartData = readings.map((reading, index) => ({
    ...reading,
    label: index === 0 ? '5 min ago' : index === readings.length - 1 ? 'now' : '',
    shortTime: new Date(reading.timestamp).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }));

  const latest = readings[readings.length - 1];
  const trendText = !latest
    ? 'Waiting for data'
    : latest.status === 'DANGER'
      ? 'Leak risk detected'
      : latest.status === 'WARNING'
        ? 'Elevated gas level'
        : 'Tracking normal range';

  return (
    <article className="monitor-panel chart-panel">
      <div className="chart-head">
        <div>
          <p className="panel-label">Live trend</p>
          <h2>Last 5 min</h2>
        </div>
        <span className="trend-summary">{trendText}</span>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 12, right: 12, bottom: 8, left: -20 }}>
            <defs>
              <linearGradient id="gasTrendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#21a685" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#21a685" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#d8d0bf" strokeDasharray="5 6" />
            <XAxis
              axisLine={false}
              dataKey="label"
              minTickGap={32}
              tick={{ fill: '#75664d', fontSize: 13 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: '#75664d', fontSize: 13 }}
              tickLine={false}
              width={44}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: '1px solid rgba(80, 63, 34, 0.12)',
                boxShadow: '0 14px 30px rgba(76, 54, 24, 0.12)',
              }}
              formatter={(value) => [`${value} ppm`, 'Reading']}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.shortTime || ''}
            />
            <Area dataKey="ppm" fill="url(#gasTrendFill)" stroke="none" type="monotone" />
            <Line
              activeDot={{ r: 6, stroke: '#fff8ee', strokeWidth: 3 }}
              dataKey="ppm"
              dot={false}
              stroke="#21a685"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
