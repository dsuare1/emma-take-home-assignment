import types from '../actions/types';
import { loadFavoritesFromLocalStorage } from '../../helpers/localStorageHelpers';

const initialState = {
  favorites: [],
  favoritesIdHash: {},
  isLoading: false,
  hasError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FAVORITE: {
      const { gist } = action;

      const result = {
        ...state,
        favorites: state.favorites.concat(gist),
        favoritesIdHash: {
          ...state.favoritesIdHash,
          [gist.id]: true,
        }
      }

      debugger;
      return result;
    }

    case types.REMOVE_FAVORITE: {
      const { id } = action;

      const { [id]: _, ...remainingFavoriteIds } = state.favoritesIdHash;

      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id !== id),
        favoritesIdHash: remainingFavoriteIds,
      }
    }

    case types.LOAD_FAVORITES_FROM_LOCAL_STORAGE: {
      const favoritesInLocalStorage = loadFavoritesFromLocalStorage();

      return { ...state, favorites: favoritesInLocalStorage };
    }

    default:
      return initialState;
  }
}
