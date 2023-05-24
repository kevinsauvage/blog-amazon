/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Post.module.scss';

const Post = ({ post, aspect = 'ratio-5-3', image }) => {
  const { slug, categories, excerpt, title, imageAlt, date } = post;

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
        <div className={styles.categories}>
          {categories.length > 0 &&
            categories.slice(0, 2).map((category) => (
              <Link href={`/category/${category.slug}_${category.id}`} key={category.id}>
                <Category category={category} />
              </Link>
            ))}
        </div>
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
        <footer className={styles.footer}>
          <Date date={date} />
        </footer>
      </div>
    </article>
  );
};

export default Post;
