import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SUSTAINABILITY_STATS, SUSTAINABILITY_NOTE } from '../../data/sustainability';
import SectionHeading from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ECO_ICONS = [
  /* Leaf - CO2 reduction */
  <svg key="leaf" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
    <path d="M8 28C8 28 8 16 20 8c0 0-4 12-12 20z" fill="#B8C5B2" opacity="0.3"/>
    <path d="M8 28C8 28 8 16 20 8" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 28c4-6 8-10 12-12" stroke="#B8C5B2" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>,
  /* Recycle - recycled materials */
  <svg key="recycle" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
    <path d="M16 6l4 6H12l4-6z" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14l-4 6h8" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 14l4 6h-8" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 20l4 6 2-3" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 20l-4 6-2-3" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 26h4l-2-3" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  /* Sun - clean energy */
  <svg key="sun" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
    <circle cx="16" cy="16" r="5" fill="#B8C5B2" opacity="0.2" stroke="#B8C5B2" strokeWidth="1.5"/>
    <path d="M16 6v3M16 23v3M6 16h3M23 16h3M9.5 9.5l2 2M20.5 20.5l2 2M22.5 9.5l-2 2M11.5 20.5l-2 2" stroke="#B8C5B2" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
];

const CERTIFICATIONS = [
  { label: 'クルエルティフリー', desc: '動物実験なし' },
  { label: 'ヴィーガン処方', desc: '動物由来成分不使用' },
  { label: 'FSC認証紙', desc: 'パッケージ素材' },
];

export default function SustainabilitySection() {
  const cardsRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.children;
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });

      // Counter animation
      Array.from(cards).forEach((card) => {
        const numEl = card.querySelector('.sus-stat');
        if (!numEl) return;
        const target = parseInt(numEl.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          onUpdate: () => {
            if (numEl) numEl.textContent = Math.round(obj.val);
          },
        });
      });
    }, cardsRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="py-20 md:py-28 bg-sage/10 px-4 md:px-8">
      <SectionHeading en="Sustainability" ja="サステナビリティ" />

      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-sm text-warm-gray leading-relaxed">{SUSTAINABILITY_NOTE}</p>
      </div>

      <div
        ref={cardsRef}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
      >
        {SUSTAINABILITY_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              {ECO_ICONS[i]}
            </div>
            <div className="flex items-baseline justify-center gap-0.5 mb-1">
              <span
                className="sus-stat font-accent text-5xl text-sage"
                data-value={stat.value}
              >
                {reduced ? stat.value : 0}
              </span>
              <span className="font-accent text-xl text-sage">{stat.unit}</span>
            </div>
            <p className="text-xs font-medium text-charcoal mb-3">{stat.label}</p>
            <p className="text-sm text-warm-gray leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="max-w-3xl mx-auto mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.label}
            className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-sage flex-shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] text-charcoal font-medium">{cert.label}</span>
            <span className="text-[10px] text-stone hidden md:inline">— {cert.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
