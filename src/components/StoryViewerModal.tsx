import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StoryModel } from '../models/feed';

export interface StoryViewerModalProps {
  stories: StoryModel[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string, projectData?: any) => void;
  onSelectPost?: (postId: string, postData?: any) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialIndex = 0,
  isOpen,
  onClose,
  onSelectProject,
  onSelectPost,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressIntervalRef = useRef<any>(null);

  const STORY_DURATION_MS = 5000;
  const UPDATE_INTERVAL_MS = 50;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.min(Math.max(0, initialIndex), Math.max(0, stories.length - 1)));
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen, initialIndex, stories.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen || stories.length === 0 || isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (UPDATE_INTERVAL_MS / STORY_DURATION_MS) * 100;
        if (next >= 100) {
          handleNext();
          return 0;
        }
        return next;
      });
    }, UPDATE_INTERVAL_MS);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, currentIndex, isPaused, stories.length, handleNext]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentIndex] || stories[0];

  const handleOpenDetails = () => {
    onClose();
    const objectId = currentStory.objectId || currentStory.id;
    if (currentStory.storyType === 'project') {
      if (onSelectProject) {
        onSelectProject(objectId, {
          title: currentStory.title,
          description: currentStory.subtitle,
          image: currentStory.media || currentStory.userImage,
        });
      }
    } else {
      if (onSelectPost) {
        onSelectPost(objectId, {
          title: currentStory.title,
          content: currentStory.subtitle,
          image: currentStory.media || currentStory.userImage,
        });
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(0, 0, 0, 0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      {/* Story Card Container (WhatsApp Mobile Aspect Ratio) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          maxHeight: '92vh',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B0F17',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Story Background Media */}
        <img
          src={
            currentStory.media ||
            currentStory.userImage ||
            'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000'
          }
          alt={currentStory.title || currentStory.userFirstName}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Top Gradient for header clarity */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* Bottom Gradient for caption & buttons */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* Top Section: Progress Bars + Header */}
        <div style={{ position: 'relative', zIndex: 10, padding: '16px 16px 8px 16px' }}>
          {/* WhatsApp-style Segmented Progress Bar */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              width: '100%',
              marginBottom: '12px',
            }}
          >
            {stories.map((_, idx) => {
              let fillPercent = 0;
              if (idx < currentIndex) fillPercent = 100;
              else if (idx === currentIndex) fillPercent = progress;

              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: '3.5px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${fillPercent}%`,
                      background: '#FFFFFF',
                      transition: idx === currentIndex ? 'width 0.05s linear' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* User Info & Actions Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={
                  currentStory.userImage ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                }
                alt={currentStory.userFirstName}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #6B9E41',
                  objectFit: 'cover',
                }}
              />
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', lineHeight: 1.2 }}>
                  {currentStory.userFirstName} {currentStory.userLastName || ''}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '11px' }}>
                  {currentStory.storyType === 'project' ? 'Projet Afri\'Ka' : 'Publication'} • il y a 2h
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Play / Pause */}
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={isPaused ? 'Reprendre' : 'Pause'}
              >
                {isPaused ? <Play size={16} fill="#FFFFFF" /> : <Pause size={16} />}
              </button>

              {/* Close (X) */}
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tap areas for Prev / Next (WhatsApp touch navigation) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
          }}
        >
          {/* Left tap area: Previous */}
          <div
            style={{
              flex: 1,
              height: '100%',
              cursor: 'pointer',
            }}
            onClick={handlePrev}
          />
          {/* Right tap area: Next */}
          <div
            style={{
              flex: 1,
              height: '100%',
              cursor: 'pointer',
            }}
            onClick={handleNext}
          />
        </div>

        {/* Bottom Section: Title, Subtitle, and "Voir détails" Button */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '20px 20px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div>
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 800,
                margin: '0 0 6px 0',
                lineHeight: 1.25,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              }}
            >
              {currentStory.title || 'Initiative Solidaire'}
            </h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '13px',
                lineHeight: 1.45,
                margin: 0,
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {currentStory.subtitle || 'Contribuez et découvrez cette initiative solidaire sur Afri\'Ka.'}
            </p>
          </div>

          {/* Action Button: Voir détails */}
          <button
            type="button"
            onClick={handleOpenDetails}
            style={{
              background: '#6B9E41',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '13px 20px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(107, 158, 65, 0.45)',
              transition: 'transform 0.18s ease, background 0.18s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#588832')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#6B9E41')}
          >
            <span>Voir détails</span>
            <ExternalLink size={16} />
          </button>
        </div>

        {/* Desktop Side Chevron Buttons */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 12,
              background: 'rgba(0, 0, 0, 0.45)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {currentIndex < stories.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 12,
              background: 'rgba(0, 0, 0, 0.45)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
};
