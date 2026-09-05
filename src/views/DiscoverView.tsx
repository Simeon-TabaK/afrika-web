import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { FeedDiscoverService } from '../services/feedService';
import type { FeedDiscoverModel } from '../models/feed';
import { PostCard } from '../components/PostCard';
import type { SupportedCurrency } from '../types';

export interface DiscoverViewProps {
  currency?: SupportedCurrency;
  onSelectProject?: (projectId: string, projectData?: any) => void;
  onSelectCommunity?: (communityId: string, communityData?: any) => void;
  filterCategory?: 'all' | 'projects' | 'communities';
  searchQuery?: string;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  currency: _currency,
  onSelectProject,
  onSelectCommunity,
  filterCategory = 'all',
  searchQuery = '',
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<FeedDiscoverModel[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDiscoverFeed = async () => {
    setLoading(true);
    try {
      const data = await FeedDiscoverService.fetchDiscoverFeeds(1);
      setItems(data);
    } catch (e) {
      console.error('Erreur chargement Discover feed:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscoverFeed();
  }, []);

  const handleCardClick = (item: FeedDiscoverModel) => {
    if (item.type === 'project') {
      if (onSelectProject) {
        onSelectProject(item.id, {
          title: item.title,
          description: item.subtitle,
          image: item.image,
          goalAmount: 25000,
          raisedAmount: 17000,
          likesCount: item.likesCount || 340,
          viewsCount: item.viewsCount || 1200,
          authorName: 'Initiative Panafricaine',
        });
      }
    } else {
      if (onSelectCommunity) {
        onSelectCommunity(item.id, {
          name: item.title,
          description: item.subtitle,
          image: item.image,
          category: item.category,
          membersCount: item.membersCount || 890,
          followersCount: item.followersCount || 1420,
        });
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'projects' && item.type === 'project') ||
      (filterCategory === 'communities' && item.type === 'community');
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="flutter-discover-container"
      style={{
        background: 'transparent',
        minHeight: '100%',
        padding: '0 0 60px 0',
        color: '#FFFFFF',
      }}
    >
      {/* Header controls with refresh */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          onClick={loadDiscoverFeed}
          style={{
            background: 'rgba(255, 255, 255, 0.20)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          title={t('refresh', 'Actualiser')}
        >
          <RefreshCw size={14} className={loading ? 'spinning' : ''} />
          <span>{t('refresh', 'Actualiser')}</span>
        </button>
      </div>

      {/* Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {filteredItems.map((item) => (
          <PostCard
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.subtitle}
            image={item.image}
            goal={item.type === 'project' ? '25 000 $' : undefined}
            percentage={item.type === 'project' ? '68% atteint' : undefined}
            nbrLikes={item.likesCount || '132k'}
            nbrViews={item.viewsCount || '160k'}
            membersCount={item.membersCount ? `${(item.membersCount / 1000).toFixed(1)}K` : '3.4K'}
            isActiveStatus={true}
            type={item.type === 'project' ? 'Projet' : 'Communauté'}
            onViewPressed={() => handleCardClick(item)}
            onLikesPressed={() => {
              setItems(prev =>
                prev.map(i =>
                  i.id === item.id ? { ...i, likesCount: (i.likesCount || 0) + 1 } : i
                )
              );
            }}
          />
        ))}

        {filteredItems.length === 0 && !loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
              {t('no_results', 'Aucun résultat pour cette sélection')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
