import { configureStore } from '@reduxjs/toolkit';
import favorites from './reducers/favorites';

export default configureStore({
  reducer: favorites,
});
