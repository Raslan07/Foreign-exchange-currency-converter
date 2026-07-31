import styles from './LogPage.module.css';

export default function LogPage({ logEntries = [] }) {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Conversion log</h2>

      {logEntries.length === 0 ? (
        <p className={styles.text}>No conversions logged yet. Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.</p>
      ) : (
        <ul className={styles.list}>
          {logEntries.map((entry) => (
            <li key={entry.id ?? entry.createdAt ?? Math.random()} className={styles.item}>
              {entry.label ?? entry.pair ?? 'Logged conversion'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}