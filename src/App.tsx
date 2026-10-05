import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Navbar } from '@/components/SiteChrome';
import { Contact, CoteDAzur, GaleriesLafayette, Home, NotFound, ParisTours, TourDetails } from '@/pages';

/** Per-route side effects: jump to the top and arm scroll-reveal animations. */
function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = '';
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paris-tours" element={<ParisTours />} />
          <Route path="/tours/:slug" element={<TourDetails />} />
          {/* Old links keep working */}
          <Route path="/paris-tours/:slug" element={<TourDetails />} />
          <Route path="/cote-dazur" element={<CoteDAzur />} />
          <Route path="/galeries-lafayette" element={<GaleriesLafayette />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
