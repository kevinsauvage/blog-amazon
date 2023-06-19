import Navbar from '../Navbar/Navbar';
import NavItem from '../NavItem/NavItem';

const Nav = ({ menu, variant = 'column', title }) => {
  if (!Array.isArray(menu)) return;
  return (
    <Navbar variant={variant} title={title}>
      {menu.map((menuItem) => (
        <NavItem
          key={menuItem.id}
          href={menuItem?.attributes?.path}
          label={menuItem?.attributes?.label}
        />
      ))}
    </Navbar>
  );
};

export default Nav;
