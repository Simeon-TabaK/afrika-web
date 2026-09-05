import { useState } from 'react';
import type { CommunitySubgroup } from '../types';
import { MOCK_SUBGROUPS } from '../services/api';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Briefcase, 
  ShoppingBag, 
  Sparkles,
  Info
} from 'lucide-react';

export const CommunitiesView = () => {
  const [subgroups, setSubgroups] = useState<CommunitySubgroup[]>(MOCK_SUBGROUPS);

  // Dynamic filter: Show subgroup ONLY IF item_count > 0 (or if it's not 'produits-services')
  // For 'produits-services', prompt specifically instructed:
  // "Affichage dynamique des sous-groupes (le sous-groupe 'Produits & Services' ne doit s'afficher que si des produits ou services y sont rattachés)"
  const visibleSubgroups = subgroups.filter(sg => {
    if (sg.slug === 'produits-services') {
      return sg.item_count > 0;
    }
    return true;
  });

  const toggleProductCount = () => {
    setSubgroups(prev => prev.map(sg => {
      if (sg.slug === 'produits-services') {
        const newCount = sg.item_count === 0 ? 3 : 0;
        return { ...sg, item_count: newCount };
      }
      return sg;
    }));
  };

  const getSubgroupIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare size={24} color="#6B9E41" />;
      case 'Calendar': return <Calendar size={24} color="#F0BA31" />;
      case 'Briefcase': return <Briefcase size={24} color="#3B82F6" />;
      case 'ShoppingBag': return <ShoppingBag size={24} color="#10B981" />;
      default: return <Users size={24} color="#6B9E41" />;
    }
  };

  const productSubgroup = subgroups.find(sg => sg.slug === 'produits-services');
  const isProductVisible = (productSubgroup?.item_count || 0) > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={28} color="#6B9E41" />
            <span>Espaces Communautaires & Sous-Groupes</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Organisation thématique des échanges, événements et catalogue d'initiatives.
          </p>
        </div>

        {/* Interactive Demo Toggle for Dynamic Filtering */}
        <button
          className={`btn ${isProductVisible ? 'btn-danger' : 'btn-accent'}`}
          onClick={toggleProductCount}
        >
          <Sparkles size={16} />
          <span>
            {isProductVisible 
              ? 'Simuler 0 produit (Masquer le sous-groupe)' 
              : 'Simuler rattachement produits (Afficher le sous-groupe)'}
          </span>
        </button>
      </div>

      {/* Dynamic Rule Banner */}
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Info size={20} color="#F0BA31" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          <strong style={{ color: '#fff' }}>Règle Métier Active : </strong>
          Le sous-groupe <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>« Produits & Services »</span> est filtré dynamiquement et ne s'affiche que si son inventaire est strictement supérieur à zéro.
          Statut actuel : {isProductVisible ? (
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}> Visible ({productSubgroup?.item_count} articles)</span>
          ) : (
            <span style={{ color: 'var(--status-danger)', fontWeight: 700 }}> Masqué (0 article rattaché)</span>
          )}
        </div>
      </div>

      {/* Subgroups Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {visibleSubgroups.map((sg) => (
          <div
            key={sg.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: sg.slug === 'produits-services' ? '1px solid rgba(16, 185, 129, 0.4)' : undefined,
              boxShadow: sg.slug === 'produits-services' ? '0 0 15px rgba(16, 185, 129, 0.15)' : undefined
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getSubgroupIcon(sg.icon_name)}
                </div>
                <span className="badge badge-success">
                  {sg.item_count} {sg.slug === 'discussions' ? 'discussions' : 'éléments'}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                {sg.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {sg.description}
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Accès membre</span>
              <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Ouvrir l'Espace
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
