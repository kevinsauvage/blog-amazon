/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Post.module.scss';

const Post = ({ post, aspect = 'ratio-5-3', image, showCategories = true }) => {
  const { slug, categories, excerpt, title, imageAlt, date, viewCount } = post;

  return (
    <article className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <Image
          className={`${styles.image} ${styles[aspect]}`}
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
        />
      </Link>

      <div className={styles.content}>
        {showCategories && (
          <div className={styles.categories}>
            <Category category={categories[0]} />
          </div>
        )}
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
        <footer className={styles.footer}>
          <Date date={date} />
          <Views views={viewCount} />
        </footer>
      </div>
    </article>
  );
};

export default Post;
