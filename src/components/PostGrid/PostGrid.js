/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostGrid.module.scss';

const PostGrid = ({ post, image, imagePriority }) => {
  const { slug, categories, title, imageAlt, date, viewCount, excerpt } = post;
  const category = categories.find((c) => c.id !== 29 && c.id !== 28);

  const postLink = `/category/${category.slug}/${slug}`;

  return (
    <div className={styles.post}>
      <Image
        className={`${styles.image}`}
        src={image.source_url}
        width={image.width}
        height={image.height}
        alt={imageAlt}
        priority={imagePriority}
      />

      <div className={styles.content}>
        <Category category={category} />
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />

        <div className={styles.info}>
          <Date date={date} variant="light" />
          <Views views={viewCount} variant="light" />
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
