import Container from '../Container/Container';
import Nav from '../Nav/Nav';

import styles from './Footer.module.scss';

const Footer = async ({ usefullLinks, categories }) => (
  <footer className={styles.Footer}>
    <Container>
      <div className={styles.top}>
        <div className={styles.about}>
          <p>About</p>
          <p className={styles.aboutContent}>
            Hello there! We&apos;re delighted to have you visit [Your Blog Name]. This blog is a
            space where we share thoughts, insights, and experiences on a wide range of topics.
            Whether you&apos;re seeking inspiration, information, or simply a moment of relaxation,
            you&apos;ve come to the right place.
          </p>
        </div>
        <div className={styles.links}>
          <Nav
            title={usefullLinks.displayedTitle}
            variant="column"
            menu={usefullLinks?.menuItemsFirstLevels?.data}
          />
          <Nav
            title={categories.displayedTitle}
            variant="column"
            menu={categories?.menuItemsFirstLevels?.data}
          />
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
