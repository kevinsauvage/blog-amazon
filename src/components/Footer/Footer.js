import Container from '../Container/Container';
import NavItem from '../NavItem/NavItem';

import styles from './Footer.module.scss';

const navItems = [
  { href: '/contact', id: 1, label: 'Contact' },
  { href: '/about', id: 2, label: 'About' },
  { href: '/privacy', id: 3, label: 'Privacy policy' },
  { href: '/terms', id: 4, label: ' Terms and Conditions' },
  { href: '/cookie', id: 5, label: ' Cookie policy' },
];

const Footer = ({ categories }) => (
  <footer className={styles.Footer}>
    <Container>
      <div className={styles.top}>
        <div>
          <h6 className={styles.title}>About</h6>
          <p>
            Blog Note Pro is a modern WordPress theme that comes with high-quality features and
            minimal design. It is designed to work for all kinds of blogs: personal blog, business
            blog, fashion blog, lifestyle blog, travel blog, and so on.
          </p>
        </div>
        <div>
          <h6 className={styles.title}>Usefull links</h6>
          <ul>
            {navItems.map((item) => (
              <NavItem key={item.id} href={item.href} label={item.label} />
            ))}
          </ul>
        </div>
        <div>
          <h6 className={styles.title}>Categories</h6>
          <ul>
            {categories.map((category) => (
              <NavItem
                key={category.id}
                href={`/category/${category.slug}`}
                label={category.name}
              />
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
