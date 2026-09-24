import type { ReactNode } from "react"

export function CircledWord({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[8%] -top-[20%] h-[145%] w-[116%] overflow-visible"
      >
        <ellipse
          cx="60"
          cy="30"
          rx="56"
          ry="26"
          transform="rotate(-4 60 30)"
          fill="none"
          stroke="#FF9800"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}
