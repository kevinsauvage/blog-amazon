import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import apiCalls from '@/lib/api';

import '../styles/globals.scss';

const { getMenu } = apiCalls;

const RootLayout = async ({ children }) => {
  const mainMenu = await getMenu({ slug: 'main-navigation' });

  return (
    <html lang="en" className="theme-light">
      <body>
        <Header menu={mainMenu} />
        {children}
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;
