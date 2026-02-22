import { useSyncExternalStore, useCallback } from 'react';

const queries = new Map();

function getOrCreateQuery(breakpoint) {
  if (queries.has(breakpoint)) return queries.get(breakpoint);
  const mq = typeof window !== 'undefined'
    ? window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    : null;
  queries.set(breakpoint, mq);
  return mq;
}

export function useIsMobile(breakpoint = 768) {
  const subscribe = useCallback((callback) => {
    const mq = getOrCreateQuery(breakpoint);
    if (!mq) return () => {};
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
  }, [breakpoint]);

  const getSnapshot = useCallback(() => {
    const mq = getOrCreateQuery(breakpoint);
    return mq ? mq.matches : false;
  }, [breakpoint]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
