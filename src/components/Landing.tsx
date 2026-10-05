import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Star } from 'lucide-react';
import { booking, categoriesOf, destinations, images, tourPath, toursFor } from '@/data/content';

const parisTours = toursFor('paris');
const parisCategories = categoriesOf(parisTours);
import { AnimatedCounter } from './AnimatedCounter';
import { BookingButton, CTABand, Eyebrow, SectionHead } from './Blocks';
import { cssVars } from '@/lib/cssVars';
import '@/landing.css';

// Placeholder reviews — replace with real guest reviews before going live.
const testimonials = [
  { quote: 'Our sommelier made every glass feel like a story. The best evening of our whole trip.', name: 'Sarah J.', tour: 'The Grand Wine & Cheese Experience' },
  { quote: 'We found corners of Montmartre we would never have discovered on our own. Pure magic.', name: 'Emma P.', tour: 'Montmartre Artists & Breakfast Walk' },
  { quote: 'Versailles without the queues, and a guide who brought every room to life.', name: 'Michael C.', tour: 'Versailles Palace Private Day Trip' },
];

const marqueeItems = ['Wine & Cheese', 'Montmartre', 'Seine River', 'The Louvre', 'Versailles', 'Eiffel Tower'];

/** Exposes scroll position as the --sy CSS variable (used for the hero parallax). */
function useScrollVar(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      rootRef.current?.style.setProperty('--sy', String(window.scrollY));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}

function Hero() {
  const featured = parisTours[0];
  return (
    <section className="lp-hero wrap">
      <div className="lp-hero-grid">
        <div>
          <Eyebrow>Paris Top Sights Tours</Eyebrow>
          <h1 className="display lp-title">
            <span style={cssVars({ '--d': '0ms' })}><span>See</span></span>
            <span className="clip" style={cssVars({ '--d': '120ms', '--clip-img': `url(${images.heroParisEiffel})` })}><span>Paris</span></span>
            <span className="ital" style={cssVars({ '--d': '240ms' })}><span>like a local.</span></span>
          </h1>
          <p className="lede">
            Handcrafted walking tours, wine tastings and skip-the-line experiences, led by guides who call this city home.
          </p>
          <div className="actions">
            <a href="#tours" className="btn btn-solid">Find your tour <ArrowRight size={18} /></a>
            <Link to="/contact" className="btn btn-ghost">Plan a private day</Link>
          </div>
        </div>

        <div className="lp-media-wrap">
          <div className="lp-media">
            <img src={images.heroParisEiffel} alt="The Eiffel Tower in Paris" />
          </div>
          <div className="lp-badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="lp-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <circle cx="100" cy="100" r="99" />
              <text textLength="495">
                <textPath href="#lp-circle">Viator Experience Award · Paris Top Sights ·</textPath>
              </text>
            </svg>
            <span className="lp-badge-core"><Star size={22} fill="currentColor" /></span>
          </div>
          <Link to={tourPath(featured)} className="lp-float">
            <img src={featured.image} alt="" />
            <span>
              <small><Star size={12} fill="currentColor" /> {featured.rating} · 389 reviews</small>
              <strong>{featured.title}</strong>
            </span>
          </Link>
        </div>
      </div>

      <div className="lp-hero-foot">
        <span className="lp-scroll"><i aria-hidden="true" /> Scroll to explore</span>
        <span>Walking tours · Food & wine · Museums · Day trips</span>
      </div>
    </section>
  );
}

