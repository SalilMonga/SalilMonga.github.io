'use client';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function BackgroundAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const particleCount = 30; // More particles for better visibility
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random position across screen
        y: Math.random() * 100,
        size: Math.random() * 40 + 25, // 25-65px (slightly larger)
        duration: Math.random() * 40 + 40, // 40-80s drift
        delay: Math.random() * 10, // 0-10s delay
        rotation: Math.random() * 360, // Random initial rotation
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute opacity-20 dark:opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s, pulse ${particle.duration / 2}s ease-in-out infinite ${particle.delay}s, rotate ${particle.duration * 1.5}s linear infinite ${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          {/* Hexagon/Gear shape */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer hexagon */}
            <polygon
              points="50 5, 90 30, 90 70, 50 95, 10 70, 10 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-purple-500 dark:text-purple-400"
            />
            {/* Proper gear with teeth */}
            <g className="text-purple-500 dark:text-purple-400">
              {/* Inner circle of gear */}
              <circle
                cx="50"
                cy="50"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Gear teeth - 8 teeth around the circle */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const innerRadius = 12;
                const outerRadius = 18;
                const toothWidth = 8;

                const leftAngleRad = ((angle - toothWidth) * Math.PI) / 180;
                const rightAngleRad = ((angle + toothWidth) * Math.PI) / 180;

                // Create tooth shape
                const innerLeft = {
                  x: 50 + innerRadius * Math.cos(leftAngleRad),
                  y: 50 + innerRadius * Math.sin(leftAngleRad)
                };
                const outerLeft = {
                  x: 50 + outerRadius * Math.cos(leftAngleRad),
                  y: 50 + outerRadius * Math.sin(leftAngleRad)
                };
                const outerRight = {
                  x: 50 + outerRadius * Math.cos(rightAngleRad),
                  y: 50 + outerRadius * Math.sin(rightAngleRad)
                };
                const innerRight = {
                  x: 50 + innerRadius * Math.cos(rightAngleRad),
                  y: 50 + innerRadius * Math.sin(rightAngleRad)
                };

                return (
                  <path
                    key={angle}
                    d={`M ${innerLeft.x} ${innerLeft.y} L ${outerLeft.x} ${outerLeft.y} L ${outerRight.x} ${outerRight.y} L ${innerRight.x} ${innerRight.y} Z`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Center hole */}
              <circle
                cx="50"
                cy="50"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-15px, -60px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -30px) rotate(270deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.25;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
