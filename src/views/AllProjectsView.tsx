import React, { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import type { SupportedCurrency } from '../types';

export interface AllProjectsViewProps {
  currency?: SupportedCurrency;
  onBack: () => void;
  onNavigateToCreate?: () => void;
  onSelectProject?: (projectId: string, projectData?: any) => void;
}

export const AllProjectsView: React.FC<AllProjectsViewProps> = ({
  currency: _currency,
  onBack,
  onNavigateToCreate,
  onSelectProject,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['Tous', 'En cours', 'Populaires', 'Financés', 'Mes projets'];

  const allProjects = [
    {
      id: 'proj_sol_1',
      title: 'Électrification Solaire & Tech Hub Kivu',
      desc: 'Construction d’un incubateur et laboratoire technologique autonome en énergie solaire pour la jeunesse de Goma.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
      goal: '25 000 $',
      percentage: '68% atteint',
      amount: 25000,
      raised: 17000,
      likesCount: 348,
      viewsCount: 1420,
      status: 'En cours',
      authorName: 'Benoît Mukendi',
    },
    {
      id: 'proj_clean_3',
      title: 'Centres de Recyclage & Économie Circulaire Dakar',
      desc: 'Transformation des déchets plastiques urbains en pavés écologiques et matériaux de construction durables.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      goal: '15 000 $',
      percentage: '82% atteint',
      amount: 15000,
      raised: 12300,
      likesCount: 520,
      viewsCount: 2150,
      status: 'Populaires',
      authorName: 'Awa Diop NGO',
    },
    {
      id: 'proj_water_4',
      title: 'Forages d’Eau Potable & Bornes Connectées Sahel',
      desc: 'Installation de 15 points d’eau solaires automatisés avec suivi de débit par télémétrie en zone rurale.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800',
      goal: '35 000 $',
      percentage: '94% atteint',
      amount: 35000,
      raised: 32900,
      likesCount: 680,
      viewsCount: 3100,
      status: 'Financés',
      authorName: 'Fatou Sow',
    },
    {
      id: 'proj_agri_5',
      title: 'Serres Intelligentes & Agroécologie Maraîchère',
      desc: 'Projet pilote d’agriculture verticale hydroponique réduisant la consommation hydrique de 85% à Kinshasa.',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800',
      goal: '18 000 $',
      percentage: '45% atteint',
      amount: 18000,
      raised: 8100,
      likesCount: 290,
      viewsCount: 1140,
      status: 'En cours',
      authorName: 'Kinshasa AgriTech',
    },
  ];

  const filteredProjects = allProjects.filter(p => {
    const matchesFilter = selectedFilter === 'Tous' || p.status === selectedFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
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
      {/* Header Bar matching Flutter CustomAppBar */}
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
              Tout les projets
            </h1>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255, 255, 255, 0.82)' }}>
              Explorez et financez les initiatives panafricaines à fort impact
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
            <span>Lancer un Projet</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
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
          placeholder="Rechercher un projet, une ville ou un domaine..."
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

      {/* Filter Tabs matching Flutter */}
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

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredProjects.map(proj => (
          <PostCard
            key={proj.id}
            id={proj.id}
            title={proj.title}
            desc={proj.desc}
            image={proj.image}
            goal={proj.goal}
            percentage={proj.percentage}
            nbrLikes={proj.likesCount}
            nbrViews={proj.viewsCount}
            type="Projet"
            onViewPressed={() => {
              if (onSelectProject) {
                onSelectProject(proj.id, {
                  title: proj.title,
                  description: proj.desc,
                  image: proj.image,
                  goalAmount: proj.amount,
                  raisedAmount: proj.raised,
                  likesCount: proj.likesCount,
                  viewsCount: proj.viewsCount,
                  authorName: proj.authorName,
                });
              }
            }}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
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
            Aucun projet ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};
