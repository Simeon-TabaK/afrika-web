import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Eye } from 'lucide-react';

export interface PostCardProps {
  id?: string;
  image?: string;
  title: string;
  desc?: string;
  goal?: string;
  percentage?: string;
  nbrLikes?: string | number;
  nbrViews?: string | number;
  membersCount?: string | number;
  isActiveStatus?: boolean;
  hasLiked?: boolean;
  type?: string;
  onViewPressed?: () => void;
  onLikesPressed?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  image,
  title,
  desc,
  goal,
  percentage,
  nbrLikes = '132k',
  nbrViews = '160k',
  membersCount = '3.4K',
  isActiveStatus = true,
  hasLiked = false,
  type = 'Publication',
  onViewPressed,
  onLikesPressed,
}) => {
  const { t } = useTranslation();
  const isProject = type?.toLowerCase().includes('projet') || type?.toLowerCase().includes('project');

  // Format numeric percentage for progress bar if applicable
  let numericPercent = 0;
  if (percentage) {
    const match = percentage.match(/(\d+(\.\d+)?)/);
    if (match) {
      numericPercent = Math.min(100, Math.max(0, parseFloat(match[1])));
    }
  }

  return (
    <div
      className="mockup-feed-card"
      onClick={onViewPressed}
      style={{
        background: '#FFFFFF',
        borderRadius: '26px',
        padding: '22px',
        boxShadow: '0 8px 26px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.16)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 26px rgba(0, 0, 0, 0.12)';
      }}
    >
      {/* Inner Image Banner with rounded corners */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          borderRadius: '18px',
          overflow: 'hidden',
          backgroundColor: '#2A3B1E',
        }}
      >
        <img
          src={image || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900'}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Content Section */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Title */}
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#0F172A',
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: '-0.2px',
          }}
        >
          {title}
        </h2>

        {/* Row with description and green "Voir" button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          {desc && (
            <p
              style={{
                fontSize: '13px',
                color: '#64748B',
                margin: 0,
                lineHeight: 1.5,
                flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {desc}
            </p>
          )}

          {/* Green "Voir" Button matching mockup */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onViewPressed) onViewPressed();
            }}
            style={{
              background: '#6B9E41',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 24px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(107, 158, 65, 0.3)',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#588832')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#6B9E41')}
          >
            {t('see')}
          </button>
        </div>

        {/* Progress bar if project */}
        {isProject && (
          <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#6B9E41' }}>
              <span>{goal || 'Objectif'}</span>
              <span>{percentage || 'Progression'}</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E2E8F0', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${numericPercent || 45}%`,
                  height: '100%',
                  borderRadius: '3px',
                  background: '#6B9E41',
                }}
              />
            </div>
          </div>
        )}

        {/* Footer Row matching mockup */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            paddingTop: '6px',
          }}
        >
          {/* Left: Members & Active Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B9E41' }}>
              {membersCount} {t('members')}
            </span>

            {isActiveStatus && (
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B9E41', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6B9E41', display: 'inline-block' }} />
                {t('active')}
              </span>
            )}
          </div>

          {/* Right: Likes & Views */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Likes */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (onLikesPressed) onLikesPressed();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <Heart
                size={14}
                fill={hasLiked ? '#EF4444' : '#EF4444'}
                color="#EF4444"
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                {nbrLikes}
              </span>
            </div>

            {/* Views */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Eye size={15} color="#64748B" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                {nbrViews}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
