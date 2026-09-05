import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { type CertificationType, CERTIFICATION_CONFIGS } from '../types';
import { 
  Users, 
  Search, 
  Eye, 
  X
} from 'lucide-react';

export const UsersAdminView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'Super Admin',
      email: 'admin@afrika.com',
      role: 'super_admin',
      certification: 'organization' as CertificationType,
      postsCount: 12,
      projectsCount: 3,
      communitiesCount: 5,
      joinedAt: '2024-01-10',
    },
    {
      id: 'u2',
      name: 'Benoît Mukendi',
      email: 'entrepreneur.benoit@afrika.com',
      role: 'user',
      certification: 'entrepreneur' as CertificationType,
      postsCount: 24,
      projectsCount: 2,
      communitiesCount: 4,
      joinedAt: '2024-02-15',
    },
    {
      id: 'u3',
      name: 'Fatou Sow',
      email: 'patron.fatou@afrika.com',
      role: 'user',
      certification: 'donor' as const,
      postsCount: 8,
      projectsCount: 1,
      communitiesCount: 3,
      joinedAt: '2024-03-01',
    },
    {
      id: 'u4',
      name: 'Samuel Eto’o',
      email: 'vip.samuel@afrika.com',
      role: 'user',
      certification: 'public_figure' as const,
      postsCount: 45,
      projectsCount: 4,
      communitiesCount: 6,
      joinedAt: '2024-01-20',
    },
    {
      id: 'u5',
      name: 'Amina Koné',
      email: 'member@afrika.com',
      role: 'user',
      certification: 'none' as const,
      postsCount: 3,
      projectsCount: 0,
      communitiesCount: 2,
      joinedAt: '2024-04-12',
    },
  ]);

  const handleDirectCertify = (userId: string, newTier: CertificationType) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, certification: newTier } : u
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev: any) => ({ ...prev, certification: newTier }));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={28} color="var(--color-primary, #6DBE47)" />
          <span>Gestion des Utilisateurs & Attribution Directe de Certification</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Réservé au Super Administrateur : consultation des profils, projets/posts liés et attribution immédiate des 5 niveaux de certification.
        </p>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="card-title">Annuaire Global des Membres ({users.length})</h3>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Filtrer par nom ou email..."
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
                <th>Utilisateur</th>
                <th>Rôle Système</th>
                <th>Certification Actuelle</th>
                <th>Activité Liée</th>
                <th>Date d'Inscription</th>
                <th style={{ textAlign: 'right' }}>Certification Directe & Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center' }}>
                      <span>{u.name}</span>
                      <CertificationBadge type={u.certification} size="sm" />
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${u.role === 'super_admin' ? 'badge-danger' : 'badge-neutral'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <CertificationBadge type={u.certification} showLabel size="md" />
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {u.postsCount} posts • {u.projectsCount} projets • {u.communitiesCount} groupes
                    </div>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.joinedAt}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {/* Direct Certification Tier Dropdown */}
                      <select
                        value={u.certification}
                        onChange={e => handleDirectCertify(u.id, e.target.value as CertificationType)}
                        style={{
                          background: 'var(--bg-surface-elevated, #222)',
                          color: CERTIFICATION_CONFIGS[u.certification].color,
                          border: `1px solid ${CERTIFICATION_CONFIGS[u.certification].color}80`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="none">Point • Non certifié (#9E9E9E)</option>
                        <option value="donor">Étoile ★ Donateur (#2196F3)</option>
                        <option value="entrepreneur">Étoile ★ Entrepreneur (#4CAF50)</option>
                        <option value="public_figure">Étoile ★ Pers. Publique (#FFD700)</option>
                        <option value="organization">Étoile ★ Org / ONG (#9C27B0)</option>
                      </select>

                      <button
                        className="btn btn-outline"
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => setSelectedUser(u)}
                      >
                        <Eye size={12} />
                        <span>Détails</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
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
              maxWidth: '600px',
              width: '100%',
              padding: '24px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedUser(null)}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    {selectedUser.name}
                  </h2>
                  <CertificationBadge type={selectedUser.certification} size="md" />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedUser.email}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)' }}>{selectedUser.postsCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posts Publiés</div>
              </div>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-accent)' }}>{selectedUser.projectsCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Projets Créés</div>
              </div>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#3B82F6' }}>{selectedUser.communitiesCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Groupes Membre</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedUser(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
