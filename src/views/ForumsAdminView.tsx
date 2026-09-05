import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { 
  Hash, 
  Lock, 
  Eye, 
  Search, 
  X 
} from 'lucide-react';

export const ForumsAdminView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForum, setSelectedForum] = useState<any | null>(null);

  const forums = [
    {
      id: 'f1',
      title: 'Standardisation des APIs de Paiement PawaPay / Stripe',
      community: 'Tech & Innovation Panafricaine',
      subgroup: 'Intelligence Artificielle & Fintech',
      created_by: 'Benoît Mukendi',
      author_cert: 'entrepreneur' as const,
      threads_count: 8,
      posts_count: 42,
      last_activity: 'Aujourd’hui 12:45',
      messages: [
        { id: 'msg_1', author: 'Benoît Mukendi', cert: 'entrepreneur' as const, text: 'Quelqu’un a-t-il testé les webhooks de notification instantanée en RDC avec Airtel et Vodacom ?', time: '10:15' },
        { id: 'msg_2', author: 'Koffi Mensah', cert: 'donor' as const, text: 'Oui, la latence moyenne observée sous PawaPay est de 180ms. C’est très stable pour les dons.', time: '10:45' },
        { id: 'msg_3', author: 'Samuel Eto’o Media', cert: 'public_figure' as const, text: 'Excellente initiative ! Il faut documenter cela pour les autres hubs à Douala et Abidjan.', time: '11:30' },
      ]
    },
    {
      id: 'f2',
      title: 'Retour d’expérience sur l’irrigation goutte-à-goutte',
      community: 'AgriTech & Souveraineté Alimentaire',
      subgroup: 'Énergie & Forages',
      created_by: 'Fondation Awa Diop',
      author_cert: 'organization' as const,
      threads_count: 14,
      posts_count: 89,
      last_activity: 'Hier 18:20',
      messages: [
        { id: 'msg_4', author: 'Awa Diop', cert: 'organization' as const, text: 'Nous avons couplé des panneaux solaires 200W à des électrovannes basse consommation avec succès.', time: 'Hier 14:00' },
        { id: 'msg_5', author: 'Fatou Sow', cert: 'donor' as const, text: 'Bravo pour les résultats ! Quel est le coût unitaire par hectare équipé ?', time: 'Hier 16:30' },
      ]
    },
  ];

  const filtered = forums.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.community.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Hash size={28} color="var(--color-primary, #6DBE47)" />
          <span>Surveillance des Forums Communautaires (Lecture Seule)</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Consultation des conversations et débats des communautés sans droit d'intervention (conforme RBAC).
        </p>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 className="card-title">Discussions Actives</h3>
            <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} /> Mode Auditeur Lecture Seule
            </span>
          </div>

          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Rechercher un sujet de forum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <th>Titre du Forum</th>
                <th>Communauté & Sous-Groupe</th>
                <th>Initié par</th>
                <th>Sujets & Posts</th>
                <th>Dernière Activité</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{f.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {f.id}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px', color: '#fff' }}>{f.community}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{f.subgroup}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#fff' }}>{f.created_by}</span>
                      <CertificationBadge type={f.author_cert} size="sm" />
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{f.posts_count} messages ({f.threads_count} fils)</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{f.last_activity}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => setSelectedForum(f)}
                    >
                      <Eye size={14} />
                      <span>Voir Conversation</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Read-Only Conversation Modal */}
      {selectedForum && (
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
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <button
              onClick={() => setSelectedForum(null)}
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

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-success">{selectedForum.community}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {selectedForum.subgroup}</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                {selectedForum.title}
              </h2>
            </div>

            {/* Read-Only Notice Banner */}
            <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', color: '#facc15', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} />
              <span>Surveillance administrative : Vous ne pouvez pas envoyer de messages dans ce forum communautaire.</span>
            </div>

            {/* Conversation Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', padding: '10px', background: 'var(--bg-surface-elevated, #222)', borderRadius: 'var(--radius-sm)' }}>
              {selectedForum.messages.map((m: any) => (
                <div key={m.id} style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-surface, #181818)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>{m.author}</span>
                      <CertificationBadge type={m.cert} size="sm" />
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.time}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Disabled Input */}
            <div style={{ display: 'flex', gap: '10px', opacity: 0.6 }}>
              <input
                type="text"
                disabled
                placeholder="Envoi désactivé pour les administrateurs (Mode observation uniquement)"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated, #222)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  cursor: 'not-allowed',
                }}
              />
              <button disabled className="btn btn-outline" style={{ cursor: 'not-allowed' }}>
                <Lock size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedForum(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
