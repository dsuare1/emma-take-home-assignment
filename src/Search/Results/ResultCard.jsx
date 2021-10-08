import PropTypes from 'prop-types';
import { Avatar, Card, Col, Tooltip, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommentOutlined, StarOutlined } from '@ant-design/icons';
import { addFavorite, removeFavorite } from '../../app/actions/favorites';
import { loadFavoritesFromLocalStorage} from '../../helpers/localStorageHelpers';
import style from './ResultCard.module.css';
import {gist} from '../../constants/propTypesModels';

const { Meta } = Card;
const { Link, Text } = Typography;

const ResultCard = ({ gist, colSpan }) => {
  const { comments, created_at, description, files, id, owner, html_url: gist_url } = gist;
  const { html_url: profile_url, login } = owner;

  const { favoritesIdHash } = useSelector((state) => state);
  const { favoritesIdHash: idHashInLocalStorage } = loadFavoritesFromLocalStorage();
  // we want to make sure the state is an accurate reflection of not only what could be in the redux state
  // from user interaction, but also previously-persisted favorites in localStorage
  const mergedIdHash = {
    ...favoritesIdHash,
    ...idHashInLocalStorage,
  };

  const dispatch = useDispatch();

  // the merged favoritesIdHash (from redux state) and idHashInLocalStorage serves as a quick lookup
  // when rendering a card so we can efficiently determine whether it is a favorite or not, and correctly
  // render the card, not only in the search results, but also in the favorites; the hash lookup is
  // far more performant (O(1)) than doing an array lookup (O(n))
  const isFavorite = typeof mergedIdHash[id] !== 'undefined';

  const onClickFavorite = (id, gist) => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
      return;
    }

    dispatch(addFavorite(gist));
  };

  let gistTitle = Object.keys(files)[0];
  if (typeof gistTitle === 'undefined' || gistTitle === null || gistTitle === '') {
    gistTitle = '(no title provided)';
  }

  // I find separating these types of elements out easier for maintenance; if they're placed within
  // the main 'return ( )' component statement, it gets noisy
  const cardTitle = (
    <>
      <div className={style.usernameLink}>
        <Link href={profile_url} target="_blank">
          {login}
        </Link>
      </div>
      <div>
        <Link href={gist_url} target="_blank">
          <Tooltip placement="top" title="View on GitHub">
            <LinkOutlined />
          </Tooltip>
        </Link>
        <Text code ellipsis>{gistTitle}</Text>
      </div>
    </>
  );

  // same as above
  const cardDescription = (
    <div className={style.descriptionContainer}>
      <Text type="secondary" ellipsis>
        {description === ''
          ? '(no description provided)'
          : description
        }
      </Text>
      <div className={style.createdDate}>
        <Text type="secondary">Created: {created_at}</Text>
      </div>
    </div>
  )

  return (
    <Col span={colSpan}>
      <Card
        key={id}
        className={style.card}
        actions={[
          <Tooltip placement="top" title="Comment viewing coming soon!">
            {comments}
            <CommentOutlined className={style.commentsIcon}/>
          </Tooltip>,
          <StarOutlined className={isFavorite ? style.starIconFavorited : null} onClick={() => onClickFavorite(id, gist)} />,
        ]}
      >
        <Meta
          avatar={<Avatar src={owner.avatar_url} />}
          title={cardTitle}
          description={cardDescription}
        />
      </Card>
    </Col>
  );
};

ResultCard.propTypes = {
  gist: PropTypes.shape(gist),
  colSpan: PropTypes.number.isRequired,
};

export default ResultCard;
