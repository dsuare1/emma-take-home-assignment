import PropTypes from 'prop-types';
import { Row } from 'antd';
import ResultCard from './ResultCard';
import Spinner from '../../Spinner/Spinner';
import EmptyState from '../../EmptyState/EmptyState';
import { gist } from '../../constants/propTypesModels';
import style from './SearchResults.module.css';

const SearchResults = ({ gists, isLoading }) => {
  if (isLoading) {
    return <Spinner />
  }

  if (!gists.length) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className={style.resultsWrapper}>
      <Row gutter={[16,16]}>
        {gists.map((gist) => <ResultCard key={gist.id} gist={gist} colSpan={12} />)}
      </Row>
    </div>
  );
};

SearchResults.propTypes = {
  gists: PropTypes.arrayOf(
    PropTypes.shape(gist)
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchResults;
