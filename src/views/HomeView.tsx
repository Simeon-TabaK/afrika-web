import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Coins, Sparkles, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { FeedService, ReactionsService } from '../services/feedService';
import type { FeedModel, StoryModel } from '../models/feed';
import { PostCard } from '../components/PostCard';
import { StoryViewerModal } from '../components/StoryViewerModal';
import type { SupportedCurrency } from '../types';

export interface HomeViewProps {
  currency: SupportedCurrency;
  onNavigateToCreate?: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToAllProjects?: () => void;
  onNavigateToAllPosts?: () => void;
  onSelectPost?: (postId: string, postData?: any) => void;
  onSelectProject?: (projectId: string, projectData?: any) => void;
  filterCategory?: 'all' | 'projects' | 'communities';
  onSelectFilterCategory?: (category: 'all' | 'projects' | 'communities') => void;
  searchQuery?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency: _currency,
  onNavigateToCreate,
  onNavigateToAllProjects,
  onNavigateToAllPosts,
  onSelectPost,
  onSelectProject,
  filterCategory = 'all',
  onSelectFilterCategory,
  searchQuery = '',
}) => {
  const { t } = useTranslation();
  const [feedItems, setFeedItems] = useState<FeedModel[]>([]);
  const [stories, setStories] = useState<StoryModel[]>([]);
  const [loading, setLoading] = useState(true);

  // WhatsApp-style Story Viewer Modal state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  // Scroll ref & drag-to-scroll for horizontal story list
  const storiesScrollRef = useRef<HTMLDivElement>(null);
  const [isDraggingStories, setIsDraggingStories] = useState(false);
  const [storiesStartX, setStoriesStartX] = useState(0);
  const [storiesScrollLeft, setStoriesScrollLeft] = useState(0);

  const handleStoriesMouseDown = (e: React.MouseEvent) => {
    if (!storiesScrollRef.current) return;
    setIsDraggingStories(true);
    setStoriesStartX(e.pageX - storiesScrollRef.current.offsetLeft);
    setStoriesScrollLeft(storiesScrollRef.current.scrollLeft);
  };

  const handleStoriesMouseLeave = () => {
    setIsDraggingStories(false);
  };

  const handleStoriesMouseUp = () => {
    setIsDraggingStories(false);
  };

  const handleStoriesMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingStories || !storiesScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - storiesScrollRef.current.offsetLeft;
    const walk = (x - storiesStartX) * 1.4;
    storiesScrollRef.current.scrollLeft = storiesScrollLeft - walk;
  };

  const scrollStories = (direction: 'left' | 'right') => {
    if (storiesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      storiesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [feed, st] = await Promise.all([
        FeedService.fetchFeed(1),
        FeedService.fetchStories(),
      ]);
      setFeedItems(feed);
      setStories(st);
    } catch (e) {
      console.error('Erreur chargement Home feed:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleLike = async (item: FeedModel) => {
    const nextLiked = !item.hasLiked;
    const diff = nextLiked ? 1 : -1;

    setFeedItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, hasLiked: nextLiked, likesCount: i.likesCount + diff }
          : i
      )
    );

    await ReactionsService.toggleLike(item.id, item.type);
  };

  const handleCardClick = (item: FeedModel) => {
    if (item.type === 'project') {
      if (onSelectProject) {
        onSelectProject(item.id, {
          title: item.title,
          description: item.subtitle,
          image: item.image,
          goalAmount: item.amount,
          raisedAmount: item.amount ? Math.round(item.amount * ((item.progress || 50) / 100)) : 12000,
          likesCount: item.likesCount,
          viewsCount: item.viewsCount,
          authorName: item.author?.name,
          authorAvatar: item.author?.avatar,
          authorCertification: item.author?.certification,
        });
      }
    } else {
      if (onSelectPost) {
        onSelectPost(item.id, {
          title: item.title,
          content: item.subtitle,
          image: item.image,
          likesCount: item.likesCount,
          viewsCount: item.viewsCount,
          authorName: item.author?.name,
          authorAvatar: item.author?.avatar,
          authorCertification: item.author?.certification,
          hasLiked: item.hasLiked,
        });
      }
    }
  };

  // Filter based on filterCategory and searchQuery
  const filteredFeed = feedItems.filter((item) => {
    if (filterCategory === 'projects' && item.type !== 'project') return false;
    if (filterCategory === 'communities' && item.type !== 'post') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle ? item.subtitle.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchSub) return false;
    }
    return true;
  });

  return (
    <div
      className="flutter-home-container"
      style={{
        background: 'transparent',
        minHeight: '100%',
        width: '100%',
        padding: '0 0 60px 0',
        color: '#FFFFFF',
      }}
    >
      {/* =========================================================================
          SECTION 1 : TENDANCE (Stories prenant TOUT l'espace horizontal)
          ========================================================================= */}
      <section style={{ marginBottom: '20px', width: '100%' }}>
        {/* Titre 1 : Tendance avec contrôles de scroll */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            padding: '0 4px',
          }}
        >
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            Tendance
          </h2>

          {/* Boutons de scroll horizontal */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => scrollStories('left')}
              title="Défiler vers la gauche"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollStories('right')}
              title="Défiler vers la droite"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Conteneur horizontal des stories (pleine largeur, défilement souris & tactile) */}
        <div
          ref={storiesScrollRef}
          onMouseDown={handleStoriesMouseDown}
          onMouseLeave={handleStoriesMouseLeave}
          onMouseUp={handleStoriesMouseUp}
          onMouseMove={handleStoriesMouseMove}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollbarWidth: 'none',
            scrollBehavior: isDraggingStories ? 'auto' : 'smooth',
            width: '100%',
            cursor: isDraggingStories ? 'grabbing' : 'grab',
            userSelect: isDraggingStories ? 'none' : 'auto',
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Carte 0 : Visible UNIQUEMENT lorsqu'il n'y a pas de story */}
          {stories.length === 0 && (
            <div
              onClick={onNavigateToCreate}
              style={{
                minWidth: '160px',
                maxWidth: '160px',
                height: '165px',
                borderRadius: '14px',
                border: '1.5px dashed rgba(255, 255, 255, 0.55)',
                background: 'rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#6B9E41',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                }}
              >
                <Plus size={24} strokeWidth={2.8} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', padding: '0 8px' }}>
                Ajouter story
              </span>
            </div>
          )}

          {/* Cartes Stories : rectangulaires fidèles à Flutter StoryCard */}
          {stories.map((story, idx) => (
            <div
              key={story.id}
              onClick={() => {
                setViewerInitialIndex(idx);
                setIsViewerOpen(true);
              }}
              style={{
                position: 'relative',
                minWidth: '260px',
                maxWidth: '260px',
                height: '165px',
                borderRadius: '14px',
                overflow: 'hidden',
                flexShrink: 0,
                cursor: 'pointer',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px 16px',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.18)';
              }}
            >
              {/* Image de fond de la story */}
              <img
                src={
                  story.media ||
                  story.userImage ||
                  'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600'
                }
                alt={story.title || story.userFirstName}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              />

              {/* Gradient sombre pour lisibilité du texte */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.15) 100%)',
                  zIndex: 1,
                }}
              />

              {/* Contenu supérieur : Titre et Sous-titre */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: 800,
                    margin: '0 0 4px 0',
                    lineHeight: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {story.title || `${story.userFirstName} • ${story.storyType === 'project' ? 'Projet' : 'Publication'}`}
                </h3>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.88)',
                    fontSize: '12px',
                    margin: 0,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {story.subtitle || (story.storyType === 'project' ? 'Découvrez cette initiative' : 'Rejoignez la discussion')}
                </p>
              </div>

              {/* Bouton vert Voir */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (story.storyType === 'project' && onSelectProject) {
                      onSelectProject(story.objectId || 'proj_sol_1');
                    } else if (onSelectPost) {
                      onSelectPost(story.objectId || 'post_agri_2');
                    }
                  }}
                  style={{
                    background: '#6B9E41',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 18px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#588832')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#6B9E41')}
                >
                  {t('see')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FORMAT TÉLÉPHONE : FILTRES APRÈS LES STORIES
          ========================================================================= */}
      <div
        className="mobile-filters-row"
        style={{
          display: 'none', // Active on phone mode (max-width: 768px)
          gap: '10px',
          overflowX: 'auto',
          padding: '4px 0 16px 0',
          marginBottom: '10px',
          scrollbarWidth: 'none',
        }}
      >
        <button
          type="button"
          onClick={() => onSelectFilterCategory?.('all')}
          style={{
            background: filterCategory === 'all' ? '#F0BA31' : 'rgba(255, 255, 255, 0.22)',
            color: filterCategory === 'all' ? '#1E293B' : '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            borderRadius: '999px',
            padding: '9px 20px',
            border: 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: filterCategory === 'all' ? '0 4px 12px rgba(240, 186, 49, 0.4)' : 'none',
          }}
        >
          {t('all')}
        </button>
        <button
          type="button"
          onClick={() => onSelectFilterCategory?.('projects')}
          style={{
            background: filterCategory === 'projects' ? '#F0BA31' : 'rgba(255, 255, 255, 0.22)',
            color: filterCategory === 'projects' ? '#1E293B' : '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            borderRadius: '999px',
            padding: '9px 20px',
            border: 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: filterCategory === 'projects' ? '0 4px 12px rgba(240, 186, 49, 0.4)' : 'none',
          }}
        >
          {t('projects')}
        </button>
        <button
          type="button"
          onClick={() => onSelectFilterCategory?.('communities')}
          style={{
            background: filterCategory === 'communities' ? '#F0BA31' : 'rgba(255, 255, 255, 0.22)',
            color: filterCategory === 'communities' ? '#1E293B' : '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            borderRadius: '999px',
            padding: '9px 20px',
            border: 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: filterCategory === 'communities' ? '0 4px 12px rgba(240, 186, 49, 0.4)' : 'none',
          }}
        >
          {t('community_tag')}
        </button>
      </div>

      {/* =========================================================================
          SECTION 2 : COMMUNAUTÉS À DÉCOUVRIR + FILTRES PC/TABLETTE DESCENDUS
          ========================================================================= */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {/* Colonne Principale : Feed de Communautés & Projets */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Header de Section 2 : Communautés à découvrir */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '0 4px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.2px',
              }}
            >
              Communautés à découvrir
            </h2>

            {/* Boutons rapides Projets & Nouveautés */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onNavigateToAllProjects}
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.32)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)')}
              >
                <Coins size={16} />
                <span>{t('projects')} (Voir Plus)</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToAllPosts}
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.32)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)')}
              >
                <Sparkles size={16} />
                <span>Nouveautés (Voir Plus)</span>
              </button>

              <button
                type="button"
                onClick={loadData}
                style={{
                  background: 'rgba(255, 255, 255, 0.20)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#FFFFFF',
                  padding: '9px 11px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Actualiser"
              >
                <RefreshCw size={15} className={loading ? 'spinning' : ''} />
              </button>
            </div>
          </div>

          {/* Liste des Cartes Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {filteredFeed.map((item) => (
              <PostCard
                key={item.id}
                id={item.id}
                title={item.title}
                desc={item.subtitle}
                image={item.image}
                goal={item.type === 'project' ? `${(item.amount || 10000).toLocaleString()} $` : undefined}
                percentage={item.type === 'project' ? `${item.progress || 45}% atteint` : undefined}
                nbrLikes={item.likesCount || '132k'}
                nbrViews={item.viewsCount || '160k'}
                membersCount={item.type === 'project' ? '1.2K' : '3.4K'}
                isActiveStatus={true}
                hasLiked={item.hasLiked}
                type={item.type === 'project' ? 'Projet' : 'Communauté'}
                onViewPressed={() => handleCardClick(item)}
                onLikesPressed={() => handleToggleLike(item)}
              />
            ))}

            {filteredFeed.length === 0 && !loading && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: '24px',
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                  Aucun contenu correspondant
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne Droite : Filtres PC / Tablette descendus au niveau de la section 2 */}
        <aside
          className="desktop-filter-column"
          style={{
            width: '160px',
            minWidth: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'sticky',
            top: '160px',
            height: 'fit-content',
          }}
        >
          {/* Filtre 1: Tous */}
          <button
            type="button"
            onClick={() => onSelectFilterCategory?.('all')}
            style={{
              background: filterCategory === 'all' ? '#F0BA31' : '#FFFFFF',
              color: filterCategory === 'all' ? '#1E293B' : '#64748B',
              fontWeight: 800,
              fontSize: '15px',
              borderRadius: '9999px',
              padding: '13px 20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow:
                filterCategory === 'all'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {t('all')}
          </button>

          {/* Filtre 2: Projets */}
          <button
            type="button"
            onClick={() => onSelectFilterCategory?.('projects')}
            style={{
              background: filterCategory === 'projects' ? '#F0BA31' : '#FFFFFF',
              color: filterCategory === 'projects' ? '#1E293B' : '#64748B',
              fontWeight: 800,
              fontSize: '15px',
              borderRadius: '9999px',
              padding: '13px 20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow:
                filterCategory === 'projects'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {t('projects')}
          </button>

          {/* Filtre 3: Communauté */}
          <button
            type="button"
            onClick={() => onSelectFilterCategory?.('communities')}
            style={{
              background: filterCategory === 'communities' ? '#F0BA31' : '#FFFFFF',
              color: filterCategory === 'communities' ? '#1E293B' : '#64748B',
              fontWeight: 800,
              fontSize: '15px',
              borderRadius: '9999px',
              padding: '13px 20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow:
                filterCategory === 'communities'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {t('community_tag')}
          </button>
        </aside>
      </div>

      {/* =========================================================================
          VISIONNEUSE DE STORY STYLE WHATSAPP (StoryViewerModal)
          ========================================================================= */}
      <StoryViewerModal
        stories={stories}
        initialIndex={viewerInitialIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onSelectProject={(projId, projData) => {
          setIsViewerOpen(false);
          if (onSelectProject) onSelectProject(projId, projData);
        }}
        onSelectPost={(pstId, pstData) => {
          setIsViewerOpen(false);
          if (onSelectPost) onSelectPost(pstId, pstData);
        }}
      />
    </div>
  );
};
