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

    // Use a small timeout or requestAnimationFrame to ensure the DOM has updated
    // and to bypass any mobile browser scroll-locking during transition.
    const scrollHandler = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' to avoid conflicts with CSS smooth scroll
      });
    };

    scrollHandler();
    // Double-check after a short delay for mobile Safari/Chrome quirk
    const timer = setTimeout(scrollHandler, 10);
    
    return () => clearTimeout(timer);
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