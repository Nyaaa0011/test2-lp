import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../../data/brand';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        delay: 0.3,
      }).from(
        videoRef.current,
        { opacity: 0, scale: 1.02, duration: 1.2 },
        '-=0.8'
      ).from(scrollRef.current, { opacity: 0, duration: 0.6 }, '-=0.4');

      if (!isMobile) {
        gsap.to(videoRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Background Video — right side */}
      <div
        ref={videoRef}
        className="absolute right-0 top-0 w-full md:w-1/2 h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="./images/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Fade edge into cream background */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to right, #FBF8F5 0%, transparent 30%)',
          }}
        />
        {/* Mobile overlay for text readability */}
        <div className="absolute inset-0 bg-cream/60 md:hidden pointer-events-none" />
      </div>

      {/* Center Content — dead center of screen */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6"
      >
        <img
          src="./images/logo-haru.png"
          alt={BRAND.name}
          className="w-56 md:w-72 lg:w-80 h-auto mx-auto mb-8"
        />

        <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-snug mb-4">
          素肌が、咲く。
        </p>

        <p className="text-sm md:text-base text-warm-gray leading-relaxed mb-2">
          まとうほどに透ける、スキンファーストメイク
        </p>

        <p className="font-accent italic text-rose-deep text-xs md:text-sm tracking-[0.2em] mb-8">
          {BRAND.taglineEn}
        </p>

        <a
          href="#products"
          className="inline-block px-8 py-3 border border-charcoal text-charcoal text-xs tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-colors duration-300"
        >
          コレクションを見る
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-stone">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-stone to-transparent" />
      </div>
    </section>
  );
}
