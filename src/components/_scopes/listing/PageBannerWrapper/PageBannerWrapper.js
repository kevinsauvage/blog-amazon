/* eslint-disable react/no-danger */
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Container from '../../../Container/Container';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, title, subtitle, description }) => (
  <div className={styles.banner}>
    <div className={styles.content}>
      <Container>
        <Breadcrumb />
        <div className={styles.inner}>
          {title && <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
          {subtitle && (
            <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
          {description && (
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {children}
        </div>
      </Container>
    </div>
  </div>
);

export default PageBannerWrapper;
