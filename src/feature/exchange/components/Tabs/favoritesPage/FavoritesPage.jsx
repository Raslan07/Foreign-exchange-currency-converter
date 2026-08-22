import EmptyFavoritesPage from "./EmptyFavoritesPage";
export default function FavoritesPage({ favorites = [] , onToggleFavorite }) {
  return (
    <>
      {favorites.length === 0 ? (
        <EmptyFavoritesPage favorites={favorites} />
      ) : null}
    </>
  );
}
