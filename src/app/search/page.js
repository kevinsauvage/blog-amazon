import Link from 'next/link';

import Container from '@/components/Container/Container';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import config from '@/config';

import styles from './page.module.scss';

const PER_PAGE = 10;

const getSearch = async ({ searchParams }) => {
  const { q = '', page = 1 } = searchParams || {};

  const response = await fetch(
    `${config.apiBaseUrl}/posts?search=${q}&number=${PER_PAGE}&page=${page}`,
    { next: { revalidate: 60 } }
  );

  const data = await response.json();

  const posts = data.posts.map((post) => ({
    ID: post.ID,
    author: post.author,
    date: post.date,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    slug: post.slug,
    thumbnail: post.post_thumbnail,
    title: post.title,
  }));

  const total = data.found;

  return {
    page: Number.parseInt(page, 10),
    posts,
    query: q,
    total: Number.parseInt(total, 10),
  };
};

const search = async (context) => {
  const { page, posts, total, query } = await getSearch(context);

  const totalPages = Math.ceil(total / PER_PAGE);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const previousPage =
    page - 1 === 1 ? `/search?q=${query}` : `/search?page=${page - 1}&q=${query}`;
  const nextPage = `/search?page=${page + 1}&q=${query}`;

  return (
    <Container>
      <main className={styles.main}>
        <h2 className={styles.title}>Search Results for &rdquo;{query}&rdquo;</h2>
        <SearchForm query={query} />
        <ul className={styles.grid}>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="square" />
              </li>
            ))}
        </ul>
        <div className={styles.pagination}>
          {!isFirstPage && <Link href={previousPage}>← Prev</Link>}
          {!isLastPage && <Link href={nextPage}>Next →</Link>}
        </div>
      </main>
    </Container>
  );
};

export default search;
