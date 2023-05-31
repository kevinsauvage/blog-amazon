import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';

import styles from './page.module.scss';

function page() {
  return (
    <div className={styles.page}>
      <Container>
        <Breadcrumb />
        <h1>About Us</h1>
      </Container>
    </div>
  );
}

export default page;
