function getOrInitializeFavoritesArray() {
  // to avoid having to repeat this logic each time, I created this helper method
  let favorites = JSON.parse(localStorage.getItem('gistr-favorites'));

  if (typeof favorites === 'undefined' || favorites === null) {
    favorites = [];
  }

  return favorites;
}

function getOrInitializeFavoritesIdHash() {
  // to avoid having to repeat this logic each time, I created this helper method
  let favoritesIdHash = JSON.parse(localStorage.getItem('gistr-favorites-id-hash'));

  if (typeof favoritesIdHash === 'undefined' || favoritesIdHash === null) {
    favoritesIdHash = {};
  }

  return favoritesIdHash;
}
// the two above methods could probably be combined into one generic method, accepting arguments to
// perform the desired actions; for time's sake, I'll leave it as-is for now

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
