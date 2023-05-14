import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.Footer}>
    <p className={styles.Footer__copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
  </footer>
);

export default Footer;
