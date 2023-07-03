/* eslint-disable react/no-danger */
import SearchForm from '@/components/SearchForm/SearchForm';

import Container from '../../../Container/Container';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ title, subtitle, description, query }) => (
  <div className={styles.banner}>
    <div className={styles.content}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && (
            <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
          {description && (
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          )}{' '}
          <SearchForm query={query} />
        </div>
      </Container>
    </div>
  </div>
);

export default PageBannerWrapper;
