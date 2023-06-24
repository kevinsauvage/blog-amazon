/* eslint-disable react/no-danger */
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Container from '../../../Container/Container';

import styles from './PageBannerWrapper.module.scss';

const PageBannerWrapper = ({ children, title, subtitle, description }) => (
  <div className={styles.banner}>
    <video autoPlay loop muted className={styles.video}>
      <source src="/bg.mp4" type="video/mp4" />
    </video>
    <div className={styles.overlay} />
    <div className={styles.content}>
      <Container>
        <Breadcrumb className={styles.breadcrumb} />
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
