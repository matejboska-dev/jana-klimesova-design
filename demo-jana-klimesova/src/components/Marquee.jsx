// seamless horizontal marquee of region names. duplicated track for loop.
export default function Marquee({ items, className = '' }) {
  const row = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-sans font-semibold text-xl md:text-2xl px-6 md:px-9 tracking-tight">
              {item}
            </span>
            <span className="text-rose text-base">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
