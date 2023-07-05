import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import NoResults from '@/components/NoResults/NoResults';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';
import useQueries from '@/hooks/useQueries';
import { fetchMenu } from '@/lib/api/menus';

import ListingBanner from '../ListingBanner/ListingBanner';
import ListingHeader from '../ListingHeader/ListingHeader';

import styles from './Listing.module.scss';

const Listing = async ({ context, title, subtitle, description }) => {
  const [searchData, menu] = await Promise.all([useQueries(context), fetchMenu({ slug: 'main' })]);

  const { page, posts, q, sortsResponse, totalPages, totalPosts } = searchData || {};

  return (
    <div className={styles.listing}>
      <ListingBanner
        title={title}
        subtitle={subtitle}
        description={description}
        query={q}
        menu={menu}
      />

      <Container>
        <ListingHeader totalPosts={totalPosts} sorts={sortsResponse} menu={menu} />
        {Array.isArray(posts) && posts.length > 0 ? (
          <Grid>
            {posts.map((post, index) => {
              if (index % 2 === 0) {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    image={post.images?.medium}
                    imagePriority={index < 3}
                  />
                );
              }
              return (
                <PostGrid
                  key={post.id}
                  post={post}
                  image={post.images?.medium}
                  imagePriority={index < 3}
                />
              );
            })}
          </Grid>
        ) : (
          <NoResults
            title="No Results"
            subtitle="Sorry, we couldn't find any results."
            description="Please try a different search term."
          />
        )}
      </Container>

      <Pagination totalPages={totalPages} currentPage={page} navigate />
    </div>
  );
};

export default Listing;
