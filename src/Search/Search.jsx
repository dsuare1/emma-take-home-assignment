import { useState } from 'react';
import SearchForm from './Form/SearchForm';
import SearchResults from './Results/SearchResults';
import style from './Search.module.css';

const Search = () => {
  const [gists, setGists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={style.searchWrapper}>
      <SearchForm setGists={setGists} renderClearButton={!!gists.length} setIsLoading={setIsLoading} />
      <SearchResults isLoading={isLoading} gists={gists} />
    </div>
  );
}

export default Search;
