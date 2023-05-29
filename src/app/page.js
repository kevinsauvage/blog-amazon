import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import wordpressApiCalls from '@/lib/wordpress/index';

const CAT_BEAUTY = 2;
const CAT_HOUSING = 5;
const CAT_LIFESTYLE = 7;
const CAT_TECHNOLOGY = 1;

const { getPosts, getPopularPosts } = wordpressApiCalls;

const Home = async () => {
  const [beauty, housing, lifestyle, technology, sticky, popular] = await Promise.all([
    getPosts({ categories: CAT_BEAUTY, perPage: 6 }),
    getPosts({ categories: CAT_HOUSING, perPage: 6 }),
    getPosts({ categories: CAT_LIFESTYLE, perPage: 6 }),
    getPosts({ categories: CAT_TECHNOLOGY, perPage: 6 }),
    getPosts({ perPage: 3, stycky: true }),
    getPopularPosts(6),
  ]);

  return (
    <main>
      <Container>
        <HomeBanner posts={sticky?.posts} grid />
        <Section title="Most Popular Articles">
          <Grid variant="1">
            {Array.isArray(popular) &&
              popular.map((post) => (
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

        <Section title="Out Beauty Articles" buttonUrl="/category/beauty">
          <Grid variant="1">
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
          <Grid variant="1">
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
          <Grid variant="1">
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
