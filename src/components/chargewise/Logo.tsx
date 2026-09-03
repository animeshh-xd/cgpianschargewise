export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="ChargeWise logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="11"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path
        d="M27.5 12.5a10 10 0 1 0 0 15"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.5 12.5 16 20.5h4.5L18.5 27.5 25 19h-4.5l1-6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
