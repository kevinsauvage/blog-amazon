import { useRef } from 'react';

import useOnClickOutside from '@/hooks/useClickOutside';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import NavItem from '../NavItem/NavItem';

import styles from './DropdownMenu.module.scss';

const navItems = [
  { href: '/', id: 1, label: 'Home' },
  { href: '/contact', id: 2, label: 'Contact' },
  { href: '/about', id: 4, label: 'About' },
];

const DropdownMenu = ({ categories, handleClose }) => {
  const dropdown = useRef();

  useOnClickOutside(dropdown, handleClose);

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <Container>
        <ul className={styles.inner}>
          <li>
            <Navbar title="Page">
              {navItems.map((item) => (
                <NavItem key={item.id} href={item.href} label={item.label} />
              ))}
            </Navbar>
          </li>

          <li>
            <Navbar title="Category">
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
  );
};

export default DropdownMenu;
