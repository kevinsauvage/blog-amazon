import Grid from '@/components/Grid/Grid';

import PostSkeleton from '../../posts/PostSkeleton/PostSkeleton';

const PostsLoader = ({ total = 10 }) => (
  <Grid>
    {[...new Array(total).keys()].map((key) => (
      <PostSkeleton key={key} />
    ))}
  </Grid>
);

export default PostsLoader;
