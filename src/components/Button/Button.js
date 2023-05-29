/* eslint-disable react/button-has-type */
import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

const Button = ({ href, text, type = 'button', variant = 'primary', className = '', ...rest }) => {
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
      <Link className={`${styles.link}  ${getClass()} ${className}`} href={href}>
        {text}
      </Link>
    );
  }

  return (
    <button className={`${styles.button}  ${getClass()} ${className}`} type={type} {...rest}>
      {text}
    </button>
  );
};

export default Button;
