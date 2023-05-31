import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

import styles from './Post.module.scss';

const Post = ({ post, image, showCategories = true }) => {
  const { slug, categories, title, imageAlt, date, viewCount } = post;

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
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.header}>
          {showCategories && <Category category={categories[0]} />}
          <Date date={date} />
          <Views views={viewCount} />
        </div>
      </div>
    </article>
  );
};

export default Post;
