import { useRef } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import IconClose from '@/svg/IconClose';

import Container from '../Container/Container';
import Nav from '../Nav/Nav';

import styles from './Menu.module.scss';

const DropdownMenu = ({ menu, usefullLinks, handleClose, show }) => {
  const menuReference = useRef();

  useOnClickOutside(menuReference, handleClose);

  return (
    <div className={`${styles.menu} ${show ? styles.active : ''}`} ref={menuReference}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Container>
            <button type="button" className={styles.close} onClick={handleClose}>
              <IconClose />
              <p>Close</p>
            </button>
          </Container>
        </div>
        <div className={styles.mainMenu}>
          <Container>
            <Nav title={menu?.displayedTitle || 'Menu'} variant="column" menu={menu?.items} />

            <Nav
              title={usefullLinks?.displayedTitle || 'Menu'}
              variant="column"
              menu={usefullLinks?.items}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
