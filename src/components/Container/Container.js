import styles from './Container.module.scss';

const Container = ({ children, classname }) => (
  <div className={`${styles.container} ${classname}`}>{children}</div>
);

export default Container;
