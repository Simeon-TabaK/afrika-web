import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { type CertificationType, CERTIFICATION_CONFIGS, type UserRole } from '../types';
import { 
  BadgeCheck, 
  Search, 
  AlertCircle, 
  Check, 
  UserPlus
} from 'lucide-react';

interface CertifiedUsersAdminViewProps {
  currentRole: UserRole;
}

export const CertifiedUsersAdminView: React.FC<CertifiedUsersAdminViewProps> = ({ currentRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTierFilter, setActiveTierFilter] = useState<string>('all');
  const [selectedUserToCertify, setSelectedUserToCertify] = useState<string>('');
  const [targetTier, setTargetTier] = useState<CertificationType>('entrepreneur');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const isSuperAdmin = currentRole === 'super_admin';

  const [certifiedUsers, setCertifiedUsers] = useState([
    {
      id: 'cu_1',
      name: 'Benoît Mukendi',
      email: 'entrepreneur.benoit@afrika.com',
      certification: 'entrepreneur' as CertificationType,
      domain: 'Fintech & Énergie Solaire',
      issuedAt: '2026-02-15',
      kycFee: '28 500 CDF',
      status: 'active',
    },
    {
      id: 'cu_2',
      name: 'Samuel Eto’o Media',
      email: 'vip.samuel@afrika.com',
      certification: 'public_figure' as CertificationType,
      domain: 'Sport & Leadership Jeunesse',
      issuedAt: '2026-01-20',
      kycFee: '50 USD',
      status: 'active',
    },
    {
      id: 'cu_3',
      name: 'Fatou Sow',
      email: 'patron.fatou@afrika.com',
      certification: 'donor' as CertificationType,
      domain: 'Mécénat Éducatif & Santé',
      issuedAt: '2026-03-01',
      kycFee: '15 000 XOF',
      status: 'active',
    },
    {
      id: 'cu_4',
      name: 'Awa Diop NGO',
      email: 'contact@awadiop.org',
      certification: 'organization' as CertificationType,
      domain: 'Souveraineté Alimentaire & Eau',
      issuedAt: '2026-02-10',
      kycFee: '100 USD',
      status: 'active',
    },
    {
      id: 'cu_5',
      name: 'Super Admin',
      email: 'superadmin@afrika.com',
      certification: 'organization' as CertificationType,
      domain: 'Gouvernance Plateforme',
      issuedAt: '2026-01-01',
      kycFee: '0 USD (Système)',
      status: 'active',
    },
  ]);

  const candidatesForCertification = [
    { id: 'cand_1', name: 'Amina Koné', email: 'member@afrika.com' },
    { id: 'cand_2', name: 'Koffi Mensah', email: 'koffi@mensah.ci' },
    { id: 'cand_3', name: 'Zahara Mwangi', email: 'zahara@techhub.ke' },
  ];

  const handleApplyCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserToCertify) return;
    const candidate = candidatesForCertification.find(c => c.id === selectedUserToCertify);
    if (!candidate) return;

    setCertifiedUsers(prev => [
      {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        certification: targetTier,
        domain: 'Initiative Validée Directement',
        issuedAt: new Date().toISOString().split('T')[0],
        kycFee: 'Exempté (Super Admin)',
        status: 'active',
      },
      ...prev,
    ]);

    setSuccessMsg(`Certification attribuée avec succès à ${candidate.name} (${CERTIFICATION_CONFIGS[targetTier].label}) !`);
    setSelectedUserToCertify('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleUpdateTier = (userId: string, newTier: CertificationType) => {
    if (!isSuperAdmin) return;
    setCertifiedUsers(prev => prev.map(u => u.id === userId ? { ...u, certification: newTier } : u));
    setSuccessMsg('Niveau de certification mis à jour avec succès.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredUsers = certifiedUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = activeTierFilter === 'all' || u.certification === activeTierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BadgeCheck size={28} color="var(--color-primary, #6DBE47)" />
          <span>Annuaire des Utilisateurs Certifiés & Actions de Certification</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Contrôlez les statuts vérifiés selon les 5 paliers du Design System Afri-ka.
        </p>
      </div>

      {/* Super Admin Direct Certify Tool */}
      {isSuperAdmin ? (
        <div className="card" style={{ border: '1px solid rgba(109, 190, 71, 0.4)', background: 'linear-gradient(135deg, rgba(109, 190, 71, 0.05), transparent)' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={18} color="var(--color-primary)" />
              <span>Outil Exclusif Super Admin : Attribution Directe de Certification</span>
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            En tant que Super Administrateur, vous pouvez certifier directement n'importe quel membre sans exiger la vérification KYC payante :
          </p>
          <form onSubmit={handleApplyCertification} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={selectedUserToCertify}
              onChange={e => setSelectedUserToCertify(e.target.value)}
              className="select-input"
              style={{ minWidth: '240px', padding: '10px 14px' }}
              required
            >
              <option value="">Sélectionner un utilisateur standard...</option>
              {candidatesForCertification.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>

            <select
              value={targetTier}
              onChange={e => setTargetTier(e.target.value as CertificationType)}
              className="select-input"
              style={{ minWidth: '220px', padding: '10px 14px' }}
            >
              <option value="donor">Donateur (★ Bleu - #2196F3)</option>
              <option value="entrepreneur">Entrepreneur (★ Vert - #4CAF50)</option>
              <option value="public_figure">Personnalité Publique (★ Or - #FFD700)</option>
              <option value="organization">Organisation / ONG (★ Violet - #9C27B0)</option>
            </select>

            <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
              <Check size={16} />
              <span>Certifier l'Utilisateur</span>
            </button>
          </form>

          {successMsg && (
            <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(109, 190, 71, 0.2)', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 600 }}>
              {successMsg}
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} />
          <span>Information de restriction RBAC : Seul le Super Administrateur peut attribuer ou révoquer directement des certifications.</span>
        </div>
      )}

      {/* Filter Chips by Certification Tier */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: `Tous les Certifiés (${certifiedUsers.length})` },
          { id: 'donor', label: 'Donateurs (★ Bleu)' },
          { id: 'entrepreneur', label: 'Entrepreneurs (★ Vert)' },
          { id: 'public_figure', label: 'Personnalités (★ Or)' },
          { id: 'organization', label: 'Organisations (★ Violet)' },
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setActiveTierFilter(chip.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: activeTierFilter === chip.id ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
              background: activeTierFilter === chip.id ? 'rgba(109, 190, 71, 0.15)' : 'var(--bg-surface-elevated, #222)',
              color: activeTierFilter === chip.id ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="card-title">Membres Actuellement Certifiés ({filteredUsers.length})</h3>
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Filtrer par nom, email ou domaine..."
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
                <th>Membre Certifié</th>
                <th>Palier Officiel</th>
                <th>Domaine d'Action</th>
                <th>Date d'Attribution</th>
                <th>Frais / Origine</th>
                {isSuperAdmin && <th style={{ textAlign: 'right' }}>Actions Super Admin</th>}
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
                    <CertificationBadge type={u.certification} showLabel size="md" />
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{u.domain}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.issuedAt}</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>{u.kycFee}</span>
                  </td>
                  {isSuperAdmin && (
                    <td style={{ textAlign: 'right' }}>
                      <select
                        value={u.certification}
                        onChange={e => handleUpdateTier(u.id, e.target.value as CertificationType)}
                        className="select-input"
                        style={{ padding: '6px 10px', fontSize: '11px' }}
                      >
                        <option value="donor">Palier Donateur</option>
                        <option value="entrepreneur">Palier Entrepreneur</option>
                        <option value="public_figure">Palier Personnalité</option>
                        <option value="organization">Palier Organisation</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
