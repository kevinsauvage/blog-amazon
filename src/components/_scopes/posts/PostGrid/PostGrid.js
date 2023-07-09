/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import { getStrapiBaseUrl } from '@/lib/api/utils';
import routes from '@/utils/routes';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostGrid.module.scss';

const PostGrid = ({ post, image, imagePriority }) => {
  const { slug, categories, title, imageAlt, publishedAt, viewCount, excerpt } = post;

  const category = categories[0];

  const postLink = `${routes.posts}/${category?.slug}/${slug}`;

  return (
    <div className={styles.post}>
      {image && (
        <Image
          className={`${styles.image}`}
          src={getStrapiBaseUrl() + image.url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
          priority={imagePriority}
        />
      )}

      <div className={styles.content}>
        <Category category={category} />
        <Link href={postLink}>
          <strong className={styles.title}>{title}</strong>
        </Link>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.info}>
          <Date date={publishedAt} />
          <Views views={viewCount} />
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
