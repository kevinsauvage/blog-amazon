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
      <Link href={`/post/${post.slug}`}>
        <h2 className={styles.title}>{post.title}</h2>
      </Link>
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      <div className={styles.footer}>
        <span>By {post.author.name}</span> | <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

export default Post;
