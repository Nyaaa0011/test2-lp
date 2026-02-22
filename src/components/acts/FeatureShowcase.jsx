import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function FeatureShowcase() {
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="products" className="py-20 md:py-28 bg-cream px-4 md:px-8">
      <SectionHeading en="Products" ja="プロダクト" />

      <div
        ref={gridRef}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
