'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import IconHamburgerMenu from '@/svg/IconHamburgerMenu';
import IconIconSearch from '@/svg/IconIconSearch';

import Container from '../Container/Container';
import Menu from '../Menu/Menu';

import styles from './Header.module.scss';

const Header = ({ menu, usefullLinks, siteName }) => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
              <strong>{siteName}</strong>
            </Link>
          </div>
          <button
            type="button"
            className={`${styles.menu} ${styles.search}`}
            onClick={() => router.push('/search')}
          >
            <p>Search</p>
            <IconIconSearch />
          </button>
        </div>
      </Container>
      <Menu
        show={showNav}
        menu={menu}
        usefullLinks={usefullLinks}
        handleClose={() => setShowNav(false)}
      />
    </header>
  );
};

export default Header;
