import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Container>
      <Navbar />
    </Container>
  </header>
);

export default Header;
