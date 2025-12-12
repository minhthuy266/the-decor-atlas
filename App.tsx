import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar, { Routes, Route, useLocation } from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import Category from './pages/Category';
import About from './pages/About';
import Shop from './pages/Shop';
import NewsletterModal from './components/NewsletterModal';

// ScrollToTop component to ensure view resets on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900 flex flex-col">
        <Navbar />
        <NewsletterModal />
        <ScrollToTop />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/tag/:slug" element={<Category />} />
            <Route path="/:slug" element={<Post />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;