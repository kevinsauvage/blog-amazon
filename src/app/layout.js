import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import apiCalls from '@/lib/api';
import pageMetadatas from '@/metadatas/pages';

import '../styles/globals.scss';

const { getSingleType } = apiCalls;

const RootLayout = async ({ children }) => {
  const globalContext = await getSingleType({ slug: 'global' });
  const { shortAbout, siteName, menus } = globalContext || {};

  const usefullLinksMenu = menus?.find((menu) => menu.title === 'UsefullLinks');
  const categoriessMenu = menus?.find((menu) => menu.title === 'Categories');
  const mainMenu = menus?.find((menu) => menu.title === 'Main');

  return (
    <html lang="en" className="theme-light">
      <body>
        <Header menu={mainMenu} usefullLinks={usefullLinksMenu} siteName={siteName} />
        {children}
        <Footer usefullLinks={usefullLinksMenu} categories={categoriessMenu} about={shortAbout} />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = pageMetadatas.home;
