import Link from 'next/link';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';

import styles from './Header.module.scss';

const Header = ({ categories }) => (
  <header className={styles.header}>
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <strong>Bloglytics</strong>
          </Link>
        </div>
        <Navbar categories={categories} />
      </div>
    </Container>
  </header>
);

export default Header;
