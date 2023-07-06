import Grid from '@/components/Grid/Grid';
import NoResults from '@/components/NoResults/NoResults';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';

import styles from './Listing.module.scss';

const Listing = async ({ posts }) => (
  <div className={styles.listing}>
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
  </div>
);

export default Listing;
