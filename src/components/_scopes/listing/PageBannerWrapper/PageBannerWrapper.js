import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Container from '../../../Container/Container';
import SearchForm from '../../../SearchForm/SearchForm';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, title, subtitle, query }) => (
  <div className={styles.banner}>
    <Container>
      <div className={styles.inner}>
        <Breadcrumb />
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
        <SearchForm query={query} />
      </div>
    </Container>
  </div>
);

export default PageBannerWrapper;
