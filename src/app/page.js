import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import apiCalls from '@/lib/api/index';

const { getPosts, getCategories } = apiCalls;

const totalPostsByCategory = 3;

const getHomeData = async () => {
  const categories = await getCategories();
  const promises = categories.map((category) =>
    getPosts({ category: category.slug, perPage: totalPostsByCategory })
  );
  const data = await Promise.all(promises);

  return data.map((item, index) => {
    const { id, label, slug } = categories[index];
    return { category: { id, label, slug }, ...item };
  });
};

const Home = async () => {
  const [posts, sticky] = await Promise.all([getHomeData(), getPosts({ perPage: 3 })]);

  return (
    <main>
      <Container>
        <HomeBanner posts={sticky?.posts} grid />

        {posts.map((postData) => (
          <Section
            key={postData.category.id}
            title={`${postData.category.label} Posts`}
            buttonUrl={`/category/${postData.category.slug}`}
          >
            <Grid variant="1">
              {Array.isArray(postData.posts) &&
                postData.posts.map((post) => (
                  <Post key={post.id} post={post} image={post?.images?.medium} />
                ))}
            </Grid>
          </Section>
        ))}
      </Container>
    </main>
  );
};

export default Home;
