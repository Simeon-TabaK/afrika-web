import type { SupportedCurrency, CertificationType } from '../types';
import { formatCurrency, convertCurrency, MOCK_TRANSACTIONS, MOCK_KYC_REQUESTS } from '../services/api';
import { CertificationBadge } from '../components/CertificationBadge';
import { 
  TrendingUp, 
  BadgeCheck, 
  HeartHandshake, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface OverviewDashboardProps {
  currency: SupportedCurrency;
}

export const OverviewDashboard = ({ currency }: OverviewDashboardProps) => {
  // Aggregate calculations
  const totalRaisedUSD = MOCK_TRANSACTIONS
    .filter(t => t.status === 'succeeded')
    .reduce((sum, t) => sum + t.amount_base, 0);

  const displayRaised = convertCurrency(totalRaisedUSD, 'USD', currency);
  const pendingKYC = MOCK_KYC_REQUESTS.filter(r => r.status === 'submitted' || r.status === 'under_review').length;
  const approvedKYC = MOCK_KYC_REQUESTS.filter(r => r.status === 'approved').length;

  const donorBadges: Record<string, CertificationType> = {
    'tx_01': 'donor',
    'tx_02': 'entrepreneur',
    'tx_03': 'organization',
    'tx_04': 'public_figure',
    'tx_05': 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(107, 158, 65, 0.25) 0%, rgba(240, 186, 49, 0.15) 100%)',
        border: '1px solid rgba(107, 158, 65, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div>
          <span style={{ 
            color: 'var(--color-accent)', 
            fontWeight: 700, 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px' 
          }}>
            Plateforme Afri-ka • Console Centrale
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '6px', color: '#fff' }}>
            Tableau de Bord Exécutif & Opérationnel
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '600px' }}>
            Surveillance en temps réel des transactions multi-devises, vérifications KYC des membres et services sous infrastructure Dokploy.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="badge badge-success" style={{ padding: '8px 14px', fontSize: '13px' }}>
            <ShieldCheck size={16} />
            <span>Systèmes Opérationnels (99.98%)</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Volume Total Collecté</span>
            <div className="metric-icon" style={{ background: 'rgba(107, 158, 65, 0.15)', color: '#6B9E41' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="metric-value">{formatCurrency(displayRaised, currency)}</div>
          <div className="metric-subtitle">
            Équivalent {formatCurrency(totalRaisedUSD, 'USD')} de base (USD consolidé)
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Dons & Cotisations</span>
            <div className="metric-icon" style={{ background: 'rgba(240, 186, 49, 0.15)', color: '#F0BA31' }}>
              <HeartHandshake size={20} />
            </div>
          </div>
          <div className="metric-value">{MOCK_TRANSACTIONS.length}</div>
          <div className="metric-subtitle" style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} />
            <span>+14.2% ce mois-ci</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Membres Certifiés</span>
            <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
              <BadgeCheck size={20} />
            </div>
          </div>
          <div className="metric-value">{approvedKYC + 24}</div>
          <div className="metric-subtitle">
            Badge de confiance actif sur le profil
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Dossiers KYC en Attente</span>
            <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-accent)' }}>{pendingKYC}</div>
          <div className="metric-subtitle">
            Nécessite revue d’un administrateur
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <HeartHandshake size={20} color="#6B9E41" />
            <span>Dernières Transactions Multi-Devises</span>
          </h3>
          <span className="badge badge-success">Live Engine</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Donateur / Demandeur</th>
                <th>Objet</th>
                <th>Montant Encaissé</th>
                <th>Équivalent ({currency})</th>
                <th>Passerelle</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => {
                const converted = convertCurrency(tx.amount_base, 'USD', currency);
                return (
                  <tr key={tx.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{tx.reference}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600 }}>{tx.donor_name}</span>
                        <CertificationBadge type={donorBadges[tx.id] || 'none'} size="sm" />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.donor_email}</div>
                    </td>
                    <td>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: tx.purpose === 'certification' ? 'rgba(240, 186, 49, 0.15)' : 'rgba(107, 158, 65, 0.15)',
                        color: tx.purpose === 'certification' ? 'var(--color-accent)' : 'var(--color-primary)'
                      }}>
                        {tx.purpose === 'certification' ? 'KYC Certif' : 'Don Communautaire'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>
                      {formatCurrency(tx.amount_charged, tx.currency_charged)}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                      {formatCurrency(converted, currency)}
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize' }}>
                        {tx.payment_method.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      {tx.status === 'succeeded' ? (
                        <span className="badge badge-success">
                          <CheckCircle2 size={12} /> Succès
                        </span>
                      ) : (
                        <span className="badge badge-warning">
                          <Clock size={12} /> En attente
                        </span>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{tx.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
