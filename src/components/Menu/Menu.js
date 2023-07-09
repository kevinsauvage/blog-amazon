import IconClose from '@/svg/IconClose';

import Container from '../Container/Container';
import NavItem from '../NavItem/NavItem';

import styles from './Menu.module.scss';

const Menu = ({ menu, usefullLinks, handleClose, show }) => (
  <div className={`${styles.menu} ${show ? styles.active : ''}`}>
    <div
      onClick={() => handleClose()}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && handleClose()}
      className={styles.overlay}
    />
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
        <nav>
          <p className={styles.title}>{menu?.displayedTitle || 'Menu'}</p>
          <ul>
            {menu?.items?.map((menuItem) => (
              <NavItem
                key={menuItem.id}
                href={menuItem?.path}
                label={menuItem?.label}
                className={styles.menuItem}
                activeClass={styles.menuItemActive}
              />
            ))}
          </ul>
        </nav>

        <nav>
          <p className={styles.title}>{usefullLinks?.displayedTitle || 'Menu'}</p>
          <ul>
            {usefullLinks?.items?.map((menuItem) => (
              <NavItem
                key={menuItem.id}
                href={menuItem?.path}
                label={menuItem?.label}
                className={styles.menuItem}
                activeClass={styles.menuItemActive}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

export default Menu;
