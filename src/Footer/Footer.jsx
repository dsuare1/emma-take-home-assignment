import { Typography } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import style from './Footer.module.css';

const { Link } = Typography;

const Footer = () => (
  <div className={style.footerWrapper}>
    <CopyrightOutlined />
    <Link href="https://derricksuarez.com" target="_blank" className={style.footerLink}>
      Derrick Suarez
    </Link>
    2021
  </div>
);

export default Footer;
