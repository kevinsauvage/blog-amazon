import apiCalls from '@/lib/api';

import Container from '../Container/Container';
import NavItem from '../NavItem/NavItem';

import styles from './Footer.module.scss';

const { getMenu } = apiCalls;

const Footer = async () => {
  const [menu1, menu2] = await Promise.all([
    getMenu({ slug: 'footer-navigation1' }),
    getMenu({ slug: 'footer-navigation2' }),
  ]);
  return (
    <footer className={styles.Footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.about}>
            <h6 className={styles.title}>About</h6>
            <p>
              Hello there! We&apos;re delighted to have you visit [Your Blog Name]. This blog is a
              space where we share thoughts, insights, and experiences on a wide range of topics.
              Whether you&apos;re seeking inspiration, information, or simply a moment of
              relaxation, you&apos;ve come to the right place.
            </p>
          </div>
          <div className={styles.links}>
            <div>
              <h6 className={styles.title}>Usefull links</h6>
              <ul>
                {Array.isArray(menu1) &&
                  menu1.map((item) => (
                    <NavItem key={item.id} href={item.path} label={item.title} />
                  ))}
              </ul>
            </div>
            {Array.isArray(menu2) && (
              <div>
                <h6 className={styles.title}>Categories</h6>
                <ul>
                  {menu2.map((menuItem) => (
                    <NavItem key={menuItem.id} href={menuItem.path} label={menuItem.title} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
