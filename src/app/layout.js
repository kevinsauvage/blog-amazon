import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import apiCalls from '@/lib/api';

import '../styles/globals.scss';

const { fetchMenu } = apiCalls;

const RootLayout = async ({ children }) => {
  const [mainMenu, usefullLinks, categoriesMenu] = await Promise.all([
    fetchMenu({ slug: 'main' }),
    fetchMenu({ slug: 'usefullLinks' }),
    fetchMenu({ slug: 'categories' }),
  ]);

  return (
    <html lang="en" className="theme-light">
      <body>
        <Header menu={mainMenu} usefullLinks={usefullLinks} />
        {children}
        <Footer usefullLinks={usefullLinks} categories={categoriesMenu} />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;
