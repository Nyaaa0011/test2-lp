import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../data/brand';

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);

      const sections = NAV_ITEMS.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter((s) => s.el);

      let current = '';
      for (const section of sections) {
        const rect = section.el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-3">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-2"
            title={item.label}
          >
            <span
              className={`text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity text-warm-gray`}
            >
              {item.label}
            </span>
            <span
              className={`section-nav-dot w-2 h-2 rounded-full bg-stone/40 ${
                activeSection === item.id ? 'active' : ''
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
