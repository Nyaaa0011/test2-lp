import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flower2 } from 'lucide-react';
import { HERO_INGREDIENT, SUB_INGREDIENTS } from '../../data/ingredients';
import SectionHeading from '../ui/SectionHeading';
import IngredientCard from '../ui/IngredientCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function IngredientsSection() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          },
        });
      }
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scale: 0.9,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        });
      }
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="ingredients" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="./images/ingredients-bg.mp4" type="video/mp4" />
      </video>
      {/* Overlay to soften video */}
      <div className="absolute inset-0 bg-cream/80 backdrop-blur-[2px]" />

      <div className="relative px-4 md:px-8">
        <SectionHeading en="Ingredients" ja="配合成分" />

        {/* Hero ingredient */}
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #B8C5B2 0%, #D4DDD0 50%, #F0EBE3 100%)',
          }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Flower2
                size={48}
                strokeWidth={1}
                color={HERO_INGREDIENT.iconColor}
                className="md:w-14 md:h-14"
              />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-charcoal/60">
                Key Ingredient — {HERO_INGREDIENT.percentage}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-1 mb-1">
                {HERO_INGREDIENT.nameJa}
              </h3>
              <p className="text-xs text-charcoal/50 mb-3">{HERO_INGREDIENT.name}</p>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {HERO_INGREDIENT.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sub ingredients grid */}
        <div
          ref={gridRef}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {SUB_INGREDIENTS.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </section>
  );
}
