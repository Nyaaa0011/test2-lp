import { useState } from 'react';

export default function ShadeSwatches({ shades, productName }) {
  const [active, setActive] = useState(shades[0]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {shades.map((shade) => (
          <button
            key={shade.id}
            onClick={() => setActive(shade)}
            className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-200 cursor-pointer ${
              active.id === shade.id
                ? 'border-charcoal scale-110'
                : 'border-transparent hover:border-stone/50'
            }`}
            style={{ background: shade.hex }}
            title={shade.nameJa}
          />
        ))}
      </div>
      <p className="font-serif text-charcoal text-lg">{active.name}</p>
      <p className="text-xs text-stone">{active.nameJa}</p>
    </div>
  );
}
