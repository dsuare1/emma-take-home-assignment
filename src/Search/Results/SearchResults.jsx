import { Row } from 'antd';
import PropTypes from 'prop-types';
import ResultCard from './ResultCard';
import { gistsArray } from '../../constants/propTypesModels';
import style from './SearchResults.module.css';

const SearchResults = ({ gists }) => {
  if (!gists.length) {
    return (
      <p>:( search to find more gists</p>
    );
  }

  return (
    <div className={style.resultsWrapper}>
      <Row gutter={[16,16]}>
        {gists.map((gist) => <ResultCard key={gist.id} gist={gist} />)}
      </Row>
    </div>
  );
};

SearchResults.propTypes = {
  gists: PropTypes.arrayOf(
    PropTypes.shape(gistsArray)
  ).isRequired,
};

export default SearchResults;
