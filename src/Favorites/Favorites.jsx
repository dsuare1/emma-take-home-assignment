import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin, Typography } from 'antd';
import { useSelector } from 'react-redux';
import ResultCard from '../Search/Results/ResultCard';
import { loadFavoritesFromLocalStorage } from '../app/actions/favorites';
import style from './Favorites.module.css';

const Favorites = () => {
  const { favorites, hasError, isLoading } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('inside effect');
    dispatch(loadFavoritesFromLocalStorage());
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if (hasError) {
    return <Typography type="danger">Oops! We've encountered an error</Typography>
  }

  return (
    <div className={style.favoritesWrapper}>
      {favorites.map((favorite) => <ResultCard key={favorite.id} gist={favorite} />)}
      <p>favorites</p>
    </div>
  );
};

export default Favorites;
