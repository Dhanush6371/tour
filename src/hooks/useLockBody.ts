import { useEffect } from 'react';

/** Stops the page behind an overlay (menu, search) from scrolling while it's open. */
export function useLockBody(active: boolean) {
  useEffect(() => {
    if (!active) return;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [active]);
}
