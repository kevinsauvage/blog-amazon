import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import NoResults from '@/components/NoResults/NoResults';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';

import ListingHeader from '../ListingHeader/ListingHeader';

import styles from './Listing.module.scss';

const Listing = ({ totalPages, totalPosts, posts, page, sorts, categories }) => (
  <div className={styles.listing}>
    <Container>
      <ListingHeader totalPosts={totalPosts} sorts={sorts} categories={categories} />
      {Array.isArray(posts) && posts.length > 0 ? (
        <Grid>
          {posts.map((post, index) => (
            <PostGrid
              key={post.id}
              post={post}
              image={post.images?.medium}
              imagePriority={index < 3}
            />
          ))}
        </Grid>
      ) : (
        <NoResults
          title="No Results"
          subtitle="Sorry, we couldn't find any results."
          description="Please try a different search term."
        />
      )}
      <Pagination totalPages={totalPages} currentPage={page} navigate />
    </Container>
  </div>
);

export default Listing;
