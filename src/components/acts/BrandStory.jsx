import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function BrandStory() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const lines = sectionRef.current.querySelectorAll('.story-line');

      if (isMobile) {
        // Simple fade in on mobile
        gsap.from(lines, {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      } else {
        // Pin + reveal on desktop
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
          },
        });

        lines.forEach((line, i) => {
          tl.from(line, {
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
            duration: 1,
          }, i * 0.8);
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-sand"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-0">
        <p className="font-accent text-rose-deep tracking-[0.2em] text-xs uppercase mb-8 story-line">
          Our Philosophy
        </p>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-[1.4] md:leading-[1.3]">
          <span className="story-line story-text block">
            わたしたちは信じています。
          </span>
          <span className="story-line story-text block mt-2 md:mt-4">
            いちばん美しいのは、
          </span>
          <span className="story-line story-text block mt-2 md:mt-4">
            <em className="font-accent text-rose-deep">素肌そのもの</em>だと。
          </span>
        </h2>

        <div className="mt-10 md:mt-14 max-w-lg">
          <p className="story-line text-sm md:text-base text-warm-gray leading-relaxed">
            haru.は、"塗る"のではなく"纏う"メイクを提案します。肌本来の透明感を引き出す最小限の処方で、あなたらしさがそのまま輝く。
          </p>
          <p className="story-line text-sm md:text-base text-warm-gray leading-relaxed mt-4">
            韓国済州島の天然カメリアと日本の先端テクノロジーが出会い、新しいスキンファーストメイクが生まれました。
          </p>
        </div>

        {/* Award badges */}
        <div className="story-line mt-10 md:mt-14 flex flex-wrap gap-4">
          {[
            { label: '@cosme BEST AWARD', year: '2024' },
            { label: 'MAQUIA ベスコス', year: '2024' },
            { label: 'VOCE 月間ランキング 1位', year: '2024' },
          ].map((award) => (
            <div
              key={award.label}
              className="px-4 py-2 border border-stone/30 rounded-full text-xs text-warm-gray"
            >
              {award.label} <span className="text-stone">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
