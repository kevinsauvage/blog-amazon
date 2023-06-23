import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Container from '../Container/Container';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, title }) => (
  <div className={styles.banner}>
    <Container>
      <Breadcrumb />
      <div className={styles.inner}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </div>
    </Container>
  </div>
);

export default PageBannerWrapper;
