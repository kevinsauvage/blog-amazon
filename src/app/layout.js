import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import apiCalls from '@/lib/api';

import '../styles/globals.scss';

const { getSingleType } = apiCalls;

const CATEGORIES_NAME = 'Categories';
const MAIN_NAME = 'Main';
const USEFULL_LINKS_NAME = 'UsefullLinks';

const GLOBAL_CONTEXT_NAME = 'global';

const RootLayout = async ({ children }) => {
  const globalContext = await getSingleType({ slug: GLOBAL_CONTEXT_NAME });
  const { shortAbout, siteName, menus } = globalContext || {};

  const usefullLinksMenu = menus?.find((menu) => menu.title === USEFULL_LINKS_NAME);
  const categoriesMenu = menus?.find((menu) => menu.title === CATEGORIES_NAME);
  const mainMenu = menus?.find((menu) => menu.title === MAIN_NAME);

  return (
    <html lang="en" className="theme-light">
      <body>
        <Header menu={mainMenu} usefullLinks={usefullLinksMenu} siteName={siteName} />
        {children}
        <Footer usefullLinks={usefullLinksMenu} categories={categoriesMenu} about={shortAbout} />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;
