import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function StatCard({ stat }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const animated = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current || animated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = Math.round(obj.val);
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [reduced, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-0.5">
        <span
          ref={numRef}
          className="font-accent text-5xl md:text-6xl text-charcoal"
        >
          {reduced ? stat.value : 0}
        </span>
        <span className="font-accent text-2xl text-rose-deep">{stat.unit}</span>
      </div>
      <p className="text-sm text-warm-gray mt-2">{stat.label}</p>
    </div>
  );
}
