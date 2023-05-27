import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

const Button = ({ href, text, variant = 'primary', ...rest }) => {
  const getClass = () => {
    switch (variant) {
      case 'primary': {
        return styles.primary;
      }
      case 'secondary': {
        return styles.secondary;
      }
      default: {
        return styles.primary;
      }
    }
  };
  if (href) {
    return (
      <Link className={`${styles.link} ${getClass()}`} href={href}>
        {text}
      </Link>
    );
  }

  return (
    <button className={`${styles.button} ${getClass()}`} type="button" {...rest}>
      {text}
    </button>
  );
};

export default Button;
