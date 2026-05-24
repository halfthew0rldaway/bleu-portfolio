import { useState, useEffect } from 'react';

let cachedIsMobile: boolean | null = null;

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (cachedIsMobile !== null) return cachedIsMobile;
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint || 
      ('ontouchstart' in window && navigator.maxTouchPoints > 0);
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => {
      cachedIsMobile = e.matches;
      setIsMobile(e.matches);
    };
    
    cachedIsMobile = mq.matches;
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

export function getIsTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
