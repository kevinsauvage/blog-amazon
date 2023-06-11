import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import { getCategories } from '@/lib/wordpress/categories';

import '../styles/globals.scss';

const RootLayout = async ({ children }) => {
  const categories = await getCategories();

  return (
    <html lang="en" className="theme-light">
      <body>
        <Header categories={categories} />
        <div>{children}</div>
        <Footer categories={categories} />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;
