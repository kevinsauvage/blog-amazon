/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Post.module.scss';

const Post = ({ post, aspect = 'video', image }) => {
  const { slug, categories, excerpt, title } = post;

  return (
    <div className={styles.post}>
      <Link href={`/post/${slug}`}>
        <Image
          className={`${styles.image} ${styles[aspect]}`}
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={image.imageAlt}
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
                style={{ backgroundColor: category.acf?.background_color }}
              >
                {category.name}
              </Link>
            ))}
        </div>
        <Link href={`/post/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </div>
  );
};

export default Post;
