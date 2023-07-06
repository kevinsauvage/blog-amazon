import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import useQueries from '@/hooks/useQueries';
import { fetchMenu } from '@/lib/api/menus';

import Listing from '../Listing/Listing';
import ListingBanner from '../ListingBanner/ListingBanner';
import ListingHeader from '../ListingHeader/ListingHeader';

import styles from './ListingPresenter.module.scss';

const ListingPresenter = async ({ context, title, subtitle, description, showSearch }) => {
  const [searchData, menu] = await Promise.all([useQueries(context), fetchMenu({ slug: 'main' })]);

  const { page, posts, q, sortsResponse, totalPages, totalPosts } = searchData || {};

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
        <Listing posts={posts} />
        <Pagination totalPages={totalPages} currentPage={page} navigate />
      </Container>
    </div>
  );
};

export default ListingPresenter;
