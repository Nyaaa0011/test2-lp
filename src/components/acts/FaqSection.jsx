import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FAQ_ITEMS } from '../../data/faq';
import SectionHeading from '../ui/SectionHeading';
import FaqItem from '../ui/FaqItem';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function FaqSection() {
  const listRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(listRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        },
      });
    }, listRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream px-4 md:px-8">
      <SectionHeading en="FAQ" ja="よくあるご質問" />

      <div ref={listRef} className="max-w-2xl mx-auto">
        {FAQ_ITEMS.map((item, i) => (
          <FaqItem
            key={i}
            question={item.question}
            answer={item.answer}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
