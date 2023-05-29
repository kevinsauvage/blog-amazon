/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Post.module.scss';

const Post = ({ post, aspect = 'ratio-5-3', image, showCategories = true }) => {
  const { slug, categories, title, imageAlt, date, viewCount } = post;

  const postLink = `/category/${categories[0].slug}/${slug}`;

  return (
    <article className={styles.post}>
      <Link href={postLink}>
        <Image
          className={`${styles.image} ${styles[aspect]}`}
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          {showCategories && <Category category={categories[0]} />}
          <Date date={date} />
          <Views views={viewCount} />
        </div>
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
      </div>
    </article>
  );
};

export default Post;
