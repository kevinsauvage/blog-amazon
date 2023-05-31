import Link from 'next/link';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles['not-found']}>
    <h1>Not Found</h1>
    <p className={styles.subtitle}>Could not find requested resource</p>
    <p>
      View <Link href="/">Home page</Link>
    </p>
  </div>
);

export default NotFound;
