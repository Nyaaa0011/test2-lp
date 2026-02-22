import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function SectionHeading({ en, ja, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={`text-center mb-12 md:mb-16 ${className}`}>
      <p className="font-accent text-rose-deep tracking-[0.2em] text-sm uppercase mb-2">
        {en}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
        {ja}
      </h2>
    </div>
  );
}
