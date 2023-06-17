'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconHamburgerMenu from '@/svg/IconHamburgerMenu';
import IconSearch from '@/svg/IconSearch';

import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import Nav from '../Nav/Nav';

import styles from './Header.module.scss';

const Header = ({ menu }) => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  useEffect(() => {
    document.querySelector('body').style.overflow = showNav ? 'hidden' : 'visible';
  }, [showNav]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <button
            type="button"
            className={styles.menu}
            onClick={() => setShowNav((previous) => !previous)}
          >
            <IconHamburgerMenu />
            <p>Menu</p>
          </button>
          <div className={styles.logo}>
            <Link href="/">
              <strong>Bloglytics</strong>
            </Link>
          </div>

          <div className={styles.navigation}>
            <Nav variant="row" menu={menu} />
          </div>
          <Link href="/search" className={styles.search}>
            <p>Search</p>
            <IconSearch />
          </Link>
        </div>
      </Container>
      <Menu show={showNav} menu={menu} handleClose={() => setShowNav(false)} />
    </header>
  );
};

export default Header;
