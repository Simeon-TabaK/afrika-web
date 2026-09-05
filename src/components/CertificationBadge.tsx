import React from 'react';
import { type CertificationType, CERTIFICATION_CONFIGS } from '../types';

interface CertificationBadgeProps {
  type?: CertificationType;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  type = 'none',
  showLabel = false,
  size = 'md',
  className = '',
  onClick,
}) => {
  const config = CERTIFICATION_CONFIGS[type] || CERTIFICATION_CONFIGS.none;
  const isNone = type === 'none';

  const sizeClasses = {
    sm: {
      badge: 'w-4 h-4 text-[10px]',
      dot: 'text-xs',
      star: 'text-[11px]',
      label: 'text-xs',
    },
    md: {
      badge: 'w-5 h-5 text-xs',
      dot: 'text-sm',
      star: 'text-xs',
      label: 'text-sm',
    },
    lg: {
      badge: 'w-6 h-6 text-sm',
      dot: 'text-base',
      star: 'text-sm',
      label: 'text-base font-semibold',
    },
  }[size];

  const badgeElement = (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold transition-transform select-none ${
        onClick ? 'cursor-pointer hover:scale-110' : ''
      } ${sizeClasses.badge}`}
      style={{
        color: config.color,
        backgroundColor: isNone ? 'rgba(158, 158, 158, 0.12)' : `${config.color}1A`,
        border: `1.5px solid ${config.color}`,
        lineHeight: 1,
      }}
      title={`${config.label} (${config.colorName}) — ${config.description}`}
      onClick={onClick}
    >
      {isNone ? (
        <span className={sizeClasses.dot} style={{ transform: 'translateY(-1px)' }}>
          •
        </span>
      ) : (
        <span className={sizeClasses.star}>★</span>
      )}
    </span>
  );

  if (!showLabel) {
    return <span className={`inline-flex items-center align-middle ml-1.5 ${className}`}>{badgeElement}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 align-middle ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {badgeElement}
      <span className={sizeClasses.label} style={{ color: config.color, fontWeight: 600 }}>
        {config.label}
      </span>
    </span>
  );
};
