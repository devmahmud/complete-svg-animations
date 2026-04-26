import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

const BrandMark: React.FC<BrandMarkProps> = ({ size = 28, className }) => {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background:
          'linear-gradient(135deg, rgba(124,92,255,0.18), rgba(255,212,59,0.06))',
        border: '1px solid rgba(124,92,255,0.32)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" width={size * 0.7} height={size * 0.7} fill="none">
        <defs>
          <linearGradient id="bm-stroke" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c5cff" />
            <stop offset="1" stopColor="#ffd43b" />
          </linearGradient>
        </defs>
        <path
          d="M5 22 C 12 4, 20 4, 27 22"
          stroke="url(#bm-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="60"
          strokeDashoffset="60"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="60"
            to="0"
            dur="1.4s"
            fill="freeze"
          />
        </path>
        <circle cx="5" cy="22" r="1.6" fill="#7c5cff">
          <animate attributeName="cx" values="5;27" dur="1.4s" fill="freeze" />
          <animate
            attributeName="cy"
            values="22;4;22"
            keyTimes="0;0.5;1"
            dur="1.4s"
            fill="freeze"
          />
        </circle>
      </svg>
    </span>
  );
};

export default BrandMark;
