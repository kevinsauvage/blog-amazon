import { Poppins, Source_Sans_Pro as SourceSansPro } from 'next/font/google';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import { getCategories } from '@/lib/wordpress/categories';

import '../styles/globals.scss';
import styles from './layout.module.scss';

export const sourceSansPro = SourceSansPro({
  display: 'swap',
  subsets: ['latin'],
  variable: '--source-sans-pro-font',
  weight: ['400', '300', '600'],
});

export const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  variable: '--poppins-font',
  weight: ['700', '800'],
});

const RootLayout = async ({ children }) => {
  const categories = await getCategories();

  return (
    <html lang="en" className="theme-light">
      <body className={`${poppins.variable} ${sourceSansPro.variable}`}>
        <Header categories={categories} />
        <div className={styles.children}>{children}</div>
        <Footer categories={categories} />
        <ScrollTopButton />
      </body>
    </html>
  );
};

export default RootLayout;
