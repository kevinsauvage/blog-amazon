import { Children } from 'react';

import styles from './Grid.module.scss';

// Variant 1 - From 2 items to illimited
// Variant 2 - From 3 items to illimited
// Variant 3 - From 4 items to 8 items
// Variant 4 - 4 items
// Variant 5 - 3 items
// Variant 6 - 5 items

const Grid = ({ children, variant = '1', ...rest }) => {
  const getClass = () => {
    switch (variant) {
      case '1': {
        return styles.variant1;
      }
      case '2': {
        return styles.variant2;
      }
      case '3': {
        return styles.variant3;
      }
      case '4': {
        return styles.variant4;
      }
      case '5': {
        return styles.variant5;
      }
      case '6': {
        return styles.variant6;
      }
      default: {
        return styles.variant1;
      }
    }
  };

  return (
    <ul className={`${styles.grid} ${getClass()}`} {...rest}>
      {Children.toArray(children.map((child) => <li>{child}</li>))}
    </ul>
  );
};

export default Grid;
