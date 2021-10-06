import { useEffect, useState } from 'react';
import { Button } from 'antd';
import ResultCard from '../Search/Results/ResultCard';
import style from './Favorites.module.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('gistr-favorites'));

    setFavorites(localStorageFavorites);
  }, []);

  return (
    <div className={style.favoritesWrapper}>
      {favorites.map((favorite) => <ResultCard key={favorite.id} gist={favorite} />)}
    </div>
  );
};

export default Favorites;
