import { useRef } from 'react';

import useOnClickOutside from '@/hooks/useClickOutside';
import IconClose from '@/svg/IconClose';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import NavItem from '../NavItem/NavItem';

import styles from './DropdownMenu.module.scss';

const navItems = [
  { href: '/', id: 1, label: 'Home' },
  { href: '/contact', id: 2, label: 'Contact' },
  { href: '/about', id: 4, label: 'About' },
];

const DropdownMenu = ({ categories, handleClose, show }) => {
  const dropdown = useRef();

  useOnClickOutside(dropdown, handleClose);

  return (
    <div className={`${styles.overlay} ${show ? styles.visible : ''}`}>
      <div className={`${styles.dropdown} ${show ? styles.active : ''}`} ref={dropdown}>
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
              <Navbar title="Categories">
                {categories.map((category) => (
                  <NavItem
                    key={category.id}
                    href={`/category/${category.slug}`}
                    label={category.name}
                  />
                ))}
              </Navbar>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default DropdownMenu;
