import DynamicPage from '@/components/DynamicPage/DynamicPage';
import pageMetadatas from '@/metadatas/pages';

const page = async () => <DynamicPage slug="cookie" />;

export default page;

export const metadata = pageMetadatas.cookie;
