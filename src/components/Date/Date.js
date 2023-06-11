import IconTimeOutline from '@/svg/IconTimeOutline';
import { formatTimestamp } from '@/utils/date';

import styles from './Date.module.scss';

const Date = ({ date, className = '', variant }) => {
  const getStyles = () => {
    if (variant === 'light') return styles.light;
  };

  return (
    <div className={`${styles.date} ${className} ${getStyles()}`}>
      <IconTimeOutline /> {formatTimestamp(date)}
    </div>
  );
};

export default Date;
