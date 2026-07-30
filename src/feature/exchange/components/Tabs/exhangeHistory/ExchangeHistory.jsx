
import StatCard from './StatCard'
import TimeRangeSelector from './TimeRangeSelector'
import RateChart from './RateChart'
import styles from './ExchangeHistory.module.css'
export default function ExchangeHistory() {
  return (
    <div className={ styles.parentContainer}>
          
      <div className={styles.historyBar}>
            <StatCard />
            <TimeRangeSelector/>
      </div>
            <RateChart/>
    </div>
  )
}
