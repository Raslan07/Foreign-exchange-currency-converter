import styles from './ComparePage.module.css';

export default function ComparePage() {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Multi-currency</h2>
      <p className={styles.text}>No comparison available. Enter an amount in Send above to see what your money is worth in other currencies.</p>
    </section>
  );
}