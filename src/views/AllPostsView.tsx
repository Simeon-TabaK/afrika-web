import React, { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { PostCard } from '../components/PostCard';

export interface AllPostsViewProps {
  onBack: () => void;
  onNavigateToCreate?: () => void;
  onSelectPost?: (postId: string, postData?: any) => void;
}

export const AllPostsView: React.FC<AllPostsViewProps> = ({
  onBack,
  onNavigateToCreate,
  onSelectPost,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Filters exacts de Flutter all_posts_screen.dart
  const filters = ['Tous', 'Populaires', 'Nouveaux', 'Favoris'];

  const allPosts = [
    {
      id: 'post_agri_2',
      title: 'Lancement du Réseau AgriTech Sahel',
      desc: 'Déploiement des premiers capteurs IoT d’irrigation intelligente pour préserver les ressources en eau et soutenir les agriculteurs familiaux.',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800',
      likesCount: 174,
      viewsCount: 890,
      filterType: 'Nouveaux',
      authorName: 'Fatou Sow',
      authorCertification: 'organization',
    },
    {
      id: 'post_edu_4',
      title: 'Académie du Code Panafricaine : Promo 2026',
      desc: 'Félicitations aux 120 jeunes diplômés en génie logiciel et intelligence artificielle appliquée aux défis africains !',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      likesCount: 412,
      viewsCount: 1680,
      filterType: 'Populaires',
      authorName: 'Samuel Eto’o Media',
      authorCertification: 'public_figure',
    },
    {
      id: 'post_fintech_5',
      title: 'Interopérabilité des Paiements Mobiles : Nouvelle Ère',
      desc: 'Comment l’ouverture des API bancaires et le Mobile Money unifié accélèrent le commerce transfrontalier en zone CEMAC et CEDEAO.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
      likesCount: 285,
      viewsCount: 1120,
      filterType: 'Favoris',
      authorName: 'Benoît Mukendi',
      authorCertification: 'entrepreneur',
    },
    {
      id: 'post_health_6',
      title: 'Télé-Médecine & Drones Médicaux dans les Zones Isolées',
      desc: 'Livraison express de vaccins et kits de premiers secours dans 45 dispensaires ruraux grâce à la flotte de drones autonomes.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      likesCount: 360,
      viewsCount: 1450,
      filterType: 'Nouveaux',
      authorName: 'Awa Diop NGO',
      authorCertification: 'donor',
    },
  ];

  const filteredPosts = allPosts.filter(post => {
    const matchesFilter = selectedFilter === 'Tous' || post.filterType === selectedFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      style={{
        background: 'var(--color-primary, #6B9E41)',
        minHeight: '100%',
        padding: '24px 20px 48px',
        borderRadius: '24px',
        color: '#FFFFFF',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            title="Retour à l'accueil"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
              Publications & Nouveautés
            </h1>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255, 255, 255, 0.82)' }}>
              Les dernières actualités partagées par les membres certifiés et organisations
            </p>
          </div>
        </div>

        {onNavigateToCreate && (
          <button
            onClick={onNavigateToCreate}
            style={{
              background: '#FFFFFF',
              color: '#6B9E41',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Plus size={18} />
            <span>Créer une Publication</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '18px' }}>
        <Search
          size={18}
          color="rgba(255, 255, 255, 0.75)"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une publication, un auteur ou un sujet..."
          style={{
            width: '100%',
            padding: '14px 16px 14px 44px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            background: 'rgba(255, 255, 255, 0.18)',
            color: '#FFFFFF',
            fontSize: '14px',
            backdropFilter: 'blur(10px)',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter Tabs matching Flutter all_posts_screen.dart */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px',
        }}
      >
        {filters.map(f => {
          const isActive = selectedFilter === f;
          return (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: isActive ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.35)',
                background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)',
                color: isActive ? '#6B9E41' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Posts Feed Grid / List */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            desc={post.desc}
            image={post.image}
            nbrLikes={post.likesCount}
            nbrViews={post.viewsCount}
            type="Publication"
            onViewPressed={() => {
              if (onSelectPost) {
                onSelectPost(post.id, {
                  title: post.title,
                  content: post.desc,
                  image: post.image,
                  likesCount: post.likesCount,
                  viewsCount: post.viewsCount,
                  authorName: post.authorName,
                  authorCertification: post.authorCertification,
                });
              }
            }}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            marginTop: '20px',
          }}
        >
          <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
            Aucune publication ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};
