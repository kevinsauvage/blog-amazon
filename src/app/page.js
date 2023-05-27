import CarouselPosts from '@/components/CarouselPosts/CarouselPosts';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import { getPopularPosts, getPosts, getPostsFromCategorySlug } from '@/lib/wordpress';

const Home = async () => {
  const [beauty, housing, lifestyle, technology, sticky, popular] = await Promise.all([
    getPostsFromCategorySlug('beauty', 1, 8),
    getPostsFromCategorySlug('housing', 1, 3),
    getPostsFromCategorySlug('lifestyle', 1, 8),
    getPostsFromCategorySlug('technology', 1, 6),
    getPosts(3, 1, true),
    getPopularPosts(10),
  ]);

  return (
    <main>
      <Container>
        <HomeBanner posts={sticky} grid />

        <Section title="Most Popular Articles">
          <CarouselPosts posts={popular} aspect="ratio-16-9" />
        </Section>

        <Section title="Out Beauty Articles" buttonUrl="/category/beauty">
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
        </Section>

        <Section title="Our Technology Articles" buttonUrl="/category/technology">
          <Grid variant="3">
            {Array.isArray(technology.posts) &&
              technology.posts.map((post) => (
                <PostGrid key={post.ID} post={post} image={post.images.large} />
              ))}
          </Grid>
        </Section>

        <Section title="Our Housing Articles" buttonUrl="/category/housing">
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
        </Section>

        <Section title="Our Lifestyle Articles" buttonUrl="/category/lifestyle">
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
        </Section>
      </Container>
    </main>
  );
};

export default Home;
