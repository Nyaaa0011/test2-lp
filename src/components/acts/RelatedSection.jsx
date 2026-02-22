import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RELATED_PRODUCTS } from '../../data/related';
import SectionHeading from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function RelatedSection() {
  const cardsRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="py-20 md:py-28 bg-cream px-4 md:px-8">
      <SectionHeading en="Related" ja="一緒に使って、もっと体感" />

      {/* Routine guide */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-xs text-stone">
          <span className="px-3 py-1 rounded-full bg-sand text-charcoal">Primer</span>
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-stone/40"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          <span className="px-3 py-1 rounded-full bg-rose-light text-charcoal">Foundation</span>
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-stone/40"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          <span className="px-3 py-1 rounded-full bg-rose-light text-charcoal">Lip</span>
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-stone/40"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          <span className="px-3 py-1 rounded-full bg-sand text-charcoal">Lip Oil</span>
        </div>
        <p className="text-center text-[10px] text-stone mt-3">
          haru.のラインで揃えると、透明感の相乗効果を最大限に。
        </p>
      </div>

      <div
        ref={cardsRef}
        className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      >
        {RELATED_PRODUCTS.map((product, i) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            {/* Visual */}
            <div
              className="aspect-[3/2] flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #FBF8F5 0%, ${product.color} 100%)`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-center drop-shadow-md p-6 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Use timing hint */}
              <div className="absolute top-3 left-3">
                <span className="text-[9px] px-2 py-1 bg-white/70 backdrop-blur-sm rounded-full text-charcoal">
                  {i === 0 ? 'ベースメイク前に' : 'ナイトケアに'}
                </span>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <p className="font-serif text-lg text-charcoal mb-0.5">{product.name}</p>
              <p className="text-xs text-stone mb-2">{product.nameJa}</p>
              <p className="text-sm text-warm-gray mb-3">{product.tagline}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.features.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-cream text-warm-gray"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-sand pt-3">
                <span className="font-accent text-xl text-charcoal">{product.price}</span>
                <span className="text-xs text-rose-deep hover:text-charcoal transition-colors cursor-pointer">
                  商品詳細 →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
