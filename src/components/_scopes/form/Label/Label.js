import styles from './Label.module.scss';

const Label = ({ children, ...rest }) => (
  <label className={styles.label} {...rest}>
    {children}
  </label>
);

export default Label;
