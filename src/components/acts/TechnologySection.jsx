import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TECH_PRODUCTS } from '../../data/technology';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TechnologySection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const current = TECH_PRODUCTS[activeIndex];

  const switchProduct = useCallback((newIndex) => {
    if (newIndex === activeIndex) return;

    // Fade out current content
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
      },
    });
    tl.to(imgRef.current, { opacity: 0, x: newIndex > activeIndex ? -30 : 30, duration: 0.3, ease: 'power2.in' })
      .to(textRef.current.children, { opacity: 0, x: newIndex > activeIndex ? -20 : 20, stagger: 0.05, duration: 0.2, ease: 'power2.in' }, 0);
  }, [activeIndex]);

  // Fade in after tab switch
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!imgRef.current || !textRef.current) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(imgRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo(textRef.current.children, { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: 'power3.out' }, 0.1);

    // Re-run stat counter
    if (!reduced) {
      textRef.current.querySelectorAll('.tech-stat').forEach((numEl) => {
        const target = parseFloat(numEl.dataset.value);
        const isDecimal = String(target).includes('.');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          },
        });
      });
    }
  }, [activeIndex, reduced]);

  // Initial scroll-trigger entrance + particles
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stat counter on first scroll
      if (!reduced) {
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            textRef.current.querySelectorAll('.tech-stat').forEach((numEl) => {
              const target = parseFloat(numEl.dataset.value);
              const isDecimal = String(target).includes('.');
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                  numEl.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
                },
              });
            });
          },
        });
      }

      if (particlesRef.current) {
        Array.from(particlesRef.current.children).forEach((dot, i) => {
          gsap.to(dot, {
            y: `random(-20, 20)`, x: `random(-10, 10)`, opacity: `random(0.3, 1)`,
            duration: `random(2, 4)`, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3,
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #F5EDE8 0%, #FBF8F5 40%, #F0E8E3 100%)',
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, #F5D6D9 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Section heading */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-accent tracking-[0.3em] text-xs uppercase text-rose/80 mb-3">
            Technology
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
            テクノロジー
          </h2>
        </div>

        {/* Product switcher tabs */}
        <div className="flex items-center justify-center gap-6 mb-10 md:mb-14">
          {TECH_PRODUCTS.map((product, i) => (
            <button
              key={product.id}
              onClick={() => switchProduct(i)}
              className={`relative pb-2 text-sm md:text-base tracking-[0.1em] transition-colors duration-300 cursor-pointer ${
                activeIndex === i
                  ? 'text-rose font-medium'
                  : 'text-warm-gray/50 hover:text-warm-gray'
              }`}
            >
              {product.name}
              {activeIndex === i && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-rose" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Product visual with particles */}
          <div className="relative w-full md:w-2/5 flex-shrink-0">
            <div ref={imgRef} className="relative mx-auto w-48 md:w-64 lg:w-72">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-auto drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 40px rgba(196, 139, 145, 0.3))' }}
              />
            </div>

            {/* Floating light particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    background: i % 3 === 0 ? '#E8B4B8' : i % 3 === 1 ? '#F5D6D9' : '#C48B91',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.6 + 0.2,
                  }}
                />
              ))}
            </div>

            {/* Nav arrows (mobile) */}
            <div className="flex md:hidden justify-center gap-4 mt-6">
              <button
                onClick={() => switchProduct(activeIndex === 0 ? TECH_PRODUCTS.length - 1 : activeIndex - 1)}
                className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center text-stone hover:text-charcoal hover:border-stone/60 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => switchProduct(activeIndex === TECH_PRODUCTS.length - 1 ? 0 : activeIndex + 1)}
                className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center text-stone hover:text-charcoal hover:border-stone/60 transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Technology cards */}
          <div ref={textRef} className="w-full md:w-3/5 space-y-8">
            {current.technologies.map((tech) => (
              <div key={tech.id} className="border-l-2 border-rose/40 pl-6 md:pl-8">
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span
                    className="tech-stat font-accent text-4xl md:text-5xl text-rose"
                    data-value={tech.stat}
                  >
                    {reduced ? tech.stat : '0'}
                  </span>
                  <span className="font-accent text-lg text-rose-deep">{tech.unit}</span>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-charcoal mb-0.5">{tech.title}</h3>
                <p className="text-[10px] tracking-[0.15em] uppercase text-stone mb-2">{tech.titleJa}</p>
                <p className="text-sm text-warm-gray leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {TECH_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => switchProduct(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'bg-rose w-6' : 'bg-stone/30 hover:bg-stone/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
