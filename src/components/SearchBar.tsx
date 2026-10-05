import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { destinationInfo, tourPath, tours } from '@/data/content';
import { useLockBody } from '@/hooks/useLockBody';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  useLockBody(open);

  const q = query.trim().toLowerCase();
  const results = q
    ? tours.filter((tour) => [tour.title, tour.description, tour.category, tour.meetingPoint, destinationInfo[tour.destination].label].some((value) => value.toLowerCase().includes(q)))
    : tours;

  const close = () => {
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setQuery('');
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" className="icon-btn" aria-label="Search tours" onClick={() => setOpen(true)}>
        <Search size={18} />
      </button>

      {/* Portal: the header's backdrop-filter would otherwise trap this fixed overlay inside it */}
      {open && createPortal(
        <div className="search" role="dialog" aria-modal="true" aria-label="Search tours">
          <div className="search-inner">
            <div className="search-top">
              <span className="eyebrow">Search</span>
              <button type="button" className="icon-btn" aria-label="Close search" onClick={close}>
                <X size={20} />
              </button>
            </div>

            <label className="search-bar">
              <Search size={26} />
              <span className="sr-only">Search tours</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Wine, Louvre, Versailles…"
                autoFocus
                enterKeyHint="search"
              />
            </label>

            <p className="search-hint" aria-live="polite">
              {q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular experiences'}
            </p>

            {results.length > 0 ? (
              <ul className="search-results">
                {results.map((tour) => (
                  <li key={tour.id}>
                    <Link to={tourPath(tour)} className="search-result" onClick={close}>
                      <img src={tour.image} alt="" loading="lazy" />
                      <span>
                        <small>{destinationInfo[tour.destination].label} · {tour.category} · {tour.duration}</small>
                        <strong>{tour.title}</strong>
                      </span>
                      <span className="price">{tour.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-empty">No tours match “{query}”. Try “walking”, “wine” or “museum”.</p>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
