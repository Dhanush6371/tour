import type { ReactNode } from 'react';
import { ArrowRight, Clock3, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tourPath, type Tour } from '@/data/content';
import { cssVars } from '@/lib/cssVars';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHead({ eyebrow, title, accent, aside }: { eyebrow: string; title: string; accent: string; aside?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2">{title}<br /><em>{accent}</em></h2>
      </div>
      {aside}
    </div>
  );
}

export function PageHero({ eyebrow, title, accent, lede, image, imageAlt, actions }: {
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-hero wrap">
      <div className="page-hero-grid">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display">
            <span style={cssVars({ '--d': '0ms' })}><span>{title}</span></span>
            <span className="ital" style={cssVars({ '--d': '120ms' })}><span>{accent}</span></span>
          </h1>
          <p className="lede">{lede}</p>
          {actions && <div className="actions">{actions}</div>}
        </div>
        <div className="page-hero-media">
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

/** External booking link that always opens safely in a new tab. */
export function BookingButton({ href, className = 'btn btn-accent', children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  return (
    <Link to={tourPath(tour)} className="card tour-card" style={cssVars({ '--d': `${index * 70}ms` })}>
      <div className="card-media">
        <img src={tour.image} alt="" loading="lazy" />
        <span className="card-tag">{tour.category}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span><Clock3 size={14} /> {tour.duration}</span>
          <span className="rating"><Star size={14} fill="currentColor" /> {tour.rating}</span>
        </div>
        <h3>{tour.title}</h3>
        <p>{tour.description}</p>
        <div className="card-foot">
          <strong>{tour.price}</strong>
          <span>View tour <ArrowRight size={16} /></span>
        </div>
      </div>
    </Link>
  );
}

export function CTABand({ eyebrow, title, accent, text, actions }: { eyebrow: string; title: string; accent: string; text: string; actions: ReactNode }) {
  return (
    <div className="cta-band" data-reveal>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title} <em>{accent}</em></h2>
        <p>{text}</p>
      </div>
      <div className="actions">{actions}</div>
    </div>
  );
}
