import Container from '../Container/Container';
import Nav from '../Nav/Nav';

import styles from './Footer.module.scss';

const Footer = async ({ usefullLinks, categories, about }) => (
  <footer className={styles.Footer}>
    <Container>
      <div className={styles.top}>
        <div className={styles.about}>
          <p className={styles.title}>About</p>
          <p className={styles.aboutContent}>{about}</p>
        </div>
        <div className={styles.links}>
          <Nav title={usefullLinks?.displayedTitle} variant="column" menu={usefullLinks?.items} />
          <Nav title={categories?.displayedTitle} variant="column" menu={categories?.items} />
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
