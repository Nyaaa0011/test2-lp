import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AWARDS_HEADLINE, AWARD_LOGOS, AWARD_DETAILS } from '../../data/awards';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function AwardsSection() {
  const sectionRef = useRef(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.award-badge', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <div className="mb-10">
          <p className="font-accent text-rose-deep tracking-[0.2em] text-xs uppercase mb-3">
            Best Cosmetics Awards
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-accent text-6xl md:text-7xl text-charcoal">
              {AWARDS_HEADLINE.count}
            </span>
            <span className="font-serif text-xl md:text-2xl text-charcoal">
              {AWARDS_HEADLINE.label}
            </span>
          </div>
          <p className="text-[10px] text-stone">{AWARDS_HEADLINE.note}</p>
        </div>

        {/* Award badges grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {AWARD_LOGOS.map((award, i) => (
            <div
              key={i}
              className="award-badge bg-cream rounded-xl p-4 md:p-5 text-center"
            >
              <p className="font-serif text-sm text-charcoal leading-tight mb-1">
                {award.name}
              </p>
              <p className="text-[10px] text-stone mb-2">{award.category}</p>
              <span className="inline-block px-3 py-0.5 text-[10px] font-medium tracking-wider bg-rose-light text-rose-deep rounded-full">
                {award.rank}
              </span>
            </div>
          ))}
        </div>

        {/* Detail accordion */}
        <div className="border-t border-sand pt-4">
          <button
            onClick={() => setDetailOpen(!detailOpen)}
            className="text-xs text-warm-gray hover:text-rose-deep transition-colors cursor-pointer flex items-center gap-1 mx-auto"
          >
            <span>主な受賞一覧</span>
            <span className={`transition-transform duration-300 ${detailOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              detailOpen ? 'max-h-[600px] mt-4' : 'max-h-0'
            }`}
          >
            <ul className="text-left max-w-lg mx-auto space-y-1.5">
              {AWARD_DETAILS.map((detail, i) => (
                <li key={i} className="text-xs text-warm-gray flex gap-2">
                  <span className="text-rose-deep flex-shrink-0">・</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
