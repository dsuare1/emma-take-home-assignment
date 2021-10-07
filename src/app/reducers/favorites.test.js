import types from '../actions/types';
import favoritesReducer, { initialState } from './favorites';
import mockGist from '../../testHelpers/mocks/mockGist';
import { mockGistsArray, mockFavoritesIdHash, idToRemove } from '../../testHelpers/mocks/mockGistsArray';

test('unknown action should return initial state', () => {
  const unknownAction = {
    type: 'unknown',
  };

  const result = favoritesReducer(initialState, unknownAction);
  expect(result).toEqual(initialState);
  expect(result.favorites.length).toEqual(0);
  expect(Object.keys(result.favoritesIdHash).length).toEqual(0);
  expect(result.isLoading).toEqual(false);
  expect(result.hasError).toEqual(false);
});

test('given an initial empty state, adding a favorite should return a favorites array with 1 member, and a favoritesIdHash with 1 key', () => {
  const action = {
    type: types.ADD_FAVORITE,
    gist: mockGist,
  };

  const result = favoritesReducer(initialState, action);
  expect(result.favorites.length).toEqual(1);
  expect(Object.keys(result.favoritesIdHash).length).toEqual(1);
  expect(result.favorites[0]).toEqual(mockGist);
  expect(Object.keys(result.favoritesIdHash)[0]).toEqual(mockGist.id);
});

test('given an initial state with 3 gists in the favorites array, and 3 ids in the favoritesIdHash, removing 1 should reduce both down to 2', () => {
  const action = {
    type: types.REMOVE_FAVORITE,
    id: idToRemove,
  };

  const initialStateWithThreeFavoritedGists = {
    ...initialState,
    favorites: mockGistsArray,
    favoritesIdHash: mockFavoritesIdHash,
  };

  const result = favoritesReducer(initialStateWithThreeFavoritedGists, action);
  expect(result.favorites.length).toEqual(2);
  expect(Object.keys(result.favoritesIdHash).length).toEqual(2);

  // double check that the id we requested to remove from the hash should be removed
  expect(result.favoritesIdHash[idToRemove]).toEqual(undefined);

  // double check that the gist with the id we requested to remove is gone from the array
  let isFound = false;
  result.favorites.forEach((favorite) => {
    if (favorite.id === idToRemove) {
      isFound = true;
    }
  });
  expect(isFound).toEqual(false);
});
