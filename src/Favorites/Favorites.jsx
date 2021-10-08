import { Spin, Typography } from 'antd';
import { useSelector } from 'react-redux';
import ResultCard from '../Search/Results/ResultCard';
import { loadFavoritesFromLocalStorage} from '../helpers/localStorageHelpers';
import style from './Favorites.module.css';

const { Text, Title } = Typography;

const Favorites = () => {
  const { hasError, isLoading } = useSelector((state) => state);
  const { favoritesArray } = loadFavoritesFromLocalStorage();

  if (isLoading) {
    return <Spin />;
  }

  // this is a good way to handle network errors (if were fetching favorites from a REST
  // call, for example)
  if (hasError) {
    return <Text type="danger">Oops! We've encountered an error</Text>
  }

  return (
    <div className={style.favoritesWrapper}>
      <Title level={4}>Favorites</Title>
      {favoritesArray.map((favorite) => <ResultCard key={favorite.id} gist={favorite} colSpan={24} />)}
    </div>
  );
};

export default Favorites;
