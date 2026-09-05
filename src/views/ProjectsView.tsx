import React, { useState } from 'react';
import type { SupportedCurrency } from '../types';
import { 
  Plus, 
  MapPin, 
  Users, 
  Eye, 
  MessageSquare, 
  Heart,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface ProjectsViewProps {
  currency: SupportedCurrency;
  onSelectProject?: (id: string, data: any) => void;
  onNavigateToCreate?: () => void;
  onNavigateToAll?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  currency: _currency,
  onSelectProject,
  onNavigateToCreate,
  onNavigateToAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'projects' | 'community'>('all');

  const trendingProjects = [
    {
      id: 'proj_umoja_trend',
      title: 'Umoja ni Nguvu',
      subtitle: 'Sote kwa umoja',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      location: 'Goma, RDC',
      members: '3.4K',
      likes: '132k',
      comments: '32k',
      views: '160k',
      description: 'Programme d’assistance alimentaire et agricole solidaire pour l’autosuffisance des communautés du Nord-Kivu.',
    },
    {
      id: 'proj_muungano_1',
      title: 'Projet Muungano',
      subtitle: 'Umoja ni nguvu',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      location: 'Bukavu, RDC',
      members: '2.1K',
      likes: '94k',
      comments: '18k',
      views: '112k',
      description: 'Accompagnement technologique et numérique des jeunes entrepreneurs et artisans en milieu rural.',
    },
    {
      id: 'proj_muungano_2',
      title: 'Projet Muungano',
      subtitle: 'Umoja ni nguvu',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      location: 'Kisangani, RDC',
      members: '1.8K',
      likes: '78k',
      comments: '14k',
      views: '95k',
      description: 'Centre de formation accélérée aux métiers du web et à l’intelligence artificielle appliquée.',
    },
  ];

  const recentProjects = [
    {
      id: 'proj_umoja',
      title: 'Projet Umoja',
      hashtag: '#simamaNaGoma',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000',
      location: 'Goma, RDC',
      members: '3.4K Membres',
      status: 'Actif',
      likes: '132k',
      comments: '32k',
      views: '160k',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make...',
      category: 'projects',
    },
    {
      id: 'proj_kivu_sol',
      title: 'Électrification Solaire Kivu',
      hashtag: '#energieVerte',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000',
      location: 'Beni, RDC',
      members: '4.8K Membres',
      status: 'Actif',
      likes: '89k',
      comments: '19k',
      views: '120k',
      description: 'Installation de mini-réseaux solaires pour fournir de l’électricité aux dispensaires, écoles et ateliers artisanaux du Nord-Kivu.',
      category: 'projects',
    },
    {
      id: 'comm_agri_sahel',
      title: 'AgriTech Sahel & Maraîchage',
      hashtag: '#eauPourTous',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1000',
      location: 'Dakar, Sénégal',
      members: '5.2K Membres',
      status: 'Actif',
      likes: '115k',
      comments: '24k',
      views: '145k',
      description: 'Coopérative de maraîchage biologique intégrant l’irrigation solaire et les techniques de conservation des sols arides.',
      category: 'community',
    },
  ];

  const filteredRecents = recentProjects.filter(p => {
    if (activeFilter === 'projects') return p.category === 'projects';
    if (activeFilter === 'community') return p.category === 'community';
    return true;
  });

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 0 60px 0' }}>
      {/* =========================================================================
          SECTION 1 : PROJET EN TENDANCE (Mockup Screenshot 2)
          ========================================================================= */}
      <div style={{ marginBottom: '28px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            letterSpacing: '-0.3px',
          }}
        >
          Projet en tendance
        </h2>

        {/* Horizontal Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '18px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollbarWidth: 'none',
          }}
        >
          {trendingProjects.map(tp => (
            <div
              key={tp.id}
              style={{
                minWidth: '240px',
                maxWidth: '240px',
                height: '240px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                flexShrink: 0,
                backgroundImage: `url(${tp.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => onSelectProject?.(tp.id, tp)}
            >
              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: '0 0 4px 0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {tp.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
                    {tp.subtitle}
                  </span>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject?.(tp.id, tp);
                    }}
                    style={{
                      background: '#6B9E41',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 24px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    Voir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2 : ACTION BAR (Nouveau Projet + Filtres Tous/Projets/Communauté)
          ========================================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '28px',
        }}
      >
        {/* Big Action Button : Gradient Green to Yellow (Mockup Screenshot 2) */}
        <button
          type="button"
          onClick={onNavigateToCreate}
          style={{
            background: 'linear-gradient(90deg, #74B83E 0%, #F59E0B 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '17px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(116, 184, 62, 0.35)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Plus size={24} strokeWidth={3} />
          <span>Nouveau projet</span>
        </button>

        {/* Right Side: Filters Pills */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              border: 'none',
              background: activeFilter === 'all' ? '#F59E0B' : '#FFFFFF',
              color: activeFilter === 'all' ? '#FFFFFF' : '#64748B',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          >
            Tous
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('projects')}
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              border: 'none',
              background: activeFilter === 'projects' ? '#F59E0B' : '#FFFFFF',
              color: activeFilter === 'projects' ? '#FFFFFF' : '#64748B',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          >
            Projets
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('community')}
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              border: 'none',
              background: activeFilter === 'community' ? '#F59E0B' : '#FFFFFF',
              color: activeFilter === 'community' ? '#FFFFFF' : '#64748B',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          >
            Communauté
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3 : RÉCENT + VOIR TOUT (Mockup Screenshot 2)
          ========================================================================= */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Récent
          </h3>
          <button
            type="button"
            onClick={onNavigateToAll}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              opacity: 0.9,
            }}
          >
            Voir tout
          </button>
        </div>

        {/* Grid of Recent Projects (Mockup Screenshot 2 & 3) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
          {filteredRecents.map(proj => (
            <div
              key={proj.id}
              onClick={() => onSelectProject?.(proj.id, proj)}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Photo with Overlay */}
              <div
                style={{
                  height: '240px',
                  backgroundImage: `url(${proj.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 2px 0' }}>
                    {proj.title}
                  </h4>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    {proj.hashtag}
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div style={{ padding: '16px 20px', color: '#0F172A' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                    {proj.title}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '12px', marginBottom: '14px' }}>
                  <MapPin size={13} />
                  <span>{proj.location}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B9E41' }}>
                    {proj.members} • {proj.status}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Heart size={13} color="#EF4444" fill="#EF4444" />
                      {proj.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageSquare size={13} />
                      {proj.comments}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={13} />
                      {proj.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
