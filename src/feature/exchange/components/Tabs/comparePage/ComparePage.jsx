import styles from './ComparePage.module.css';

export default function ComparePage() {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>No comparison available</h2>
      <h3 className={styles.text}>Enter an amount in Send above to see what your money is worth in other currencies.</h3>
    </section>
  );
}