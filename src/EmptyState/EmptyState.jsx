import { Empty } from 'antd';
import style from './EmptyState.module.css';

const EmptyState = () => (
  <Empty
    className={style.emptyState}
    description="There aren't any results for your current search."
  />
);

export default EmptyState;
