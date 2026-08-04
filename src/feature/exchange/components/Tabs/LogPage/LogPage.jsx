import styles from './LogPage.module.css';

export default function LogPage({ logEntries = [] }) {
  return (
    <section className={styles.page}>
      {logEntries.length === 0 ? (
        <>
          <h2 className={styles.title}>No conversions logged yet</h2>
          <p className={styles.text}>Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.</p>
        </>
      ) : (
        <ul className={styles.list}>
          {logEntries.map((entry, index) => (
            <li key={entry.id ?? entry.createdAt ?? `${entry.label ?? entry.pair ?? 'logged'}-${index}`} className={styles.item}>
              {entry.label ?? entry.pair ?? 'Logged conversion'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}