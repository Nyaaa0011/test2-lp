import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function RevealText({ children, className = '', as: Tag = 'p', delay = 0 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
