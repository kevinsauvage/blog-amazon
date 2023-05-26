import IconTimeOutline from '@/svg/IconTimeOutline';
import { formatTimestamp } from '@/utils/date';

import styles from './Date.module.scss';

const Date = ({ date, className = '' }) => (
  <div className={`${styles.date} ${className}`}>
    <IconTimeOutline /> {formatTimestamp(date)}
  </div>
);

export default Date;
