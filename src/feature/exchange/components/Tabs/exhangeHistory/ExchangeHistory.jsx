import HistoryTabs from './HistoryTabs'
import StatCard from './StatCard'
import TimeRangeSelector from './TimeRangeSelector'
import ExchangeChart from './ExchangeChart'
export default function ExchangeHistory() {
  return (
      <div>
          <HistoryTabs>
            <StatCard />
            <TimeRangeSelector/>
            <ExchangeChart/>
          </HistoryTabs>
    </div>
  )
}
