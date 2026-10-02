interface BrandLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function BrandLogo({ size = 36, showText = true, className = "" }: BrandLogoProps) {
  return (
    <div className={`brand-logo-wrap ${className}`}>
      <div
        className="brand-logo-emblem"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Coral Gradient Background */}
          <circle cx="22" cy="22" r="21" fill="url(#yummy-grad)" />

          {/* Delicious Gourmet Burger / Appetizing Yummy Motif */}
          {/* Top Bun with Warm Dome */}
          <path
            d="M12.5 20.5C12.5 14.5 16.5 11.5 22 11.5C27.5 11.5 31.5 14.5 31.5 20.5H12.5Z"
            fill="#FFFFFF"
          />

          {/* Golden Sesame Seeds */}
          <circle cx="17.5" cy="16" r="0.9" fill="#FFC048" />
          <circle cx="22" cy="14.5" r="0.9" fill="#FFC048" />
          <circle cx="26.5" cy="16" r="0.9" fill="#FFC048" />

          {/* Savory Melt / Cheese Fold */}
          <path
            d="M11 22.2H33C33 23.8 31.8 24.8 30 24.8H14C12.2 24.8 11 23.8 11 22.2Z"
            fill="#FFFFFF"
            opacity="0.92"
          />

          {/* Bottom Bun */}
          <path
            d="M13 26.5H31C31 30.5 27 32.5 22 32.5C17 32.5 13 30.5 13 26.5Z"
            fill="#FFFFFF"
          />

          {/* Subtle Inner Highlight Ring */}
          <circle
            cx="22"
            cy="22"
            r="20.5"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />

          <defs>
            <linearGradient
              id="yummy-grad"
              x1="4"
              y1="4"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4D2E" />
              <stop offset="1" stopColor="#E63212" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className="brand-logo-title">
          Yummy<span className="brand-dot">.</span>
        </span>
      )}
    </div>
  );
}
