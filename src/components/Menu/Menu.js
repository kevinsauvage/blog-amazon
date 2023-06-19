import { useRef } from 'react';

import useOnClickOutside from '@/hooks/useClickOutside';
import IconClose from '@/svg/IconClose';

import Container from '../Container/Container';
import Nav from '../Nav/Nav';

import styles from './Menu.module.scss';

const DropdownMenu = ({ menu, usefullLinks, handleClose, show }) => {
  const menuReference = useRef();

  useOnClickOutside(menuReference, handleClose);

  return (
    <div className={`${styles.overlay} ${show ? styles.visible : ''}`}>
      <div className={`${styles.menu} ${show ? styles.active : ''}`} ref={menuReference}>
        <div className={styles.top}>
          <Container>
            <button type="button" className={styles.close} onClick={handleClose}>
              <IconClose />
              <p>Close</p>
            </button>
          </Container>
        </div>
        <Container>
          <div className={styles.mainMenu}>
            <Nav
              title={menu.displayedTitle || 'Menu'}
              variant="column"
              menu={menu?.menuItemsFirstLevels?.data}
            />
          </div>
          <div className={styles.mainMenu}>
            <Nav
              title={usefullLinks.displayedTitle || 'Menu'}
              variant="column"
              menu={usefullLinks?.menuItemsFirstLevels?.data}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DropdownMenu;
