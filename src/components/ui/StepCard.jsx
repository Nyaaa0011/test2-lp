export default function StepCard({ step, number, total, children }) {
  return (
    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Icon */}
      {children && (
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-rose-light/20 flex items-center justify-center mb-4">
          {children}
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-accent text-4xl text-rose-light">{String(number).padStart(2, '0')}</span>
        <div className="h-px flex-1 bg-sand" />
        <span className="text-[10px] text-stone tracking-wider">
          STEP {number}/{total}
        </span>
      </div>
      <h4 className="font-serif text-lg text-charcoal mb-2">{step.title}</h4>
      <p className="text-sm text-warm-gray leading-relaxed">{step.description}</p>
      {step.tip && (
        <p className="mt-3 text-xs text-rose-deep bg-rose-light/30 rounded-lg px-3 py-2">
          💡 {step.tip}
        </p>
      )}
    </div>
  );
}
