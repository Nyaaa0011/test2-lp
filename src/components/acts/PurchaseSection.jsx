import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function PurchaseSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.purchase-card'), {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
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
    <section id="purchase" ref={sectionRef} className="py-20 md:py-28 bg-sand px-4 md:px-8">
      <div className="text-center mb-12 md:mb-16">
        <p className="font-accent text-rose-deep tracking-[0.2em] text-sm uppercase mb-2">
          Purchase
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
          ご購入はこちら
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          全国送料無料・初回限定14日間返金保証付き
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="purchase-card bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            {product.badge && (
              <Badge className="mb-4">{product.badge}</Badge>
            )}

            {/* Product visual */}
            <div
              className="aspect-[4/3] rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  product.category === 'foundation'
                    ? 'linear-gradient(135deg, #FBF8F5 0%, #F0EBE3 100%)'
                    : 'linear-gradient(135deg, #FBF8F5 0%, #F5D6D9 100%)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-center drop-shadow-lg p-6 md:p-8"
              />
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-stone mb-3">{product.nameJa}</p>

            {/* Shade dots */}
            <div className="flex gap-2 mb-4">
              {product.shades.map((s) => (
                <div
                  key={s.id}
                  className="w-4 h-4 rounded-full border border-sand"
                  style={{ background: s.hex }}
                />
              ))}
              <span className="text-[10px] text-stone self-center ml-1">
                {product.shades.length}色
              </span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.features.map((f) => (
                <span
                  key={f}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-cream text-warm-gray"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-sand pt-4">
              <div>
                <span className="font-accent text-3xl text-charcoal">
                  {product.priceFormatted}
                </span>
                <span className="text-[10px] text-stone ml-1">tax included</span>
              </div>
              <Button size="sm">カートに入れる</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Set option */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm text-center">
        <Badge className="mb-3">SPECIAL SET</Badge>
        <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-2">
          スターターセット
        </h3>

        {/* Set product images */}
        <div className="flex items-center justify-center gap-4 md:gap-8 my-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center"
              style={{
                background:
                  product.category === 'foundation'
                    ? 'linear-gradient(135deg, #FBF8F5 0%, #F0EBE3 100%)'
                    : 'linear-gradient(135deg, #FBF8F5 0%, #F5D6D9 100%)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-2 drop-shadow-sm"
              />
            </div>
          ))}
          <span className="text-stone text-lg font-accent hidden md:block">+</span>
        </div>

        <p className="text-sm text-warm-gray mb-1">
          Glow Veil Foundation + Water Bloom Lip（お好きな色1本ずつ）
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-stone line-through text-sm">¥7,000</span>
          <span className="font-accent text-3xl text-rose-deep">¥5,980</span>
          <span className="text-[10px] text-stone">tax included</span>
        </div>
        <p className="text-xs text-rose-deep mb-5">初回限定 14%OFF + 送料無料</p>
        <Button size="lg">セットで購入する</Button>
      </div>
    </section>
  );
}
