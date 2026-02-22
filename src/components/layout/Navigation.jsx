import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BRAND } from '../../data/brand';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl md:text-3xl text-charcoal tracking-tight">
          {BRAND.name}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-rose-deep transition-colors">
            Products
          </a>
          <a href="#ingredients" className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-rose-deep transition-colors">
            Ingredients
          </a>
          <a href="#reviews" className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-rose-deep transition-colors">
            Reviews
          </a>
          <a
            href="#purchase"
            className="text-xs tracking-[0.15em] uppercase px-5 py-2 bg-rose-deep text-white rounded-full hover:bg-charcoal transition-colors"
          >
            購入する
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          aria-label="メニュー"
        >
          <span
            className={`block w-5 h-px bg-charcoal transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-charcoal transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-sand">
          <div className="px-6 py-6 flex flex-col gap-4">
            {['Products', 'Ingredients', 'Reviews'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.1em] uppercase text-warm-gray hover:text-rose-deep"
              >
                {item}
              </a>
            ))}
            <a
              href="#purchase"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.1em] uppercase text-center px-5 py-3 bg-rose-deep text-white rounded-full"
            >
              購入する
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
