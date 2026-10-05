import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Compass, MapPin, Sparkles, Star, Users } from 'lucide-react';
import { booking, categoriesOf, destinationInfo, images, tours, toursFor, type DestinationId, type Tour } from '@/data/content';
import { BookingButton, CTABand, Eyebrow, PageHero, SectionHead, TourCard } from '@/components/Blocks';
import { cssVars } from '@/lib/cssVars';
import { Landing } from '@/components/Landing';

export function Home() {
  return <Landing />;
}

/* ---------------- SHARED: tour listing with filter chips ---------------- */

function TourListing({ list, id, label }: { list: Tour[]; id: string; label: string }) {
  const [filter, setFilter] = useState('All');
  const chips = useMemo(() => ['All', ...categoriesOf(list)], [list]);
  const visible = useMemo(() => (filter === 'All' ? list : list.filter((tour) => tour.category === filter)), [filter, list]);

  return (
    <>
      <h2 id={id} className="sr-only">{label}</h2>
      <div className="toolbar">
        {chips.length > 2 ? (
          <div className="chips scroll-x" role="group" aria-label="Filter tours by category">
            {chips.map((category) => (
              <button key={category} type="button" className="chip" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
        ) : <span />}
        <p className="count" aria-live="polite">{visible.length} experience{visible.length === 1 ? '' : 's'}</p>
      </div>
      <div className="tour-grid" key={filter}>
        {visible.map((tour, i) => <TourCard key={tour.id} tour={tour} index={i} />)}
      </div>
    </>
  );
}

/** "Experiences" section for the Riviera and Lafayette pages. */
function DestinationTours({ destination, title, accent }: { destination: DestinationId; title: string; accent: string }) {
  const id = `${destination}-tours`;
  return (
    <section id="experiences" className="wrap section" aria-labelledby={id}>
      <SectionHead eyebrow="Experiences" title={title} accent={accent} />
      <TourListing list={toursFor(destination)} id={id} label={`${destinationInfo[destination].label} tours`} />
    </section>
  );
}

/** Book button: external tours open the booking site, demo tours go to the enquiry form. */
function BookTour({ tour, children }: { tour: Tour; children: ReactNode }) {
  return tour.bookingUrl.startsWith('/')
    ? <Link to={tour.bookingUrl} className="btn btn-accent">{children}</Link>
    : <BookingButton href={tour.bookingUrl}>{children}</BookingButton>;
}

/* ---------------- PARIS TOURS ---------------- */

export function ParisTours() {
  const parisTours = toursFor('paris');

  return (
    <>
      <PageHero
        eyebrow="Paris Top Sights Tours"
        title="Paris,"
        accent="your way."
        lede="Small-group walks, wine tastings and skip-the-line visits to the city’s great museums and palaces. Pick a mood and we’ll take care of the rest."
        image={images.seineBridge}
        imageAlt="Pont Alexandre III over the Seine at dusk"
      />

      <section className="wrap section-tight" aria-labelledby="paris-tours">
        <TourListing list={parisTours} id="paris-tours" label="All Paris tours" />
      </section>

      <section className="wrap section">
        <CTABand
          eyebrow="Private itineraries"
          title="Make a day"
          accent="of it."
          text="Tell us what you’d love to see, taste and remember, and we’ll shape a private day around it."
          actions={(
            <>
              <Link to="/contact" className="btn btn-solid">Plan a private day <ArrowRight size={18} /></Link>
              <BookingButton href={booking.paris} className="btn btn-ghost">Book online <ArrowUpRight size={18} /></BookingButton>
            </>
          )}
        />
      </section>
    </>
  );
}

/* ---------------- TOUR DETAILS ---------------- */

export function TourDetails() {
  const { slug } = useParams();
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return <NotFound />;

  const price = tour.price.replace('From ', '');
  const place = destinationInfo[tour.destination];
  const isEnquiry = tour.bookingUrl.startsWith('/');
  // Same destination first, then fill from the rest
  const more = [
    ...tours.filter((item) => item.id !== tour.id && item.destination === tour.destination),
    ...tours.filter((item) => item.destination !== tour.destination),
  ].slice(0, 3);

  return (
    <>
      <section className="wrap td-head">
        <Link to={place.to} className="back-link"><ArrowLeft size={16} /> All {place.label} {tour.destination === 'paris' ? '' : 'experiences'}</Link>
        <Eyebrow>{tour.category}</Eyebrow>
        <h1 className="td-title">{tour.title}</h1>
        <ul className="td-facts">
          <li className="fact star"><Star size={15} fill="currentColor" /> {tour.rating} guest rating</li>
          <li className="fact"><Clock3 size={15} /> {tour.duration}</li>
          <li className="fact"><MapPin size={15} /> {tour.meetingPoint}</li>
        </ul>
        <div className="td-media">
          <img src={tour.image} alt={tour.title} />
        </div>
      </section>

      <section className="wrap section-tight">
        <div className="td-body">
          <div>
            <p className="td-lead" data-reveal>{tour.description}</p>

            <div className="td-block" data-reveal>
              <h2>Highlights</h2>
              <ul className="check-list">
                {tour.highlights.map((item) => <li key={item}><Check size={18} />{item}</li>)}
              </ul>
            </div>

            <div className="td-block" data-reveal>
              <h2>What’s included</h2>
              <ul className="pill-list">
                {tour.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="td-block" data-reveal>
              <h2>About this experience</h2>
              <p>{place.about}</p>
            </div>
          </div>

          <aside className="book-card" aria-label="Book this tour">
            <Eyebrow>Your experience</Eyebrow>
            <div className="book-price"><small>From</small><strong>{price}</strong></div>
            <div className="book-rows">
              <div><Clock3 size={17} /><span>{tour.duration}</span></div>
              <div><MapPin size={17} /><span>{tour.meetingPoint}</span></div>
              <div><Star size={17} /><span>{tour.rating} average guest rating</span></div>
            </div>
            <BookTour tour={tour}>
              {isEnquiry ? <>Request to book <ArrowRight size={18} /></> : <>Book this experience <ArrowUpRight size={18} /></>}
            </BookTour>
            <p className="book-note">
              {isEnquiry ? 'Send us your dates and we’ll confirm availability.' : 'You’ll finish booking on paristopsightstours.com'}
            </p>
          </aside>
        </div>
      </section>

      <section className="wrap section">
        <SectionHead
          eyebrow="Keep exploring"
          title="You might"
          accent="also love"
          aside={<Link to={place.to} className="btn btn-ghost">More {place.label} <ArrowRight size={18} /></Link>}
        />
        <div className="tour-grid snap-row">
          {more.map((item, i) => <TourCard key={item.id} tour={item} index={i} />)}
        </div>
      </section>

      {/* Sticky booking bar, shown on phones and tablets only */}
      <div className="mobile-book">
        <div><small>From</small><strong>{price}</strong></div>
        <BookTour tour={tour}>{isEnquiry ? 'Request' : 'Book now'} {isEnquiry ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}</BookTour>
      </div>
    </>
  );
}

/* ---------------- CÔTE D'AZUR ---------------- */

const rivieraPlaces = [
  { name: 'Nice', image: images.nice, alt: 'The Promenade des Anglais in Nice', text: 'Sun-warmed promenades, blue shutters and the easy rhythm of the Baie des Anges.' },
  { name: 'Monaco', image: images.monaco, alt: 'Yachts in Port Hercule, Monaco', text: 'A pocket-sized principality where glamour meets the Mediterranean.' },
  { name: 'Villefranche-sur-Mer', image: images.riviera, alt: 'The bay of Villefranche-sur-Mer', text: 'A pastel harbour village tucked between Nice and Monaco, around one of the Riviera’s loveliest bays.' },
];

export function CoteDAzur() {
  return (
    <>
      <PageHero
        eyebrow="The French Riviera"
        title="Côte"
        accent="d’Azur."
        lede="Where the Mediterranean meets timeless French elegance: long lunches, salt air and the scenic route, always."
        image={images.riviera}
        imageAlt="The bay of Villefranche-sur-Mer on the French Riviera"
        actions={(
          <>
            <a href="#experiences" className="btn btn-solid">See Riviera tours <ArrowRight size={18} /></a>
            <Link to="/contact" className="btn btn-ghost">Plan a private day</Link>
          </>
        )}
      />

      <DestinationTours destination="riviera" title="Days on the" accent="Riviera" />

      <section className="wrap section">
        <div className="intro">
          <div data-reveal>
            <Eyebrow>Discover the Riviera</Eyebrow>
            <h2 className="h2">A life lived<br /><em>in colour</em></h2>
          </div>
          <div data-reveal style={cssVars({ '--d': '120ms' })}>
            <p>
              The South of France is a feeling as much as a place. Follow the coast from the blue of Nice to the glamour of Monaco,
              with time for long lunches, salt air and the pleasure of taking the scenic route.
            </p>
            <Link to="/contact" className="text-link">Ask about Riviera experiences <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="band-sand">
        <div className="wrap section">
          <SectionHead eyebrow="Featured destinations" title="Along the" accent="coast" />
          <div className="place-grid snap-row">
            {rivieraPlaces.map((place, i) => (
              <article key={place.name} className="card" data-reveal style={cssVars({ '--d': `${i * 100}ms` })}>
                <div className="card-media tall"><img src={place.image} alt={place.alt} loading="lazy" /></div>
                <div className="card-body">
                  <p className="card-kicker">Côte d’Azur</p>
                  <h3>{place.name}</h3>
                  <p>{place.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <CTABand
          eyebrow="The Riviera is calling"
          title="Your seat"
          accent="by the sea."
          text="Let’s shape a day along the coast that feels entirely yours."
          actions={<Link to="/contact" className="btn btn-solid">Start planning <ArrowRight size={18} /></Link>}
        />
      </section>
    </>
  );
}

/* ---------------- GALERIES LAFAYETTE ---------------- */

export function GaleriesLafayette() {
  const info = [
    { icon: Clock3, label: 'Opening hours', title: 'Monday – Saturday', text: '10:00 – 20:30 · Sunday 11:00 – 20:00' },
    { icon: MapPin, label: 'Location', title: '40 Boulevard Haussmann', text: '75009 Paris, France' },
    { icon: Sparkles, label: 'Good to know', title: 'Go up to the rooftop', text: 'The terrace has one of the best free views across Paris.' },
  ];

  return (
    <>
      <PageHero
        eyebrow="A Parisian icon"
        title="Galeries"
        accent="Lafayette."
        lede="Fashion, luxury and culture beneath one of the most beautiful glass domes in the world."
        image={images.lafayette}
        imageAlt="The art nouveau glass dome of Galeries Lafayette"
        actions={<a href="#experiences" className="btn btn-solid">See experiences <ArrowRight size={18} /></a>}
      />

      <DestinationTours destination="lafayette" title="Lafayette," accent="your way" />

      <section className="wrap section">
        <div className="intro">
          <div data-reveal>
            <Eyebrow>Luxury shopping</Eyebrow>
            <h2 className="h2">Where Paris<br /><em>comes together</em></h2>
          </div>
          <div data-reveal style={cssVars({ '--d': '120ms' })}>
            <p>
              More than a department store, Galeries Lafayette is a landmark of Parisian style. Discover the art nouveau dome,
              the latest collections and a view across the city from the rooftop terrace.
            </p>
            <Link to="/contact" className="text-link">Ask about a hosted shopping visit <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="band-sand">
        <div className="wrap section">
          <SectionHead eyebrow="Plan your visit" title="Take your" accent="time" />
          <div className="info-grid">
            {info.map(({ icon: Icon, label, title, text }, i) => (
              <div key={label} className="info-card" data-reveal style={cssVars({ '--d': `${i * 100}ms` })}>
                <Icon size={26} strokeWidth={1.6} />
                <p className="card-kicker">{label}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <CTABand
          eyebrow="Make a day of it"
          title="Shopping, then"
          accent="the city."
          text="Pair your visit with a walking tour or a wine tasting nearby."
          actions={<Link to="/paris-tours" className="btn btn-solid">Browse Paris tours <ArrowRight size={18} /></Link>}
        />
      </section>
    </>
  );
}

/* ---------------- CONTACT ---------------- */

export function Contact() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  // NOTE: not connected to a backend yet — this only shows a confirmation.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('name') ?? '').trim();
    setSentTo(name.split(' ')[0] || 'there');
  };

  return (
    <section className="wrap contact-page">
      <div className="contact-grid">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="display">
            <span><span>Let’s talk</span></span>
            <span className="ital" style={cssVars({ '--d': '120ms' })}><span>France.</span></span>
          </h1>
          <p className="lede">For private itineraries, group enquiries or help choosing the right experience, send us a note.</p>
          <ul className="contact-points">
            <li><Compass /><div><strong>Private itineraries</strong><span>A day shaped around what you want to see.</span></div></li>
            <li><Users /><div><strong>Groups & celebrations</strong><span>Families, birthdays and team trips.</span></div></li>
            <li><CalendarDays /><div><strong>Booking help</strong><span>Dates, tickets and passes, sorted.</span></div></li>
          </ul>
          <BookingButton href={booking.paris} className="text-link">Prefer to book now? Visit paristopsightstours.com <ArrowUpRight size={16} /></BookingButton>
        </div>

        {sentTo ? (
          <div className="form form-success" role="status">
            <span className="success-icon"><Check size={26} /></span>
            <h2>Thank you, {sentTo}.</h2>
            <p>We’ve got your note and will be in touch soon.</p>
            <button type="button" className="btn btn-ghost" onClick={() => setSentTo(null)}>Send another message</button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field">
                <span>Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" inputMode="email" required />
              </label>
            </div>
            <div className="form-row">
              <label className="field">
                <span>I’m interested in</span>
                <select name="interest" defaultValue="">
                  <option value="" disabled>Choose an option</option>
                  {tours.map((tour) => <option key={tour.id}>{tour.title}</option>)}
                  <option>A private itinerary</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="field">
                <span>Travel date (optional)</span>
                <input type="date" name="date" />
              </label>
            </div>
            <label className="field">
              <span>How can we help?</span>
              <textarea name="message" rows={5} placeholder="Tell us a little about your plans" required />
            </label>
            <button className="btn btn-solid" type="submit">Send enquiry <ArrowRight size={18} /></button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- 404 ---------------- */

export function NotFound() {
  return (
    <section className="wrap nf">
      <Eyebrow>Oh là là</Eyebrow>
      <h1 className="display">
        <span><span>That page has</span></span>
        <span className="ital" style={cssVars({ '--d': '120ms' })}><span>gone wandering.</span></span>
      </h1>
      <p className="lede">The page you’re after doesn’t exist, but Paris is still right here.</p>
      <div className="actions">
        <Link to="/" className="btn btn-solid">Back home <ArrowRight size={18} /></Link>
        <Link to="/paris-tours" className="btn btn-ghost">Browse tours</Link>
      </div>
    </section>
  );
}
