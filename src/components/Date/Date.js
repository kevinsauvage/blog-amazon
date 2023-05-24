import { formatTimestamp } from '@/utils/date';

import styles from './Date.module.scss';

const Date = ({ date, className = '' }) => (
  <div className={`${styles.date} ${className}`}>{formatTimestamp(date)}</div>
);

export default Date;
