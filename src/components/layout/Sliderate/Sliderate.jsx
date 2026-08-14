import styles from "./Sliderate.module.css";

const tickerItems = [
  { pair: "USD/JPY", rate: "157.91", change: "0.04", direction: "decrease" },
  { pair: "EUR/USD", rate: "1.0843", change: "0.12", direction: "increase" },
  { pair: "GBP/USD", rate: "1.2684", change: "0.19", direction: "increase" },
  { pair: "AUD/USD", rate: "0.6641", change: "0.06", direction: "decrease" },
  { pair: "USD/CAD", rate: "1.3689", change: "0.09", direction: "increase" },
  { pair: "USD/CHF", rate: "0.8987", change: "0.03", direction: "decrease" },
  { pair: "EUR/GBP", rate: "0.8557", change: "0.11", direction: "increase" },
  { pair: "USD/CNY", rate: "7.2591", change: "0.02", direction: "increase" },
];

export default function Sliderate() {
  return (
    <div className={styles.slider}>
      <div className={styles.livePreview}>
        <span className={styles.liveDot}></span>
        LIVE MARKETS
      </div>
      <div className={styles.slides}>
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={`${item.pair}-${index}`} className={styles.slide}>
            <span className={styles.type}>{item.pair}</span>
            <span className={styles.amount}>{item.rate}</span>
            <span
              className={`${styles.rate} ${item.direction === "increase" ? styles.increase : styles.decrease}`}
            >
              {item.direction === "increase" ? "▲" : "▼"}
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
