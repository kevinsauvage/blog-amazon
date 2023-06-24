import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';

import ListingHeader from '../ListingHeader/ListingHeader';
import PageBannerWrapper from '../PageBannerWrapper/PageBannerWrapper';

const Listing = ({
  title,
  subtitle,
  query,
  totalPages,
  totalPosts,
  posts,
  page,
  sorts,
  categories,
}) => (
  <div>
    <PageBannerWrapper title={title} query={query} subtitle={subtitle} />
    <Container>
      <main>
        <ListingHeader totalPosts={totalPosts} sorts={sorts} categories={categories} />

        {Array.isArray(posts) && (
          <Grid variant="2">
            {posts.map((post, index) => (
              <PostGrid
                key={post.id}
                post={post}
                image={post.images?.medium}
                imagePriority={index < 3}
              />
            ))}
          </Grid>
        )}
        <Pagination totalPages={totalPages} currentPage={page} navigate />
      </main>
    </Container>
  </div>
);

export default Listing;
