'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconClose from '@/svg/IconClose';
import IconHamburgerMenu from '@/svg/IconHamburgerMenu';
import IconSearch from '@/svg/IconSearch';

import Container from '../Container/Container';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import styles from './Header.module.scss';

const Header = ({ categories }) => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <button
            type="button"
            className={styles.menu}
            onClick={() => setShowNav((previous) => !previous)}
          >
            {showNav ? <IconClose /> : <IconHamburgerMenu />}
            <p>Menu</p>
          </button>
          <div className={styles.logo}>
            <Link href="/">
              <strong>Bloglytics</strong>
            </Link>
          </div>
          <Link href="/search" className={styles.search}>
            <p>Search</p>
            <IconSearch />
          </Link>
        </div>
      </Container>
      {showNav && <DropdownMenu categories={categories} handleClose={() => setShowNav(false)} />}
    </header>
  );
};

export default Header;
