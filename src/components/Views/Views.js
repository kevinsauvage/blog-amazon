import IconEyeOutline from '@/svg/IconEyeOutline';

import styles from './Views.module.scss';

const Views = ({ views, className }) => (
  <span className={`${styles.views} ${className}`}>
    <IconEyeOutline /> {views} {views > 1 ? 'Views' : 'View'}
  </span>
);

export default Views;
