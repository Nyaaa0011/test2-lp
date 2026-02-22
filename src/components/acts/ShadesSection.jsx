import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import ShadeSwatches from '../ui/ShadeSwatches';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ShadesSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.shade-group'), {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="shades" ref={sectionRef} className="py-20 md:py-28 bg-cream px-4 md:px-8">
      <SectionHeading en="Shades & Texture" ja="カラー展開" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="shade-group">
            {/* Texture visual with product image */}
            <div
              className="aspect-video rounded-2xl mb-6 overflow-hidden relative"
              style={{
                background:
                  product.category === 'foundation'
                    ? 'linear-gradient(135deg, #FBF8F5 0%, #F5E6D3 40%, #DFC5B5 70%, #C9A882 100%)'
                    : `linear-gradient(135deg, ${product.shades[0].hex} 0%, ${product.shades[1].hex} 33%, ${product.shades[2].hex} 66%, ${product.shades[3].hex} 100%)`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain object-center drop-shadow-md p-4"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-end p-5">
                <span className="text-xs text-charcoal/50 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  {product.category === 'foundation' ? 'Dewy Finish' : 'Water Tint'}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-xl text-charcoal mb-1">{product.name}</h3>
            <p className="text-xs text-stone mb-4">{product.shades.length}色展開</p>

            <ShadeSwatches shades={product.shades} productName={product.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
