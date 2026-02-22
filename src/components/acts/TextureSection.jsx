import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TextureSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.texture-item', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="texture" ref={sectionRef} className="py-20 md:py-28 bg-sand px-4 md:px-8">
      <SectionHeading en="Texture" ja="なじませるたび、心地よい一滴" />

      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-sm text-warm-gray leading-relaxed max-w-lg mx-auto">
          すーっと肌になじむ、こだわりの浸透処方。
          べたつかず、なめらかな仕上がりが「なじんだサイン」。
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Foundation texture */}
        <div className="texture-item">
          <div
            className="aspect-[4/3] rounded-2xl mb-5 overflow-hidden relative"
            style={{
              background: 'linear-gradient(160deg, #FBF8F5 0%, #F5E6D3 30%, #DFC5B5 70%, #C9A882 100%)',
            }}
          >
            {/* Product image */}
            <img
              src={PRODUCTS[0].image}
              alt={PRODUCTS[0].name}
              className="absolute inset-0 w-full h-full object-contain object-center drop-shadow-lg p-6 md:p-8"
            />
            {/* Texture gauge */}
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
              <span className="text-[9px] text-charcoal/50 tracking-wider">COVERAGE</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className={`w-4 h-1 rounded-full ${n <= 2 ? 'bg-charcoal/40' : 'bg-charcoal/10'}`} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-charcoal">
                Dewy Veil — 素肌溶けこみ処方
              </span>
            </div>
          </div>
          <h3 className="font-serif text-xl text-charcoal mb-2">Glow Veil Foundation</h3>
          <p className="text-sm text-warm-gray leading-relaxed">
            体温でとろけるように肌と一体化。指先でなじませた瞬間、
            ファンデーションの境目が消え、まるで素肌そのものが発光しているような仕上がりに。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['ヴェール感', '素肌溶けこみ', 'セミマット〜ツヤ'].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white text-warm-gray">
                {tag}
              </span>
            ))}
          </div>
          {/* Texture bar */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[9px] text-stone">軽やか</span>
            <div className="flex-1 h-1 rounded-full bg-sand overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-nude to-nude/40" style={{ width: '30%' }} />
            </div>
            <span className="text-[9px] text-stone">しっかり</span>
          </div>
        </div>

        {/* Lip texture */}
        <div className="texture-item">
          <div
            className="aspect-[4/3] rounded-2xl mb-5 overflow-hidden relative"
            style={{
              background: 'linear-gradient(160deg, #FBF8F5 0%, #F5D6D9 30%, #E8B4B8 70%, #C48B91 100%)',
            }}
          >
            {/* Product image */}
            <img
              src={PRODUCTS[1].image}
              alt={PRODUCTS[1].name}
              className="absolute inset-0 w-full h-full object-contain object-center drop-shadow-lg p-6 md:p-8"
            />
            {/* Texture gauge */}
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
              <span className="text-[9px] text-charcoal/50 tracking-wider">PIGMENT</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className={`w-4 h-1 rounded-full ${n <= 3 ? 'bg-charcoal/40' : 'bg-charcoal/10'}`} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-charcoal">
                Water Bloom — 水彩にじみ処方
              </span>
            </div>
          </div>
          <h3 className="font-serif text-xl text-charcoal mb-2">Water Bloom Lip</h3>
          <p className="text-sm text-warm-gray leading-relaxed">
            水のように軽いテクスチャーが唇にのせた瞬間にじわっと発色。
            内側からにじみ出るような血色感が、ナチュラルな可愛さを演出します。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['水彩発色', 'じんわりティント', 'グロス不要のツヤ'].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white text-warm-gray">
                {tag}
              </span>
            ))}
          </div>
          {/* Texture bar */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[9px] text-stone">シアー</span>
            <div className="flex-1 h-1 rounded-full bg-sand overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-rose to-rose/40" style={{ width: '45%' }} />
            </div>
            <span className="text-[9px] text-stone">ヴィヴィッド</span>
          </div>
        </div>
      </div>
    </section>
  );
}
