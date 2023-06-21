import Image from 'next/image';
import Link from 'next/link';

import { getStrapiBaseUrl } from '@/lib/api/utils';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

import styles from './Post.module.scss';

const Post = ({ post, image, showCategories = true, showExcerpt = true }) => {
  const { slug, categories, excerpt, title, imageAlt, publishedAt, viewCount } = post;

  const category = categories[0];

  const postLink = `/category/${category?.slug}/${slug}`;

  return (
    <article className={styles.post}>
      {image && (
        <Link href={postLink} aria-label="link to the post">
          <Image
            className={styles.image}
            src={getStrapiBaseUrl() + image.url}
            width={image.width}
            height={image.height}
            alt={imageAlt}
          />
        </Link>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          {showCategories && <Category category={category} />}
          <Date date={publishedAt} />
          <Views views={viewCount} />
        </div>
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        {showExcerpt && excerpt && <p className={styles.excerpt}> {excerpt} </p>}
      </div>
    </article>
  );
};

export default Post;
