
import { useState } from 'react'
import StatCard from './StatCard'
import TimeRangeSelector from './TimeRangeSelector'
import RateChart from './RateChart'
import styles from './ExchangeHistory.module.css'

export default function ExchangeHistory({ sendCurrency, receiveCurrency }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M')

  return (
    <div className={styles.parentContainer}>
      <div className={styles.historyBar}>
        <StatCard />
        <TimeRangeSelector
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
        />
      </div>
      <RateChart
        baseCurrency={sendCurrency}
        quoteCurrency={receiveCurrency}
        timeframe={selectedTimeframe}
      />
    </div>
  )
}
