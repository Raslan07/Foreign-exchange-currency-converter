import styles from './FavoritesPage.module.css';

export default function FavoritesPage({ favorites = [] }) {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Pinned pairs</h2>

      {favorites.length === 0 ? (
        <p className={styles.text}>No pinned pairs yet. Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((favorite) => (
            <li key={favorite.id ?? favorite.code ?? favorite.pair ?? Math.random()} className={styles.item}>
              {favorite.label ?? favorite.pair ?? 'Pinned pair'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}