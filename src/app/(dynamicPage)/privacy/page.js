import DynamicPage from '@/components/DynamicPage/DynamicPage';
import pageMetadatas from '@/metadatas/pages';

const page = async () => <DynamicPage slug="privacy" />;

export default page;

export const metadata = pageMetadatas.privacy;
