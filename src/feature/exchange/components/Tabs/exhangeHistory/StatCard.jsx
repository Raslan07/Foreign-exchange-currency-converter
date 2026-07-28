
import styles from './ExchangeHistory.module.css'

export default function StatCard() {
      

  const stats = [
    { label: 'OPEN', value: '0.8516', type: 'neutral' },
    { label: 'LAST', value: '0.8530', type: 'neutral' },
    { label: 'CHANGE', value: '+0.0014', type: 'positive' },
    { label: '% CHANGE', value: '▲ +0.16%', type: 'positive' },
  ];

 
  return (

    <div className={styles.container}>
      {/* Stat Cards Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span
              className={`${styles.statValue} ${
                stat.type === 'positive' ? styles.positiveValue : ''
              }`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Timeframe Selector Controls
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
      </div> */}
    </div>
  )
}
