import React from 'react';

interface ModuleThumbProps {
  moduleId: string;
  className?: string;
}

const ModuleThumb: React.FC<ModuleThumbProps> = ({ moduleId, className }) => {
  return (
    <div
      className={`relative w-full aspect-[16/7] rounded-lg overflow-hidden ${className ?? ''}`}
      style={{
        background:
          'radial-gradient(120% 80% at 0% 0%, rgba(124,92,255,0.20), transparent 60%), radial-gradient(120% 80% at 100% 100%, rgba(255,212,59,0.10), transparent 60%), #0f1218',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 140"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={`grad-${moduleId}`} x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c5cff" />
            <stop offset="1" stopColor="#ffd43b" />
          </linearGradient>
        </defs>

        {moduleId === 'module-1' && (
          <g>
            {[...Array(7)].map((_, i) => (
              <rect
                key={i}
                x={28 + i * 38}
                y={50}
                width={28}
                height={28}
                rx={i === 6 ? 14 : 4}
                fill="none"
                stroke={`url(#grad-${moduleId})`}
                strokeWidth="1.5"
                opacity={0.15 + i * 0.1}
              >
                <animate
                  attributeName="y"
                  values="50;42;50"
                  dur={`${2 + i * 0.2}s`}
                  begin={`${i * 0.12}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
          </g>
        )}

        {moduleId === 'module-2' && (
          <g transform="translate(160 70)">
            <circle r="34" fill="none" stroke="rgba(124,92,255,0.18)" strokeWidth="1" />
            <g>
              <circle cx="34" cy="0" r="6" fill={`url(#grad-${moduleId})`}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <rect x="-24" y="-24" width="48" height="48" fill="none" stroke={`url(#grad-${moduleId})`} strokeWidth="1.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="-90"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        )}

        {moduleId === 'module-3' && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={50 + i * 55}
                cy={70}
                r={6}
                fill={`url(#grad-${moduleId})`}
                opacity={0.85}
              >
                <animate
                  attributeName="r"
                  values="6;14;6"
                  dur="2.4s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="2.4s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}

        {moduleId === 'module-4' && (
          <g>
            <path
              d="M 20 100 C 60 20, 120 20, 160 70 S 260 120, 300 40"
              fill="none"
              stroke={`url(#grad-${moduleId})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="500"
              strokeDashoffset="500"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="500"
                to="0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            <circle r="5" fill="#ffd43b">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 20 100 C 60 20, 120 20, 160 70 S 260 120, 300 40"
              />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};

export default ModuleThumb;
