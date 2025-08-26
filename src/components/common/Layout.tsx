import { ReactNode } from 'react';
import Header from './Header';
import HorizontalNav from './HorizontalNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HorizontalNav />
      {/* Mobile: Header(64px) + Nav(~56px) = 120px, add extra padding for breathing room */}
      {/* Desktop: Header(120px) + Nav(~72px) = 192px */}
      <main className="pt-36 sm:pt-52 min-h-screen">
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;