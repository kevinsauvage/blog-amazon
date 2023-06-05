import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';

import styles from './layout.module.scss';

const layout = ({ children }) => (
  <div className={styles.page}>
    <Container>
      <Breadcrumb />
      <div className={styles.content}>{children}</div>
    </Container>
  </div>
);

export default layout;
