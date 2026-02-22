import Badge from './Badge';

export default function ProductCard({ product, index = 0 }) {
  const isFoundation = product.category === 'foundation';

  return (
    <div className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {product.badge && (
        <Badge className="absolute top-4 right-4 z-10">{product.badge}</Badge>
      )}

      {/* Product visual */}
      <div className="relative aspect-[3/4] mb-6 rounded-xl overflow-hidden bg-sand flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-24 h-36 md:w-32 md:h-48 rounded-2xl group-hover:scale-105 transition-transform duration-500"
            style={{
              background: isFoundation
                ? 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C0 50%, #DFC5B5 100%)'
                : `linear-gradient(135deg, ${product.shades[0].hex} 0%, ${product.shades[2].hex} 100%)`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          />
        )}
        <div className="absolute bottom-3 left-3 right-3 text-center">
          <p className="font-accent italic text-white/80 text-sm drop-shadow-sm">{product.tagline}</p>
        </div>
      </div>

      <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-1">
        {product.category}
      </p>
      <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-1">
        {product.name}
      </h3>
      <p className="text-xs text-warm-gray mb-3">{product.nameJa}</p>
      <p className="text-sm text-warm-gray leading-relaxed mb-4 line-clamp-3">
        {product.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.features.map((f) => (
          <span
            key={f}
            className="text-[10px] px-2 py-1 rounded-full bg-cream text-warm-gray border border-sand"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Shade preview */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          {product.shades.map((s) => (
            <div
              key={s.id}
              className="w-5 h-5 rounded-full border-2 border-white"
              style={{ background: s.hex }}
              title={s.nameJa}
            />
          ))}
        </div>
        <span className="text-xs text-stone">{product.shades.length}色展開</span>
      </div>

      <div className="mt-4 pt-4 border-t border-sand flex items-center justify-between">
        <span className="font-accent text-2xl text-charcoal">
          {product.priceFormatted}
        </span>
        <span className="text-[10px] text-stone">tax included</span>
      </div>
    </div>
  );
}
