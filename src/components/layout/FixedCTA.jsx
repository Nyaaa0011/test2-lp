import { useState, useEffect } from 'react';

export default function FixedCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const purchaseEl = document.getElementById('purchase');
      if (purchaseEl) {
        const rect = purchaseEl.getBoundingClientRect();
        setVisible(window.scrollY > window.innerHeight && rect.top > window.innerHeight);
      } else {
        setVisible(window.scrollY > window.innerHeight);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-auto transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Mobile: full-width bar */}
      <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-sand px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-serif text-charcoal text-sm">Glow Veil Foundation</p>
          <p className="font-accent text-rose-deep text-lg">¥4,200</p>
        </div>
        <a
          href="#purchase"
          className="px-6 py-2.5 bg-rose-deep text-white text-sm rounded-full hover:bg-charcoal transition-colors"
        >
          購入する
        </a>
      </div>

      {/* Desktop: floating button */}
      <a
        href="#purchase"
        className="hidden md:flex items-center gap-2 px-6 py-3 bg-rose-deep text-white text-sm rounded-full shadow-lg hover:bg-charcoal hover:shadow-xl transition-all"
      >
        <span>購入する</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>
    </div>
  );
}
