import IconEyeOutline from '@/svg/IconEyeOutline';

import styles from './Views.module.scss';

const Views = ({ views, className, variant }) => {
  const getStyles = () => {
    if (variant === 'light') return styles.light;
  };
  return (
    <span className={`${styles.views} ${className} ${getStyles()}`}>
      <IconEyeOutline /> {views} {views > 1 ? 'Views' : 'View'}
    </span>
  );
};

export default Views;
