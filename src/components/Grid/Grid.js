import { Children } from 'react';

import styles from './Grid.module.scss';

const Grid = ({ children, ...rest }) => (
  <ul className={styles.grid} {...rest}>
    {Children.toArray(children.map((child) => <li>{child}</li>))}
  </ul>
);

export default Grid;
