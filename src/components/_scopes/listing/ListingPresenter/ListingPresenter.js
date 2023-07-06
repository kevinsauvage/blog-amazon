import Container from '@/components/Container/Container';
import useQueries from '@/hooks/useQueries';
import { fetchMenu } from '@/lib/api/menus';

import Listing from '../Listing/Listing';
import ListingBanner from '../ListingBanner/ListingBanner';
import ListingHeader from '../ListingHeader/ListingHeader';

import styles from './ListingPresenter.module.scss';

const ListingPresenter = async ({ context, title, subtitle, description, showSearch }) => {
  const [searchData, menu] = await Promise.all([useQueries(context), fetchMenu({ slug: 'main' })]);
  const { posts, q, sortsResponse, totalPages, totalPosts } = searchData || {};

  return (
    <div className={styles.presenter}>
      <ListingBanner
        title={title}
        subtitle={subtitle}
        description={description}
        query={q}
        showSearch={showSearch}
      />
      <Container>
        <ListingHeader totalPosts={totalPosts} sorts={sortsResponse} menu={menu} />
        <Listing posts={posts} totalPages={totalPages} />
      </Container>
    </div>
  );
};

export default ListingPresenter;
