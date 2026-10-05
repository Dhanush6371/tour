import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { useLockBody } from '@/hooks/useLockBody';
import { booking, photoCredits, tourPath, tours } from '@/data/content';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Paris Tours', to: '/paris-tours' },
  { label: 'Côte d’Azur', to: '/cote-dazur' },
  { label: 'Galeries Lafayette', to: '/galeries-lafayette' },
  { label: 'Contact', to: '/contact' },
];

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="France, home">
      <strong>France<span>.</span></strong>
      <small>Iconic destinations</small>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isScrolled = useNavbarScroll();
  const { pathname } = useLocation();
  useLockBody(open);

  // Close the menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header ${isScrolled || open ? 'is-scrolled' : ''}`}>
        <div className="wrap nav">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <SearchBar />
            <Link to="/paris-tours" className="btn btn-solid nav-cta">Book a tour</Link>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {navItems.map((item, i) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `m-link ${isActive ? 'active' : ''}`}>
              <span><small>0{i + 1}</small>{item.label}</span>
              <ArrowRight size={22} />
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <Link to="/paris-tours" className="btn btn-solid">Book a tour <ArrowRight size={18} /></Link>
          <a href={booking.paris} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            paristopsightstours.com <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const footerTours = tours.filter((tour) => ['wine-cheese-experience', 'montmartre-walking', 'louvre-museum', 'versailles-day-trip'].includes(tour.slug));

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <h2 className="footer-title">Let’s plan<br /><em>your France.</em></h2>
          <div className="actions">
            <Link to="/paris-tours" className="btn btn-solid">Browse tours <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <Logo />
            <p>Walking tours, wine tastings and skip-the-line experiences across Paris and the Riviera, with Paris Top Sights Tours.</p>
          </div>
          <div>
            <h3>Explore</h3>
            {navItems.slice(0, 4).map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          </div>
          <div>
            <h3>Popular tours</h3>
            {footerTours.map((tour) => <Link key={tour.id} to={tourPath(tour)}>{tour.title.replace(/^The /, '')}</Link>)}
          </div>
          <div>
            <h3>Help</h3>
            <Link to="/contact">Contact</Link>
            <Link to="/contact">Private itineraries</Link>
            <a href={booking.paris} target="_blank" rel="noopener noreferrer">Book online <ArrowUpRight size={14} /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 France. All rights reserved.</span>
          <details className="credits">
            <summary>Photo credits</summary>
            <ul>
              {photoCredits.map((credit) => (
                <li key={credit.subject}>
                  {credit.subject}: <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.author}</a>,{' '}
                  <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a>, via Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
