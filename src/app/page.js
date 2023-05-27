import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import { getPopularPosts, getPostsFromCategorySlug } from '@/lib/wordpress';

const Home = async () => {
  const [beauty, housing, lifestyle, technology, popular] = await Promise.all([
    getPostsFromCategorySlug('beauty', 1, 6),
    getPostsFromCategorySlug('housing', 1, 3),
    getPostsFromCategorySlug('lifestyle', 1, 6),
    getPostsFromCategorySlug('technology', 1, 6),
    getPopularPosts(3),
  ]);

  return (
    <main>
      <Container>
        <HomeBanner posts={popular} grid />

        <Section title="Out Beauty Articles">
          <Grid>
            {Array.isArray(beauty.posts) &&
              beauty.posts.map((post) => (
                <Post
                  key={post.ID}
                  post={post}
                  image={post.images.medium_large}
                  aspect="ratio-5-3"
                  showCategories
                />
              ))}
          </Grid>
          <Button href="/category/beauty" text="See more" />
        </Section>

        <Section title="Our Technology Articles">
          <Grid variant="3">
            {Array.isArray(technology.posts) &&
              technology.posts.map((post) => (
                <PostGrid key={post.ID} post={post} image={post.images.large} />
              ))}
          </Grid>
          <Button href="/category/technology" text="See more" />
        </Section>

        <Section title="Our Housing Articles">
          <Grid>
            {Array.isArray(housing.posts) &&
              housing.posts.map((post) => (
                <Post
                  key={post.ID}
                  post={post}
                  image={post.images.medium_large}
                  aspect="ratio-5-3"
                  showCategories
                />
              ))}
          </Grid>
          <Button href="/category/housing" text="See more" />
        </Section>

        <Section title="Our Lifestyle Articles">
          <Grid>
            {Array.isArray(lifestyle.posts) &&
              lifestyle.posts.map((post) => (
                <Post
                  key={post.ID}
                  post={post}
                  image={post.images.medium_large}
                  aspect="ratio-5-3"
                  showCategories
                />
              ))}
          </Grid>
          <Button href="/category/lifestyle" text="See more" />
        </Section>
      </Container>
    </main>
  );
};

export default Home;
