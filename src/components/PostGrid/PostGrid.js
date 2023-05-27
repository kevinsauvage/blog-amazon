/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostGrid.module.scss';

const PostGrid = ({ post, image }) => {
  const { slug, categories, title, imageAlt, date, viewCount } = post;
  const postLink = `/category/${categories[0].slug}/${slug}`;

  return (
    <div className={styles.post}>
      <Image
        className={`${styles.image}`}
        src={image.source_url}
        width={image.width}
        height={image.height}
        alt={imageAlt}
      />

      <div className={styles.categories}>
        <Category category={categories[0]} />
      </div>
      <div className={styles.content}>
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.info}>
          <Date date={date} />
          <Views views={viewCount} />
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
