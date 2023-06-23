import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Container from '../Container/Container';
import TotalFound from '../TotalFound/TotalFound';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, totalPosts, title }) => (
  <div className={styles.banner}>
    <Container>
      <Breadcrumb />
      <div className={styles.inner}>
        <div className={styles.title}>
          {title && <h1>{title}</h1>}
          {totalPosts && <TotalFound total={totalPosts} />}
        </div>
        {children}
      </div>
    </Container>
  </div>
);

export default PageBannerWrapper;
