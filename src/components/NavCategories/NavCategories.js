import Navbar from '../Navbar/Navbar';
import NavItem from '../NavItem/NavItem';

const NavCategories = ({ categories, variant = 'column', title }) => (
  <Navbar variant={variant} title={title}>
    {categories.map((category) => (
      <NavItem key={category.id} href={`/category/${category.slug}`} label={category.label} />
    ))}
  </Navbar>
);

export default NavCategories;
