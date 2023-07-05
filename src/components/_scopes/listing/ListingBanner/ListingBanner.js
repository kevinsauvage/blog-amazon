/* eslint-disable react/no-danger */
import Nav from '@/components/Nav/Nav';
import SearchForm from '@/components/SearchForm/SearchForm';

import Container from '../../../Container/Container';

import styles from './ListingBanner.module.scss';

const ListingBanner = ({ title, subtitle, description, query, menu }) => (
  <div className={`${styles.banner} ${query && styles.active}`}>
    <div className={styles.content}>
      <Container>
        <div className={styles.inner}>
          {!query && (
            <>
              {menu && (
                <div className={styles.navigation}>
                  <Nav
                    variant="row"
                    menu={menu?.items}
                    itemActiveClass={styles.itemActive}
                    itemClass={styles.item}
                  />
                </div>
              )}
              {title && <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
              {subtitle && (
                <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
              )}
              {description && (
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </>
          )}
          <div className={styles.SearchForm}>
            <SearchForm query={query} />
          </div>
        </div>
      </Container>
    </div>
    {query && (
      <div className={styles.bottom}>
        <h1 className={styles.title}>{query}</h1>
      </div>
    )}
  </div>
);

export default ListingBanner;
