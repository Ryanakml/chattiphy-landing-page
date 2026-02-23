import type { ReactNode } from 'react';

interface GradientBgProps {
  children?: ReactNode;
  absolute?: boolean;
  base?: string;
  intensity?: number;
  className?: string;
}

export default function GradientBg({
  children,
  absolute = false,
  base = '#F5F4F0',
  intensity = 1,
  className = '',
}: GradientBgProps) {
  const blobs = `
    radial-gradient(ellipse 65% 60% at 12% 62%, rgba(255, 80, 130, ${0.3 * intensity}) 0%, transparent 65%),
    radial-gradient(ellipse 60% 65% at 52% 18%, rgba(150, 80, 220, ${0.26 * intensity}) 0%, transparent 65%),
    radial-gradient(ellipse 60% 55% at 90% 58%, rgba(170, 145, 240, ${0.24 * intensity}) 0%, transparent 65%),
    radial-gradient(ellipse 42% 42% at  4% 14%, rgba(255, 120, 170, ${0.16 * intensity}) 0%, transparent 60%)
  `;

  if (absolute) {
    return (
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ background: blobs, zIndex: 0 }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: base }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: blobs, zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
