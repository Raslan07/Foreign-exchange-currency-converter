import styles from './FavoritesPage.module.css';

export default function EmptyFavoritesPage({ favorites = [] }) {
  return (
    <section className={styles.page}>
      {favorites.length === 0 ? (
        <>
          <h2 className={styles.title}>No pinned pairs yet</h2>
          <h3 className={styles.text}>Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.</h3>
        </>
      ) : (
        <ul className={styles.list}>
          {favorites.map((favorite, index) => (
            <li key={favorite.id ?? favorite.code ?? favorite.pair ?? `${favorite.label ?? 'favorite'}-${index}`} className={styles.item}>
              {favorite.label ?? favorite.pair ?? 'Pinned pair'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
