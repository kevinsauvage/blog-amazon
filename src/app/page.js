import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import wordpressApiCalls from '@/lib/wordpress/index';

const { getPosts, getCategories } = wordpressApiCalls;

const totalPostsByCategory = 3;

const getHomeData = async () => {
  const categories = await getCategories();
  const promises = categories.map((category) =>
    getPosts({ categories: category.id, perPage: totalPostsByCategory })
  );
  const data = await Promise.all(promises);

  return data.map((item, index) => {
    const { id, name, slug } = categories[index];
    return { category: { id, name, slug }, ...item };
  });
};

export const metadata = {
  description:
    'Expert insights, valuable tips, and engaging articles. Explore topics, stay informed, and enhance your understanding. Feed your curiosity and learn continuously.',
  keywords: ['home', 'blog', 'content', 'insights', 'resources', 'trends', 'knowledge'],
  title: 'Knowledge & Inspiration | Your Source',
};

const Home = async () => {
  const [posts, sticky] = await Promise.all([
    getHomeData(),
    getPosts({ perPage: 3, stycky: true }),
  ]);

  return (
    <main>
      <Container>
        <HomeBanner posts={sticky?.posts} grid />

        {posts.map((postData) => (
          <Section
            key={postData.category.id}
            title={`${postData.category.name} Posts`}
            buttonUrl={`/category/${postData.category.slug}`}
          >
            <Grid variant="1">
              {Array.isArray(postData.posts) &&
                postData.posts.map((post) => (
                  <Post key={post.ID} post={post} image={post.images.medium_large} />
                ))}
            </Grid>
          </Section>
        ))}
      </Container>
    </main>
  );
};

export default Home;
