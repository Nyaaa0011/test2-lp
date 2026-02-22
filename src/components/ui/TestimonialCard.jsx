export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm min-w-[280px] md:min-w-[340px] snap-center">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-rose text-sm">&#9733;</span>
        ))}
      </div>
      <p className="text-sm text-warm-gray leading-relaxed mb-5">
        "{testimonial.text}"
      </p>
      <div className="border-t border-sand pt-4 flex items-center justify-between">
        <div>
          <p className="font-serif text-charcoal text-sm">{testimonial.name}</p>
          <p className="text-[10px] text-stone">
            {testimonial.age}歳・{testimonial.skin}
          </p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-rose-light text-rose-deep">
          {testimonial.product}
        </span>
      </div>
    </div>
  );
}
