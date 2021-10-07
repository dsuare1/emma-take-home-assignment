function getOrInitializeFavoritesArray() {
  let favorites = JSON.parse(localStorage.getItem('gistr-favorites'));

  if (typeof favorites === 'undefined' || favorites === null) {
    favorites = [];
  }

  return favorites;
}

function getOrInitializeFavoritesIdHash() {
  let favoritesIdHash = JSON.parse(localStorage.getItem('gistr-favorites-id-hash'));

  if (typeof favoritesIdHash === 'undefined' || favoritesIdHash === null) {
    favoritesIdHash = {};
  }

  return favoritesIdHash;
}

export function addToLocalStorage(gist) {
  const favorites = getOrInitializeFavoritesArray();
  const favoritesIdHash = getOrInitializeFavoritesIdHash();

  const updatedFavorites = favorites.concat(gist);
  const updatedFavoritesIdHash = {
    ...favoritesIdHash,
    [gist.id]: true,
  }

  localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
  localStorage.setItem('gistr-favorites-id-hash', JSON.stringify(updatedFavoritesIdHash));
}

export function removeFromLocalStorage(id) {
  const favorites = getOrInitializeFavoritesArray();
  const favoritesIdHash = getOrInitializeFavoritesIdHash();

  const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
  const { [id]: _, ...remainingFavoriteIds } = favoritesIdHash;

  localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
  localStorage.setItem('gistr-favorites-id-hash', JSON.stringify(remainingFavoriteIds));
}

export function loadFavoritesFromLocalStorage() {
  const favoritesArray = getOrInitializeFavoritesArray();
  const favoritesIdHash = getOrInitializeFavoritesIdHash();

  return {
    favoritesArray,
    favoritesIdHash,
  }
}
