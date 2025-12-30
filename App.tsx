import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar, { Routes, Route, useLocation } from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import Category from './pages/Category';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import NewsletterModal from './components/NewsletterModal';

// ScrollToTop component to ensure view resets on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Disable browser's native scroll restoration to prevent it from jumping back
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      // Ensure we hit the top of the body and html
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Immediate attempt
    resetScroll();

    // Use requestAnimationFrame for mobile browser sync
    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    // Final fallback for slow mobile rendering
    const timer = setTimeout(resetScroll, 50);
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [location.pathname]);

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
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