import Image from 'next/image';

import Container from '@/components/Container/Container';
import config from '@/config';

import styles from './page.module.scss';

const getPostBySlug = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`${config.apiBaseUrl}/posts/slug:${slug}`, {
    revalidate: 60,
  });

  const post = await response.json();

  return {
    ID: post.ID,
    author: post.author,
    content: post.content,
    date: post.date,
    featured_image: post.featured_image,
    slug: post.slug,
    thumbnail: post.post_thumbnail,
    title: post.title,
  };
};

const PostId = async (context) => {
  const post = await getPostBySlug(context);

  return (
    <Container>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>{post.title}</h2>
          <div>
            <span>By {post.author.name}</span> |{' '}
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
        <Image
          className={styles.image}
          src={post.thumbnail.URL}
          width={post.thumbnail.width}
          height={post.thumbnail.height}
          alt={post.title}
        />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </Container>
  );
};

export default PostId;
