import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS, TESTIMONIALS } from '../../data/reviews';
import SectionHeading from '../ui/SectionHeading';
import StatCard from '../ui/StatCard';
import TestimonialCard from '../ui/TestimonialCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ReviewsSection() {
  const statsRef = useRef(null);
  const scrollRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      if (scrollRef.current) {
        gsap.from(scrollRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scrollRef.current,
            start: 'top 85%',
          },
        });
      }
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-sand px-4 md:px-8">
      <SectionHeading en="Reviews" ja="お客様の声" />

      {/* Stats */}
      <div
        ref={statsRef}
        className="max-w-3xl mx-auto grid grid-cols-3 gap-4 md:gap-8 mb-14 md:mb-20"
      >
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Testimonials - horizontal scroll on mobile */}
      <div className="max-w-5xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] text-stone mt-8 mb-12">
        ※ 2024年自社調べ（n=500）。個人の感想であり、効果を保証するものではありません。
      </p>

      {/* SNS Social Proof */}
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-[10px] tracking-[0.2em] uppercase text-stone mb-5">
          SNS & Media
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { platform: 'Instagram', metric: '12.8万+', label: '投稿数', tag: '#haru素肌メイク' },
            { platform: 'TikTok', metric: '560万+', label: '総再生回数', tag: '#haruコスメ' },
            { platform: 'YouTube', metric: '280+', label: 'レビュー動画', tag: '美容系YouTuber' },
            { platform: '@cosme', metric: '4.8', label: '平均評価 / 5.0', tag: 'ファンデ部門' },
          ].map((item) => (
            <div
              key={item.platform}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <p className="text-[10px] text-stone mb-1">{item.platform}</p>
              <p className="font-accent text-2xl text-charcoal">{item.metric}</p>
              <p className="text-[10px] text-warm-gray mt-0.5">{item.label}</p>
              <p className="text-[9px] text-rose-deep mt-1.5">{item.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
