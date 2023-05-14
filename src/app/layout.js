import { Poppins } from 'next/font/google';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import './globals.scss';

const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
};

const RootLayout = ({ children }) => (
  <html lang="en" className="theme-light">
    <body className={poppins.className}>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
