import styles from './Loader.module.scss';

const Loader = ({ width, height }) => (
  <div style={{ height, width }}>
    <div class={styles.loader}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
