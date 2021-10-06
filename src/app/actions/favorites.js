import types from './types';
import { addToLocalStorage, removeFromLocalStorage } from '../../helpers/localStorageHelpers';

export function loadFavoritesFromLocalStorage() {
  return {
    type: types.LOAD_FAVORITES_FROM_LOCAL_STORAGE,
  }
}

export function addFavorite(gist) {
  addToLocalStorage(gist);

  return {
    type: types.ADD_FAVORITE,
    gist,
  }
}

export function removeFavorite(id) {
  removeFromLocalStorage(id);

  return {
    type: types.REMOVE_FAVORITE,
    id,
  }
}
