/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Post.module.scss';

const Post = ({ post, aspect = 'video' }) => (
  <div className={styles.post}>
    <Link href={`/post/${post.slug}`}>
      <Image
        className={`${styles.image} ${styles[aspect]}`}
        src={post.thumbnail.URL}
        width={post.thumbnail.width}
        height={post.thumbnail.height}
        alt={post.title}
      />
    </Link>
    <div>
      <div className={styles.categories}>
        {post?.categories &&
          Object.keys(post?.categories).length > 0 &&
          Object.keys(post.categories)
            .slice(0, 2)
            .map((category) => (
              <Link
                href={`/category/${post?.categories[category].slug}`}
                className={styles.category}
                key={category}
              >
                {category}
              </Link>
            ))}
      </div>
      <Link href={`/post/${post.slug}`}>
        <h2 className={styles.title}>{post.title}</h2>
      </Link>
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
    </div>
  </div>
);

export default Post;
