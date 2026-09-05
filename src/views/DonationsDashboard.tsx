import { useState } from 'react';
import type { SupportedCurrency } from '../types';
import { 
  formatCurrency, 
  convertCurrency, 
  MOCK_TRANSACTIONS, 
  DEFAULT_RATES
} from '../services/api';
import { 
  Coins, 
  CreditCard, 
  Smartphone, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  RefreshCw
} from 'lucide-react';

interface DonationsDashboardProps {
  currency: SupportedCurrency;
}

export const DonationsDashboard = ({ currency }: DonationsDashboardProps) => {
  const [selectedGateway, setSelectedGateway] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Compute master totals
  const totalBaseUSD = MOCK_TRANSACTIONS
    .filter(t => t.status === 'succeeded')
    .reduce((sum, t) => sum + t.amount_base, 0);

  const totalBaseEUR = convertCurrency(totalBaseUSD, 'USD', 'EUR');

  // Breakdown by local currencies
  const localBreakdown = [
    { currency: 'CDF' as SupportedCurrency, country: 'RD Congo', rate: DEFAULT_RATES.CDF },
    { currency: 'XAF' as SupportedCurrency, country: 'CEMAC (Cameroun, Gabon...)', rate: DEFAULT_RATES.XAF },
    { currency: 'XOF' as SupportedCurrency, country: 'UEMOA (Sénégal, CI...)', rate: DEFAULT_RATES.XOF },
    { currency: 'RWF' as SupportedCurrency, country: 'Rwanda', rate: DEFAULT_RATES.RWF },
    { currency: 'KES' as SupportedCurrency, country: 'Kenya', rate: DEFAULT_RATES.KES },
    { currency: 'NGN' as SupportedCurrency, country: 'Nigéria', rate: DEFAULT_RATES.NGN },
  ];

  // Filter transactions
  const filtered = MOCK_TRANSACTIONS.filter((t) => {
    if (selectedGateway !== 'all' && t.payment_method !== selectedGateway) return false;
    if (selectedPurpose !== 'all' && t.purpose !== selectedPurpose) return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleExportCSV = () => {
    const headers = ['ID,Reference,Donor,Purpose,AmountCharged,Currency,BaseUSD,Gateway,Status,Date\n'];
    const rows = filtered.map(t => 
      `${t.id},${t.reference},"${t.donor_name}",${t.purpose},${t.amount_charged},${t.currency_charged},${t.amount_base},${t.payment_method},${t.status},"${t.created_at}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afrika-transactions-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header with Title and Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Coins size={28} color="#6B9E41" />
            <span>Gestion Financière & Trésorerie Multi-Devises</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Consolidation fiduciaire globale (USD / EUR) et encaissement en devises africaines locales.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handleRefresh}>
            <RefreshCw size={14} className={isRefreshing ? 'spin' : ''} />
            <span>Actualiser Taux</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportCSV}>
            <Download size={14} />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Master Consolidated Balances (USD & EUR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {/* USD Master Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1E1E 0%, #252e20 100%)',
          border: '1px solid rgba(107, 158, 65, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Base Consolidée Principale
            </span>
            <span className="badge badge-success">Pivot Master</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', marginTop: '12px' }}>
            {formatCurrency(totalBaseUSD, 'USD')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Total agrégé net de toutes les passerelles internationales et locales
          </div>
        </div>

        {/* EUR Master Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1E1E 0%, #2e2a1e 100%)',
          border: '1px solid rgba(240, 186, 49, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
              Équivalence Européenne
            </span>
            <span className="badge badge-warning">Taux Fixe / Live</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', marginTop: '12px' }}>
            {formatCurrency(totalBaseEUR, 'EUR')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            1 USD ≈ {DEFAULT_RATES.EUR} EUR (Taux calculé en temps réel)
          </div>
        </div>

        {/* Selected Currency Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1E1E 0%, #202b33 100%)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase' }}>
              Affichage Actif ({currency})
            </span>
            <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Devise Sélecteur
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', marginTop: '12px' }}>
            {formatCurrency(convertCurrency(totalBaseUSD, 'USD', currency), currency)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Calculé au cours dynamique sélectionné
          </div>
        </div>
      </div>

      {/* Local Currencies Breakdown Grid */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <span>Équivalence en Devises Régionales Africaines</span>
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Calcul automatique à partir de la trésorerie totale ({formatCurrency(totalBaseUSD, 'USD')})
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {localBreakdown.map((item) => {
            const localAmount = convertCurrency(totalBaseUSD, 'USD', item.currency);
            return (
              <div 
                key={item.currency}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-accent)' }}>
                    {item.currency}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    1$ = {item.rate}
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                  {formatCurrency(localAmount, item.currency)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.country}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gateway Distribution & Filters */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '14px' }}>
          <h3 className="card-title">
            <Filter size={18} color="#6B9E41" />
            <span>Historique des Paiements & Filtres Avancés</span>
          </h3>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Gateway Filter */}
            <select
              className="select-input"
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
            >
              <option value="all">Toutes Passerelles</option>
              <option value="stripe">Stripe (Cartes Visa/Mastercard)</option>
              <option value="paypal">PayPal (International)</option>
              <option value="mobile_money">PawaPay (Mobile Money Afrique)</option>
            </select>

            {/* Purpose Filter */}
            <select
              className="select-input"
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
            >
              <option value="all">Tous Objets</option>
              <option value="donation">Dons Réguliers</option>
              <option value="certification">Frais de Certification (KYC)</option>
            </select>
          </div>
        </div>

        {/* Filtered Transactions Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Donateur / Client</th>
                <th>Projet & Jalon Liés</th>
                <th>Groupe & Post</th>
                <th>Montant Débité</th>
                <th>Canal & Opérateur</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 700, color: '#fff' }}>{tx.reference}</td>
                  <td>
                    <div>{tx.donor_name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.donor_email}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '12px' }}>
                      {tx.purpose === 'certification' ? 'Frais Certification KYC' : 'Électrification Solaire Tech Hub'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-primary)' }}>
                      {tx.purpose === 'certification' ? 'Vérification Officielle' : 'Jalon : Acquisition Panneaux'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {tx.purpose === 'certification' ? 'Administration' : 'Intelligence Artificielle & Fintech'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Post : {tx.purpose === 'certification' ? 'Dossier vérifié' : 'Lancement du hub de Goma'}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800, color: '#fff' }}>
                    {formatCurrency(tx.amount_charged, tx.currency_charged)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {tx.payment_method === 'stripe' && <CreditCard size={14} color="#6B9E41" />}
                      {tx.payment_method === 'paypal' && <Coins size={14} color="#3B82F6" />}
                      {tx.payment_method === 'mobile_money' && <Smartphone size={14} color="#F0BA31" />}
                      <span style={{ textTransform: 'capitalize' }}>
                        {tx.payment_provider.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </td>
                  <td>
                    {tx.status === 'succeeded' ? (
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> Confirmé
                      </span>
                    ) : (
                      <span className="badge badge-warning">
                        <Clock size={12} /> En traitement
                      </span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{tx.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
