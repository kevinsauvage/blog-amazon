import Link from 'next/link';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import NavbarCategories from '../NavbarCategories/NavbarCategories';

import styles from './Header.module.scss';

const Header = ({ categories }) => (
  <header className={styles.header}>
    <Container>
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.logo}>
          <Link href="/">
            <strong>Bloglytics</strong>
          </Link>
        </div>
        <NavbarCategories categories={categories} />
      </div>
    </Container>
  </header>
);

export default Header;
