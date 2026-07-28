
import StatCard from './StatCard'
import TimeRangeSelector from './TimeRangeSelector'
import ExchangeChart from './ExchangeChart'
import styles from './ExchangeHistory.module.css'
export default function ExchangeHistory() {
  return (
    <div className={ styles.parentContainer}>
          
      <div className={styles.historyBar}>
            <StatCard />
            <TimeRangeSelector/>
      </div>
            <ExchangeChart/>
    </div>
  )
}
