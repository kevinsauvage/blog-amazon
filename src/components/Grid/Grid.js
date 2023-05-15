import styles from './Grid.module.scss';

const Grid = ({ children, ...rest }) => (
  <ul className={styles.grid} {...rest}>
    {children}
  </ul>
);

export default Grid;
