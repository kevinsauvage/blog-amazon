import DynamicPage from '@/components/DynamicPage/DynamicPage';
import pageMetadatas from '@/metadatas/pages';

const page = async () => <DynamicPage slug="terms" />;

export default page;

export const metadata = pageMetadatas.terms;
