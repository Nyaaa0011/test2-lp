export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 rounded-full cursor-pointer';
  const variants = {
    primary:
      'bg-rose-deep text-white hover:bg-charcoal hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'border border-rose-deep text-rose-deep hover:bg-rose-deep hover:text-white active:scale-[0.98]',
    ghost:
      'text-rose-deep hover:text-charcoal underline underline-offset-4 decoration-rose/40 hover:decoration-charcoal/40',
  };
  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
