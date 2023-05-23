/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './PostBig.module.scss';

const PostBig = ({ post, image }) => {
  const { slug, categories, excerpt, title, imageAlt } = post;

  return (
    <article className={styles.post}>
      <Link href={`/posts/${slug}`}>
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
          {categories.length > 0 &&
            categories.slice(0, 2).map((category) => (
              <Link
                href={`/category/${category.slug}_${category.id}`}
                className={styles.category}
                key={category}
                style={{ color: category.acf?.background_color }}
              >
                {category.name}
              </Link>
            ))}
        </div>
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </article>
  );
};

export default PostBig;
