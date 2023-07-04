/* eslint-disable react/no-danger */
import Nav from '@/components/Nav/Nav';
import SearchForm from '@/components/SearchForm/SearchForm';

import Container from '../../../Container/Container';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ title, subtitle, description, query, menu }) => (
  <div className={styles.banner}>
    <div className={styles.content}>
      <Container>
        <div className={styles.inner}>
          {menu && (
            <div className={styles.navigation}>
              <Nav variant="row" menu={menu?.items} />
            </div>
          )}
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && (
            <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
          {description && (
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          )}
          <SearchForm query={query} />
        </div>
      </Container>
    </div>
  </div>
);

export default PageBannerWrapper;
