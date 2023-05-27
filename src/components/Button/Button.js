import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

const Button = ({ href, text, ...rest }) => {
  if (href) {
    return (
      <div className={styles.link}>
        <Link href={href}>{text}</Link>
      </div>
    );
  }

  return (
    <button className={styles.button} type="button" {...rest}>
      {text}
    </button>
  );
};

export default Button;