function DestinationPanels() {
  const [active, setActive] = useState(0);
  return (
    <section className="wrap lp-dest">
      <SectionHead
        eyebrow="Beyond the city"
        title="Three faces"
        accent="of France"
        aside={(
          <p className="note">
            <span className="hover-only">Hover a destination to open it up.</span>
            <span className="touch-only">Swipe to explore.</span>
          </p>
        )}
      />
      <div className="lp-panels" data-reveal>
        {destinations.map((dest, i) => (
          <Link
            key={dest.title}
            to={dest.to}
            className={`lp-panel ${i === active ? 'is-active' : ''}`}
            style={cssVars({ '--img': `url(${dest.image})` })}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="lp-panel-num">0{i + 1}</span>
            <div className="lp-panel-body">
              <p className="lp-panel-eyebrow">{dest.eyebrow}</p>
              <h3>{dest.title}</h3>
              <p className="lp-panel-desc">{dest.description}</p>
              <span className="lp-panel-cta">Explore <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="lp-marquee" aria-hidden="true">
      <div className="lp-marquee-track">
        {items.map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
      </div>
    </div>
  );
}

function TourIndex() {
  const [filter, setFilter] = useState('All');
  const [activeId, setActiveId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const visible = filter === 'All' ? parisTours : parisTours.filter((tour) => tour.category === filter);

  // Move the floating preview with the cursor without re-rendering.
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }
  };

  return (
    <section id="tours" className="wrap section" onMouseMove={handleMove}>
      <SectionHead
        eyebrow="The collection"
        title="Six ways to"
        accent="fall for Paris"
        aside={(
          <div className="chips scroll-x" role="group" aria-label="Filter tours by category">
            {['All', ...parisCategories].map((item) => (
              <button key={item} type="button" className="chip" aria-pressed={filter === item} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      />

      <ol className="lp-list" key={filter} onMouseLeave={() => setActiveId(null)}>
        {visible.map((tour, i) => (
          <li key={tour.id} style={cssVars({ '--d': `${i * 70}ms` })}>
            <Link
              to={tourPath(tour)}
              className="lp-row"
              onMouseEnter={() => setActiveId(tour.id)}
              onFocus={() => setActiveId(tour.id)}
              onBlur={() => setActiveId(null)}
            >
              <span className="lp-row-num">{String(i + 1).padStart(2, '0')}</span>
              <img className="lp-row-thumb" src={tour.image} alt="" loading="lazy" />
              <span className="lp-row-title">{tour.title}</span>
              <span className="lp-row-meta">{tour.category}</span>
              <span className="lp-row-meta"><Clock3 size={15} /> {tour.duration}</span>
              <span className="lp-row-price">{tour.price}</span>
              <ArrowUpRight className="lp-row-arrow" size={26} />
            </Link>
          </li>
        ))}
      </ol>

      <div className="lp-index-foot">
        <Link to="/paris-tours" className="btn btn-ghost">See every tour <ArrowRight size={18} /></Link>
      </div>

      <div ref={previewRef} className={`lp-preview ${activeId ? 'is-on' : ''}`} aria-hidden="true">
        <div className="lp-preview-frame">
          {parisTours.map((tour) => (
            <img key={tour.id} src={tour.image} alt="" className={tour.id === activeId ? 'on' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="band-sand">
      <div className="wrap section">
        <SectionHead eyebrow="Why travellers choose us" title="Small groups," accent="big memories" />
        <div className="lp-stats">
          <div className="lp-stat" data-reveal style={cssVars({ '--d': '0ms' })}>
            <strong><AnimatedCounter end={389} /></strong>
            <span>Reviews on our signature wine tour</span>
          </div>
          <div className="lp-stat" data-reveal style={cssVars({ '--d': '100ms' })}>
            <strong>4.9</strong>
            <span>Average guest rating</span>
          </div>
          <div className="lp-stat" data-reveal style={cssVars({ '--d': '200ms' })}>
            <strong><AnimatedCounter end={45} suffix="+" /></strong>
            <span>Attractions with the GO CITY pass</span>
          </div>
          <div className="lp-stat" data-reveal style={cssVars({ '--d': '300ms' })}>
            <strong><AnimatedCounter end={50} suffix="%" /></strong>
            <span>Maximum savings on top sights</span>
          </div>
        </div>

        <div className="lp-pass">
          <CTABand
            eyebrow="In partnership with GO CITY"
            title="One pass for Paris’s"
            accent="greatest sights."
            text="Choose the All-Inclusive or Explorer pass and save up to 50% at more than 45 attractions, tours and experiences, from the Eiffel Tower to the Louvre."
            actions={<BookingButton href={booking.paris} className="btn btn-solid">Get the Paris Pass <ArrowUpRight size={18} /></BookingButton>}
          />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => window.clearInterval(id);
  }, [total]);

  const current = testimonials[index];
  return (
    <section className="wrap section lp-quotes" data-reveal>
      <Eyebrow>Traveller notes</Eyebrow>
      <div aria-live="polite">
        <blockquote key={index} className="lp-quote">
          <p>“{current.quote}”</p>
          <footer><strong>{current.name}</strong> · {current.tour}</footer>
        </blockquote>
      </div>
      <div className="lp-quote-nav">
        <button type="button" className="icon-btn" aria-label="Previous review" onClick={() => setIndex((index - 1 + total) % total)}>
          <ArrowLeft size={20} />
        </button>
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <button type="button" className="icon-btn" aria-label="Next review" onClick={() => setIndex((index + 1) % total)}>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

function MagneticLink({ to, children }: { to: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <Link ref={ref} to={to} className="lp-magnet" onMouseMove={handleMove} onMouseLeave={reset}>
      {children}
    </Link>
  );
}

function FinalCall() {
  return (
    <section className="wrap section lp-final">
      <h2 data-reveal>Your Paris<br /><em>starts here.</em></h2>
      <div className="lp-final-actions" data-reveal>
        <MagneticLink to="/paris-tours">Book a<br />tour</MagneticLink>
        <Link to="/contact" className="text-link">or ask us anything</Link>
      </div>
    </section>
  );
}

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollVar(rootRef);

  return (
    <div ref={rootRef}>
      <Hero />
      <DestinationPanels />
      <Marquee />
      <TourIndex />
      <Proof />
      <Testimonials />
      <FinalCall />
    </div>
  );
}
