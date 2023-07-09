import IconTimeOutline from '@/svg/IconTimeOutline';
import { formatTimestamp } from '@/utils/date';

import styles from './Date.module.scss';

const Date = ({ date, className = '', variant, includeTime }) => {
  const getStyles = () => {
    if (variant === 'light') return styles.light;
  };

  return (
    <div className={`${styles.date} ${className} ${getStyles()}`}>
      <IconTimeOutline /> {formatTimestamp(date, includeTime)}
    </div>
  );
};

export default Date;
