import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isMobile || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDot = gsap.quickTo(dot, 'css', { duration: 0.1 });
    const moveRing = gsap.quickTo(ring, 'css', { duration: 0.3 });

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3.out' });

    const onMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnterInteractive = () => {
      dot.parentElement.classList.add('cursor-state-hover');
    };
    const onLeaveInteractive = () => {
      dot.parentElement.classList.remove('cursor-state-hover');
    };

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) return null;

  return (
    <div className="custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none">
      <div
        ref={dotRef}
        className="cursor-dot fixed -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
