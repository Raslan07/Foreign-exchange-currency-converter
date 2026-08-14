import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getHistoricalRates } from "../../services/apiCurrency";
import styles from "./RateChart.module.css";

const TIMEFRAME_DAYS = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  "5Y": 365 * 5,
};

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatAxisDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function RateChart({ baseCurrency, quoteCurrency, timeframe }) {
  const [chartData, setChartData] = useState([]);
  const [latestRate, setLatestRate] = useState(null);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      const days = TIMEFRAME_DAYS[timeframe] ?? TIMEFRAME_DAYS["1M"];
      const today = new Date();
      const start = new Date(today);

      start.setDate(today.getDate() - days + 1);

      const from = toIsoDate(start);
      const to = toIsoDate(today);

      try {
        setChartError(null);
        const response = await getHistoricalRates(
          baseCurrency,
          quoteCurrency,
          from,
          to,
        );
        const rawRates = response?.rates ?? {};

        const normalized = Object.entries(rawRates)
          .map(([date, dateRate]) => {
            const value = Number(
              dateRate?.[quoteCurrency] ?? dateRate?.[baseCurrency] ?? 1,
            );

            return {
              date: formatAxisDate(date),
              value,
            };
          })
          .sort(
            (left, right) =>
              new Date(left.date).getTime() - new Date(right.date).getTime(),
          );

        setChartData(normalized);

        const finalValue = normalized.at(-1)?.value;
        setLatestRate(finalValue ?? null);
      } catch (caughtError) {
        setChartError(caughtError);
        setChartData([]);
        setLatestRate(null);
      }
    }

    if (baseCurrency && quoteCurrency) {
      fetchChartData();
    }
  }, [baseCurrency, quoteCurrency, timeframe]);

  const pairTitle = `${baseCurrency}/${quoteCurrency}`;

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.pairTitle}>{pairTitle}</span>
        <span className={styles.timestamp}>
          {chartError
            ? "History unavailable"
            : `${latestRate ?? "--"} · ${timeframe}`}
        </span>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-lime-500)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="70%"
                  stopColor="var(--color-lime-500)"
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#525866", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              dataKey="value"
              domain={["auto", "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#525866", fontSize: 11 }}
              orientation="left"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#181b20",
                borderColor: "#2e323b",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
              }}
            />

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
