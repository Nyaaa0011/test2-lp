import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../ui/SectionHeading';
import StepCard from '../ui/StepCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/* SVG icons for each step */
const StepIcon = ({ type }) => {
  const icons = {
    skincare: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M24 6C24 6 18 12 18 20c0 4 2.7 7.4 6 8.7V38a2 2 0 004 0v-9.3c3.3-1.3 6-4.7 6-8.7 0-8-6-14-6-14z" fill="#F5D6D9" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="20" r="3" fill="#E8B4B8" opacity="0.6"/>
        <path d="M20 42h8" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    apply: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M24 8c-7 0-13 6-13 14 0 5 2.5 9.4 6 12v6a3 3 0 003 3h8a3 3 0 003-3v-6c3.5-2.6 6-7 6-12 0-8-6-14-13-14z" fill="#F5D6D9" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 34h10M19 38h10" stroke="#C48B91" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <circle cx="20" cy="20" r="1.5" fill="#E8B4B8"/>
        <circle cx="28" cy="20" r="1.5" fill="#E8B4B8"/>
        <circle cx="24" cy="24" r="1.5" fill="#E8B4B8"/>
      </svg>
    ),
    lip: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M12 24c0 0 4 4 12 4s12-4 12-4" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 24c0 0 2-8 12-8s12 8 12 8" fill="#F5D6D9" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24c0 0 3 8 12 8s12-8 12-8" fill="#E8B4B8" stroke="#C48B91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 16v8" stroke="#C48B91" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const STEPS = [
  {
    title: 'スキンケアで土台づくり',
    description:
      '洗顔後、化粧水と乳液で肌をしっかり保湿。haru.のファンデーションはスキンケア後の肌に最もなじみやすい設計です。',
    tip: '乳液が完全になじんでから塗ると、より密着力がアップします',
    icon: 'skincare',
  },
  {
    title: '指先でやさしくなじませる',
    description:
      'パール粒大を手の甲に取り、両頬・額・鼻・あごの5点に置いたら、内側から外側へ指先でやさしくなじませます。',
    tip: 'スポンジよりも指で塗る方が、素肌感のある仕上がりに',
    icon: 'apply',
  },
  {
    title: 'リップで血色感をプラス',
    description:
      'Water Bloom Lipを唇の中央にトントンと置き、指先でぼかすように広げます。重ね塗りで濃さを調整できます。',
    tip: 'グラデーションリップにすると、より韓国コスメらしい仕上がりに',
    icon: 'lip',
  },
];

export default function HowToUse() {
  const cardsRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="howto" className="py-20 md:py-28 bg-sand px-4 md:px-8">
      <SectionHeading en="How to Use" ja="使い方" />

      <div className="max-w-lg mx-auto text-center mb-10">
        <p className="text-sm text-warm-gray leading-relaxed">
          たった3ステップで、プロのような素肌メイクが完成。
          <br className="hidden md:block" />
          haru.だから叶える、"頑張らない"美しさ。
        </p>
      </div>

      <div
        ref={cardsRef}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {STEPS.map((step, i) => (
          <StepCard key={i} step={step} number={i + 1} total={STEPS.length}>
            <StepIcon type={step.icon} />
          </StepCard>
        ))}
      </div>

      {/* Completion time hint */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="inline-flex items-center gap-2 text-xs text-stone bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/>
            <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          所要時間：約3分で完成
        </p>
      </div>
    </section>
  );
}
