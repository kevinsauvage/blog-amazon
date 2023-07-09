import IconEyeOutline from '@/svg/IconEyeOutline';

import styles from './Views.module.scss';

const Views = ({ views = '0', className, variant }) => {
  const getStyles = () => {
    if (variant === 'light') return styles.light;
  };
  return (
    <span className={`${styles.views} ${className} ${getStyles()}`}>
      <IconEyeOutline /> &nbsp;{views === null ? 0 : views} {views > 1 ? 'Views' : 'View'}
    </span>
  );
};

export default Views;
