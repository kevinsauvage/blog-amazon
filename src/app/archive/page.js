import Link from 'next/link';

import Container from '@/components/Container/Container';
import Post from '@/components/Post/Post';
import config from '@/config';

import styles from './page.module.scss';

const PAGE_SIZE = 10;

const getAllPosts = async ({ searchParams }) => {
  const { page = 1 } = searchParams || {};

  const response = await fetch(`${config.apiBaseUrl}/posts/?number=${PAGE_SIZE}&page=${page}`, {
    next: { revalidate: 60 },
  });

  const data = await response.json();
  return {
    currentPage: page,
    posts: data.posts.map((post) => ({
      ID: post.ID,
      author: post.author,
      date: post.date,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      slug: post.slug,
      thumbnail: post.post_thumbnail,
      title: post.title,
    })),
    totalPages: data.pages,
  };
};

const archive = async (context) => {
  const { posts, totalPages, currentPage } = await getAllPosts(context);

  return (
    <Container>
      <main className={styles.main}>
        <h2 className={styles.title}>All Posts</h2>
        <ul className={styles.grid}>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="square" />
              </li>
            ))}
        </ul>
        <nav className={styles.pagination}>
          {currentPage > 1 && (
            <Link href={`/archive?page=${currentPage - 1}`} passHref>
              ← Prev
            </Link>
          )}
          {[...new Array(totalPages).keys()].map((page) => (
            <Link
              className={currentPage === page + 1 ? styles.active : ''}
              href={`/archive?page=${page + 1}`}
              passHref
              key={page}
            >
              {page + 1}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={`/archive?page=${currentPage + 1}`} passHref>
              Next →
            </Link>
          )}
        </nav>
      </main>
    </Container>
  );
};

export default archive;
