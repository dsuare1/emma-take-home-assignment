import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import style from './Header.module.css';

const { Text, Title } = Typography;

const Header = () => (
  <div className={style.headerWrapper}>
      <GithubOutlined className={style.headerIcon} />
      <Title level={3}>Gistr</Title>
      <Text type="secondary">Fetch & favorite GitHub users' gists</Text>
  </div>
);

export default Header;
