import styles from './LogPage.module.css';

export default function EmptyLogPage( ) {
    return (
        <section className={styles.page}>
      
        <>
          <h2 className={styles.title}>No conversions logged yet</h2>
          <h3 className={styles.text}>Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.</h3>
        </>
    </section>
    )
}