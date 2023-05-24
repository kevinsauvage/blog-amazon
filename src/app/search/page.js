import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import SearchForm from '@/components/SearchForm/SearchForm';
import TotalFound from '@/components/TotalFound/TotalFound';
import { getSearch } from '@/lib/wordpress';

import styles from './page.module.scss';

const search = async (context) => {
  const { currentPage, posts, totalPosts, query, totalPages } = await getSearch(context);

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>Search Results {query && `for ${query}`}</h1>
          <TotalFound total={totalPosts} />
          <SearchForm query={query} />
        </header>
        <Grid posts={posts} fill />
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </main>
    </Container>
  );
};

export default search;
