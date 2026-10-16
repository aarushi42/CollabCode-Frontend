const PremiumBadge = ({ className = "" }) => (
  <span
    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2997ff] text-white shadow-sm shadow-[#2997ff]/40 ${className}`}
    title="Premium member"
    aria-label="Premium member"
  >
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 10 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default PremiumBadge;
