import styles from './ExchangeHistory.module.css'
import { useState } from 'react'



export default function TimeRangeSelector() {
     const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];
     const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  return (
    // Timeframe Selector Controls
      <div className={styles.timeframeSelector}>
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            type="button"
            onClick={() => setSelectedTimeframe(timeframe)}
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
