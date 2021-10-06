function getOrInitializeFavoritesArray() {
  let favorites = JSON.parse(localStorage.getItem('gistr-favorites'));

  if (typeof favorites === 'undefined' || favorites === null) {
    favorites = [];
  }

  return favorites;
}

export function addToLocalStorage(gist) {
  const favorites = getOrInitializeFavoritesArray();
  const updatedFavorites = favorites.concat(gist);

  localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));

  // let updatedFavorites;
  //
  // if (typeof favorites === 'undefined' || favorites === null) {
  //   updatedFavorites = [gist];
  //
  //   localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
  //   return;
  // }
  //
  // updatedFavorites = favorites.concat(gist);
  //
  // localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
}

export function removeFromLocalStorage(id) {
  const favorites = getOrInitializeFavoritesArray();
  const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);

  localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
  // const favorites = JSON.parse(localStorage.getItem('gistr-favorites'));
  // const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
  //
  // localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
}

export function loadFavoritesFromLocalStorage() {
  return getOrInitializeFavoritesArray();
}
