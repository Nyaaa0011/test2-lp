import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FRAGRANCE = {
  description: 'やさしく香る、春の記憶。心がふっとほどける、ナチュラルフローラルの香り。',
  layers: [
    {
      name: 'TOP',
      notes: 'ベルガモット、ピンクペッパー、洋梨',
      color: '#F5D6D9',
    },
    {
      name: 'MIDDLE',
      notes: 'ピオニー、ミュゲ（スズラン）、ローズ',
      color: '#E8B4B8',
    },
    {
      name: 'LAST',
      notes: 'ホワイトムスク、サンダルウッド、シダー',
      color: '#C48B91',
    },
  ],
};

export default function FragranceSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.fragrance-layer', {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-cream px-4 md:px-8">
      <SectionHeading en="Fragrance" ja="香り" />

      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-sm text-warm-gray leading-relaxed">
          {FRAGRANCE.description}
        </p>
      </div>

      {/* Fragrance pyramid */}
      <div className="max-w-lg mx-auto flex flex-col items-center gap-3 md:gap-4">
        {FRAGRANCE.layers.map((layer, i) => {
          const widths = ['60%', '80%', '100%'];
          return (
            <div
              key={layer.name}
              className="fragrance-layer w-full flex justify-center"
            >
              <div
                className="relative rounded-2xl p-4 md:p-5 overflow-hidden"
                style={{
                  width: widths[i],
                  background: `linear-gradient(135deg, ${layer.color}22, ${layer.color}44)`,
                  borderLeft: `3px solid ${layer.color}`,
                }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm"
                    style={{ background: layer.color }}
                  >
                    <span className="text-white text-[9px] font-medium tracking-wider">
                      {layer.name}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-stone mb-0.5">
                      {layer.name} NOTE
                    </p>
                    <p className="text-sm text-charcoal leading-relaxed">{layer.notes}</p>
                  </div>
                </div>
                {/* Decorative fragrance dots */}
                {[...Array(3 + i * 2)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute rounded-full animate-float"
                    style={{
                      width: 4 + Math.random() * 4,
                      height: 4 + Math.random() * 4,
                      background: layer.color,
                      opacity: 0.2 + Math.random() * 0.15,
                      top: `${15 + Math.random() * 70}%`,
                      right: `${5 + j * 8}%`,
                      animationDelay: `${j * 0.8}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time progression */}
      <div className="max-w-sm mx-auto mt-8 flex items-center gap-3 justify-center text-[10px] text-stone">
        <span>つけたて</span>
        <div className="flex-1 h-px bg-gradient-to-r from-rose-light via-rose to-rose-deep" />
        <span>時間の経過</span>
      </div>

      <p className="text-center text-[10px] text-stone mt-6">
        ※ 微香性。肌にのせると、ふんわりとやさしく香ります。
      </p>
    </section>
  );
}
