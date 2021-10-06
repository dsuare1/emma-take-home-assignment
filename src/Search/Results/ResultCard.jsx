import { useEffect, useState } from 'react';
import { Avatar, Card, Col, Typography } from 'antd';
import { CommentOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons';

const { Meta } = Card;
const { Link } = Typography;

const ResultCard = ({ gist }) => {
  const { description, id, owner, html_url } = gist;

  const [isFavorite, setIsFavorite] = useState(false);

  const cardTitle = (
    <Link href={html_url} target="_blank">
      Gist {id}
    </Link>
  );

  const cardActions = [
    <CommentOutlined disabled />,
  ];

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorites = localStorage.getItem('gistr-favorites');

    if (typeof favorites === 'undefined' || favorites === null || favorites === '') {
      localStorage.setItem('gistr-favorites', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('gistr-favorites'));

    let updatedFavorites = [];
    if (isFavorite) {
      updatedFavorites = favorites.concat(gist);
    } else {
      updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    }

    localStorage.setItem('gistr-favorites', JSON.stringify(updatedFavorites));
  }, [isFavorite]);

  if (isFavorite) {
    cardActions.push(<StarTwoTone twoToneColor="#E2EF70" onClick={onClickFavorite} />);
  } else {
    cardActions.push(<StarOutlined onClick={onClickFavorite} />);
  }

  return (
    <Col span={12}>
      <Card
        key={id}
        actions={cardActions}
      >
        <Meta
          avatar={<Avatar src={owner.avatar_url} />}
          title={cardTitle}
          description={description !== '' ? description : '(no description provided)'}
        />
      </Card>
    </Col>
  );
};

export default ResultCard;
