import { useState, useRef } from 'react';

export default function FaqItem({ question, answer, index = 0 }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-sand">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 md:py-6 flex items-center justify-between text-left cursor-pointer group"
      >
        <span className="font-serif text-base md:text-lg text-charcoal group-hover:text-rose-deep transition-colors pr-4">
          {question}
        </span>
        <span
          className={`text-rose-deep text-xl transition-transform duration-300 flex-shrink-0 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        className={`faq-content ${open ? 'open' : ''}`}
        style={{
          paddingBottom: open ? '1.25rem' : 0,
        }}
      >
        <p className="text-sm text-warm-gray leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
