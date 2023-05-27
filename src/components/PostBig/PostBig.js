/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostBig.module.scss';

const PostBig = ({ post, image }) => {
  const { slug, categories, excerpt, title, imageAlt } = post;
  const postLink = `/category/${categories[0].slug}/${slug}`;
  return (
    <article className={styles.post}>
      <Link href={postLink}>
        <Image
          className={`${styles.image}`}
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.categories}>
          <Category category={categories[0]} />
        </div>
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </article>
  );
};

export default PostBig;
