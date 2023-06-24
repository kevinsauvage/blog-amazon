/* eslint-disable react/no-danger */
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Container from '../../../Container/Container';
import SearchForm from '../../../SearchForm/SearchForm';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, title, subtitle, description, query }) => (
  <div className={styles.banner}>
    <Container>
      <div className={styles.inner}>
        <Breadcrumb />
        {title && <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
        {subtitle && (
          <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
        {description && (
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        )}
        {children}
        <SearchForm query={query} />
      </div>
    </Container>
  </div>
);

export default PageBannerWrapper;
