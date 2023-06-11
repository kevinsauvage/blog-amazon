import { useRef } from 'react';

import useOnClickOutside from '@/hooks/useClickOutside';
import IconClose from '@/svg/IconClose';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import NavCategories from '../NavCategories/NavCategories';
import NavItem from '../NavItem/NavItem';

import styles from './Menu.module.scss';

const navItems = [
  { href: '/', id: 1, label: 'Home' },
  { href: '/contact', id: 2, label: 'Contact' },
  { href: '/about', id: 4, label: 'About' },
];

const DropdownMenu = ({ categories, handleClose, show }) => {
  const menu = useRef();

  useOnClickOutside(menu, handleClose);

  return (
    <div className={`${styles.overlay} ${show ? styles.visible : ''}`}>
      <div className={`${styles.menu} ${show ? styles.active : ''}`} ref={menu}>
        <div className={styles.top}>
          <Container>
            <button type="button" className={styles.close} onClick={handleClose}>
              <IconClose />
              <p>Close</p>
            </button>
          </Container>
        </div>
        <Container>
          <ul className={styles.inner}>
            <li>
              <Navbar>
                {navItems.map((item) => (
                  <NavItem key={item.id} href={item.href} label={item.label} />
                ))}
              </Navbar>
            </li>

            <li>
              <NavCategories title="Categories" variant="column" categories={categories} />
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default DropdownMenu;