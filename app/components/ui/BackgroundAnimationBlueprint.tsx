'use client';
import { useEffect, useState } from 'react';

interface GridLine {
  id: string;
  type: 'horizontal' | 'vertical';
  position: number;
  isPrimary: boolean;
}

interface PulsePoint {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function BackgroundAnimationBlueprint() {
  const [gridLines, setGridLines] = useState<GridLine[]>([]);
  const [pulsePoints, setPulsePoints] = useState<PulsePoint[]>([]);

  useEffect(() => {
    // Create grid lines
    const lines: GridLine[] = [];
    const spacing = 8; // 8% spacing between lines

    // Vertical lines
    for (let i = 0; i <= 100; i += spacing) {
      lines.push({
        id: `v-${i}`,
        type: 'vertical',
        position: i,
        isPrimary: i % (spacing * 2) === 0, // Every other line is primary
      });
    }

    // Horizontal lines
    for (let i = 0; i <= 100; i += spacing) {
      lines.push({
        id: `h-${i}`,
        type: 'horizontal',
        position: i,
        isPrimary: i % (spacing * 2) === 0,
      });
    }

    setGridLines(lines);

    // Create pulse points at grid intersections
    const points: PulsePoint[] = [];
    for (let i = 0; i < 15; i++) {
      const x = Math.floor(Math.random() * (100 / spacing)) * spacing;
      const y = Math.floor(Math.random() * (100 / spacing)) * spacing;
      points.push({
        id: i,
        x,
        y,
        delay: Math.random() * 8,
      });
    }
    setPulsePoints(points);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </linearGradient>
        </defs>

        {gridLines.map((line) => {
          if (line.type === 'horizontal') {
            return (
              <line
                key={line.id}
                x1="0%"
                y1={`${line.position}%`}
                x2="100%"
                y2={`${line.position}%`}
                stroke="rgba(139, 92, 246, 0.4)"
                strokeWidth={line.isPrimary ? 1.5 : 0.8}
                className="opacity-60 dark:opacity-40"
              />
            );
          } else {
            return (
              <line
                key={line.id}
                x1={`${line.position}%`}
                y1="0%"
                x2={`${line.position}%`}
                y2="100%"
                stroke="rgba(139, 92, 246, 0.4)"
                strokeWidth={line.isPrimary ? 1.5 : 0.8}
                className="opacity-60 dark:opacity-40"
              />
            );
          }
        })}

        {/* Pulse points at intersections */}
        {pulsePoints.map((point) => (
          <g key={point.id}>
            {/* Pulsing circle */}
            <circle
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="3"
              fill="rgba(139, 92, 246, 0.6)"
              className="animate-pulse-point"
              style={{
                animationDelay: `${point.delay}s`,
              }}
            />
            {/* Expanding ring */}
            <circle
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="8"
              fill="none"
              stroke="rgba(139, 92, 246, 0.4)"
              strokeWidth="1"
              className="animate-pulse-ring"
              style={{
                animationDelay: `${point.delay}s`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Animated diagonal lines (like technical drawings) */}
      <svg className="absolute inset-0 w-full h-full">
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`diag-${i}`}
            x1={`${i * 25}%`}
            y1="0%"
            x2={`${(i * 25) + 15}%`}
            y2="100%"
            stroke="rgba(139, 92, 246, 0.05)"
            strokeWidth="1"
            strokeDasharray="5,5"
            className="animate-dash"
            style={{
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </svg>

      <style jsx>{`
        @keyframes pulse-point {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes pulse-ring {
          0% {
            opacity: 0.6;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-pulse-point {
          animation: pulse-point 3s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 3s ease-out infinite;
        }

        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
