import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

import styles from './Post.module.scss';

const Post = ({ post, image, showCategories = true, showExcerpt = true }) => {
  const { slug, categories, excerpt, title, imageAlt, date, viewCount } = post;

  const category = categories.find((c) => c.id !== 29 && c.id !== 28);

  const postLink = `/category/${category.slug}/${slug}`;

  return (
    <article className={styles.post}>
      <Link href={postLink} aria-label="link to the post">
        <Image
          className={styles.image}
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.header}>
          {showCategories && <Category category={category} />}
          <Date date={date} />
          <Views views={viewCount} />
        </div>
        <Link href={postLink}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        {showExcerpt && (
          <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
      </div>
    </article>
  );
};

export default Post;
