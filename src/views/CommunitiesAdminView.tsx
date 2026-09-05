import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  X, 
  FolderGit2, 
  Hash, 
  Layers
} from 'lucide-react';

export const CommunitiesAdminView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);

  const communities = [
    {
      id: 'com_1',
      name: 'Tech & Innovation Panafricaine',
      category: 'Tech & Fintech',
      description: 'Le réseau des fondateurs tech, ingénieurs et investisseurs en Afrique pour bâtir des infrastructures ouvertes.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
      membersCount: 1420,
      createdAt: '2026-01-10',
      subgroups: [
        { id: 'sg_1', name: 'Intelligence Artificielle & Fintech', itemCount: 18, desc: 'Algorithmes, modèles open-source et micropaiements' },
        { id: 'sg_2', name: 'Systèmes Décentralisés & Blockchain', itemCount: 9, desc: 'Web3 et registres de confiance' },
      ],
      linkedProjects: [
        { id: 'p_1', title: 'Électrification Solaire & Tech Hub Kivu', raised: '8 500 $', goal: '15 000 $' },
        { id: 'p_2', title: 'Kit d’irrigation IoT pour coopératives agricoles', raised: '4 200 $', goal: '6 000 $' },
      ],
      linkedPosts: [
        { id: 'post_1', title: 'Lancement du hub de Goma', author: 'Benoît Mukendi', likes: 42 },
        { id: 'post_2', title: 'Standardisation des APIs de Paiement PawaPay', author: 'Samuel Eto’o Media', likes: 128 },
      ],
      linkedForums: [
        { id: 'f_1', title: 'Retour sur les intégrations Mobile Money PawaPay / Stripe', postsCount: 42 },
        { id: 'f_2', title: 'Sécurisation des serveurs Edge en zone rurale', postsCount: 19 },
      ],
    },
    {
      id: 'com_2',
      name: 'AgriTech & Souveraineté Alimentaire',
      category: 'Agriculture & Écologie',
      description: 'Déploiement de technologies agricoles durables, forage solaire et valorisation des récoltes.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600',
      membersCount: 890,
      createdAt: '2026-01-25',
      subgroups: [
        { id: 'sg_3', name: 'Énergie & Forages Solaires', itemCount: 14, desc: 'Pompage photovoltaïque autonome' },
        { id: 'sg_4', name: 'Transformation & Marchés Locaux', itemCount: 12, desc: 'Circuits courts et conservation' },
      ],
      linkedProjects: [
        { id: 'p_3', title: 'Forage Solaire & Centre Agroécologique Sénégal', raised: '12 400 $', goal: '20 000 $' },
      ],
      linkedPosts: [
        { id: 'post_3', title: '500 tonnes de manioc transformées sans pertes', author: 'Awa Diop NGO', likes: 89 },
      ],
      linkedForums: [
        { id: 'f_3', title: 'Meilleurs capteurs d’humidité compatibles LoRaWAN', postsCount: 28 },
      ],
    },
  ];

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={28} color="var(--color-primary, #6DBE47)" />
          <span>Surveillance des Communautés & Groupes Liés</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Consultez la structure complète de chaque communauté : sous-groupes, membres, projets, posts et forums liés.
        </p>
      </div>

      {/* Communities Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="card-title">Communautés Actives ({filteredCommunities.length})</h3>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Rechercher une communauté ou catégorie..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated, #222)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Communauté</th>
                <th>Catégorie</th>
                <th>Membres</th>
                <th>Sous-Groupes</th>
                <th>Projets Liés</th>
                <th>Forums Liés</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommunities.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={c.image}
                        alt={c.name}
                        style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{c.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Créée le {c.createdAt}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{c.category}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{c.membersCount}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.subgroups.length} groupes</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.linkedProjects.length} projets</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.linkedForums.length} forums</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => setSelectedCommunity(c)}
                    >
                      <Eye size={14} />
                      <span>Détails Complets</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Community Details Modal */}
      {selectedCommunity && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedCommunity(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={selectedCommunity.image}
                alt={selectedCommunity.name}
                style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {selectedCommunity.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span className="badge badge-success">{selectedCommunity.category}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedCommunity.membersCount} membres inscrits</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {selectedCommunity.description}
            </p>

            {/* Subgroups */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <Layers size={16} color="var(--color-primary)" />
                <span>Groupes Liés & Sections ({selectedCommunity.subgroups.length})</span>
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {selectedCommunity.subgroups.map((sg: any) => (
                  <div key={sg.id} style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>{sg.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{sg.desc}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '4px' }}>{sg.itemCount} éléments actifs</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Projects */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <FolderGit2 size={16} color="var(--color-accent)" />
                <span>Projets Associés ({selectedCommunity.linkedProjects.length})</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCommunity.linkedProjects.map((p: any) => (
                  <div key={p.id} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{p.title}</span>
                    <span className="badge badge-neutral">{p.raised} / {p.goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Forums */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <Hash size={16} color="#3B82F6" />
                <span>Forums de Discussion Liés ({selectedCommunity.linkedForums.length})</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCommunity.linkedForums.map((f: any) => (
                  <div key={f.id} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#fff' }}>{f.title}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{f.postsCount} contributions</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedCommunity(null)}>
                Fermer l'Aperçu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
