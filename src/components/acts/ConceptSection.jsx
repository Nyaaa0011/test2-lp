import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, Heart, Feather } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ELEMENTS = [
  { Icon: Sparkles, label: '透明感', en: 'Clarity', color: '#C48B91' },
  { Icon: Droplets, label: 'うるおい', en: 'Moisture', color: '#7BAACC' },
  { Icon: Heart, label: '血色感', en: 'Radiance', color: '#E8B4B8' },
  { Icon: Feather, label: '軽やかさ', en: 'Lightness', color: '#B8C5B2' },
];

export default function ConceptSection() {
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
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
    <section className="py-16 md:py-24 bg-cream px-4 md:px-8">
      <SectionHeading en="Concept" ja="理想の素肌メイクを叶える4つの要素" />

      <div className="max-w-3xl mx-auto mb-8 text-center">
        <p className="text-sm text-warm-gray leading-relaxed">
          haru.が追求するのは、メイクしていることを忘れるほどの自然な仕上がり。
          4つの要素が重なり合うことで、あなたらしい美しさが完成します。
        </p>
      </div>

      <div
        ref={gridRef}
        className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {ELEMENTS.map((el) => (
          <div
            key={el.en}
            className="bg-white rounded-2xl p-5 md:p-6 text-center shadow-sm"
          >
            <el.Icon
              size={32}
              strokeWidth={1.2}
              color={el.color}
              className="mx-auto mb-3"
            />
            <p className="font-serif text-lg text-charcoal">{el.label}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-stone mt-0.5">
              {el.en}
            </p>
          </div>
        ))}
      </div>

      {/* Visual diagram */}
      <div className="max-w-xs mx-auto mt-10 relative">
        <div className="aspect-square rounded-full border border-dashed border-rose/40 flex items-center justify-center">
          <div className="aspect-square w-3/4 rounded-full border border-dashed border-rose-deep/30 flex items-center justify-center">
            <div className="text-center">
              <p className="font-serif text-lg text-charcoal">Skin First</p>
              <p className="font-accent italic text-rose-deep text-xs">your beauty, naturally</p>
            </div>
          </div>
        </div>
        {/* Corner labels */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-stone bg-cream px-2">透明感</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-xs text-stone bg-cream px-2">軽やかさ</span>
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-stone bg-cream px-2">うるおい</span>
        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-xs text-stone bg-cream px-2">血色感</span>
      </div>
    </section>
  );
}
