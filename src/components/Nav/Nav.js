import NavItem from '../NavItem/NavItem';

import styles from './Nav.module.scss';

const Nav = ({ menu, variant = 'column', title, itemClass, itemActiveClass }) => {
  if (!Array.isArray(menu)) return;

  const getStyles = () => {
    if (variant === 'row') return styles.row;
    return styles.column;
  };

  return (
    <nav className={`${styles.navbar} ${getStyles()}`}>
      {title && <p className={styles.title}>{title}</p>}
      <ul className={styles.list}>
        {menu.map((menuItem) => (
          <NavItem
            key={menuItem.id}
            href={menuItem?.path}
            label={menuItem?.label}
            className={itemClass}
            activeClass={itemActiveClass}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
