/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostGrid.module.scss';

const PostGrid = ({ post, image, showExcerpt = true }) => {
  const { slug, categories, excerpt, title, imageAlt } = post;

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
            <Link
              href={`/category/${category.slug}_${category.id}`}
              className={styles.category}
              key={category.id}
              style={{ backgroundColor: category.acf?.background_color }}
            >
              {category.name}
            </Link>
          ))}
      </div>
      <div className={styles.content}>
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        {showExcerpt && (
          <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
      </div>
    </div>
  );
};

export default PostGrid;
