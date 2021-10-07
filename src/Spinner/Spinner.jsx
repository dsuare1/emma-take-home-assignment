import { Spin } from 'antd';
import style from './Spinner.module.css';

const Spinner = () => (
  <div className={style.spinContainer}>
    <Spin size="large" />
  </div>
);

export default Spinner;
