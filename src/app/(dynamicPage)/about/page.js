import DynamicPage from '@/components/DynamicPage/DynamicPage';
import pageMetadatas from '@/metadatas/pages';

const page = async () => <DynamicPage slug="about" />;

export default page;

export const metadata = pageMetadatas.about;
