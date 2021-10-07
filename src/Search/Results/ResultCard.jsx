import { Avatar, Card, Col, Tooltip, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommentOutlined, StarOutlined } from '@ant-design/icons';
import { addFavorite, removeFavorite } from '../../app/actions/favorites';
import { loadFavoritesFromLocalStorage} from '../../helpers/localStorageHelpers';
import style from './ResultCard.module.css';

const { Meta } = Card;
const { Link, Text } = Typography;

const ResultCard = ({ gist, colSpan }) => {
  const { comments, created_at, description, files, id, owner, html_url: gist_url } = gist;
  const { html_url: profile_url, login } = owner;

  const { favoritesIdHash } = useSelector((state) => state);
  const { favoritesIdHash: idHashInLocalStorage } = loadFavoritesFromLocalStorage();
  const mergedIdHash = {
    ...favoritesIdHash,
    ...idHashInLocalStorage,
  };

  const dispatch = useDispatch();

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
          <div className={style.commentsIconWrapper}>
            {comments}
            <CommentOutlined className={style.commentsIcon}/>
          </div>,
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

export default ResultCard;
