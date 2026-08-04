
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import styles from './RateChart.module.css';

// Sample mock data matching the USD/EUR timeframe
const chartData = [
  { date: 'Apr 14', value: 0.8510 },
  { date: '', value: 0.8560 },
  { date: '', value: 0.8500 },
  { date: '', value: 0.8520 },
  { date: 'Apr 21', value: 0.8460 },
  { date: '', value: 0.8490 },
  { date: '', value: 0.8420 },
  { date: 'Apr 28', value: 0.8510 },
  { date: '', value: 0.8450 },
  { date: '', value: 0.8540 },
  { date: 'May 06', value: 0.8600 },
  { date: '', value: 0.8520 },
  { date: '', value: 0.8610 },
  { date: 'May 14', value: 0.8580 },
];

export default function RateChart() {
  return (
    <div className={styles.chartCard}>
      {/* Chart Header */}
      <div className={styles.chartHeader}>
        <span className={styles.pairTitle}>USD/EUR</span>
        <span className={styles.timestamp}>0.8530 · MAY 14 16:00 CET</span>
      </div>

      {/* Recharts Wrapper */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-lime-500)" stopOpacity={0.4} />
                <stop offset="70%" stopColor="var(--color-lime-500)" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Axes */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#525866', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              domain={['dataMin - 0.005', 'dataMax + 0.005']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#525866', fontSize: 11 }}
              orientation="left"
            />

            {/* Custom Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#181b20',
                borderColor: '#2e323b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />

            {/* Line with Gradient Fill */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-lime-500)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}