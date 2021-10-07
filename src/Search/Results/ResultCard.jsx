import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Col, Typography } from 'antd';
import { CommentOutlined, StarOutlined } from '@ant-design/icons';
import { addFavorite, removeFavorite } from '../../app/actions/favorites';
import { loadFavoritesFromLocalStorage} from '../../helpers/localStorageHelpers';
import style from './ResultCard.module.css';

const { Meta } = Card;
const { Link } = Typography;

const ResultCard = ({ gist }) => {
  const { description, id, owner, html_url } = gist;

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

  return (
    <Col span={12}>
      <Card
        key={id}
        actions={[
          <CommentOutlined />,
          <StarOutlined className={isFavorite ? style.starIconFavorited : null} onClick={() => onClickFavorite(id, gist)} />,
        ]}
      >
        <Meta
          avatar={<Avatar src={owner.avatar_url} />}
          title={(
            <Link href={html_url} target="_blank">
              Gist {id}
            </Link>
          )}
          description={description !== '' ? description : '(no description provided)'}
        />
      </Card>
    </Col>
  );
};

export default ResultCard;
