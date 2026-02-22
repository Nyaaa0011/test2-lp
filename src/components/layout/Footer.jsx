import { BRAND } from '../../data/brand';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <p className="font-serif text-3xl text-white mb-1">{BRAND.name}</p>
            <p className="text-xs tracking-[0.1em] text-stone/60">{BRAND.taglineEn}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs tracking-wider uppercase">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>

        <div className="border-t border-stone/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-stone/40">
            &copy; {BRAND.year} {BRAND.name} All rights reserved. This is a fictional brand.
          </p>
          <div className="flex gap-6 text-[10px] text-stone/40">
            <span>特定商取引法に基づく表記</span>
            <span>プライバシーポリシー</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
