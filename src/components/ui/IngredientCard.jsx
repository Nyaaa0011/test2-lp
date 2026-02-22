import { Droplets, Sparkles, Leaf, Shell } from 'lucide-react';

const ICON_MAP = { Droplets, Sparkles, Leaf, Shell };

export default function IngredientCard({ ingredient }) {
  const Icon = ICON_MAP[ingredient.iconName];

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {Icon && (
        <Icon
          size={28}
          strokeWidth={1.2}
          color={ingredient.iconColor}
          className="mb-3"
        />
      )}
      <h4 className="font-serif text-lg text-charcoal mb-0.5">{ingredient.name}</h4>
      <p className="text-[10px] tracking-[0.1em] uppercase text-stone mb-2">
        {ingredient.nameEn}
      </p>
      <p className="text-sm text-warm-gray leading-relaxed">
        {ingredient.description}
      </p>
    </div>
  );
}
