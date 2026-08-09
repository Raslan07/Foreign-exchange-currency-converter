import styles from './ExchangeHistory.module.css'

export default function TimeRangeSelector({ selectedTimeframe, onTimeframeChange }) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  return (
    <div className={styles.timeframeSelector}>
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          type="button"
          onClick={() => onTimeframeChange(timeframe)}
          className={`${styles.timeframeBtn} ${
            selectedTimeframe === timeframe ? styles.activeTimeframe : ''
          }`}
        >
          {timeframe}
        </button>
      ))}
    </div>
  )
}
