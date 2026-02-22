export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-sans font-medium bg-rose-light text-rose-deep rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
