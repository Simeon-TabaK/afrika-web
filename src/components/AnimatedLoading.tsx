import React from 'react';

interface AnimatedLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  text?: string;
  className?: string;
}

export const AnimatedLoading: React.FC<AnimatedLoadingProps> = ({
  size = 'md',
  text = 'Chargement en cours...',
  className = '',
}) => {
  const isFullscreen = size === 'fullscreen';

  const spinnerSizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
    fullscreen: 'w-16 h-16 border-4',
  }[size];

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Outer pulsing halo */}
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute rounded-full animate-ping opacity-30 ${spinnerSizes}`}
          style={{ backgroundColor: 'var(--color-primary, #6DBE47)' }}
        />
        {/* Rotating Circular Spinner */}
        <div
          className={`rounded-full animate-spin ${spinnerSizes}`}
          style={{
            borderColor: 'rgba(109, 190, 71, 0.2)',
            borderTopColor: 'var(--color-primary, #6DBE47)',
            borderRightColor: 'var(--color-primary, #6DBE47)',
          }}
        />
        {/* Center glowing dot */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: 'var(--color-primary, #6DBE47)' }}
        />
      </div>

      {text && (
        <span
          className="text-xs font-semibold tracking-wide animate-pulse"
          style={{ color: 'var(--text-secondary, #a0a0a0)' }}
        >
          {text}
        </span>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="p-8 rounded-2xl bg-[var(--bg-surface,#181818)] border border-[var(--border-color,#2a2a2a)] shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return <div className="py-8 flex justify-center">{content}</div>;
};
