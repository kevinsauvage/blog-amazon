/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostGrid.module.scss';

const PostGrid = ({ post, image }) => {
  const { slug, categories, title, imageAlt } = post;

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
        {categories.length > 0 &&
          categories.slice(0, 2).map((category) => (
            <Link href={`/category/${category.slug}_${category.id}`} key={category.id}>
              <Category category={category} />
            </Link>
          ))}
      </div>
      <div className={styles.content}>
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
      </div>
    </div>
  );
};

export default PostGrid;
