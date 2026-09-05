import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { type SupportedCurrency } from '../types';
import { formatCurrency, convertCurrency } from '../services/api';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Eye, 
  X, 
  MessageSquare 
} from 'lucide-react';

interface MarketplaceAdminViewProps {
  currency: SupportedCurrency;
}

export const MarketplaceAdminView: React.FC<MarketplaceAdminViewProps> = ({ currency }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const products = [
    {
      id: 'prod_1',
      name: 'Kit Solaire Autonome Afri-ka Power 500W',
      description: 'Kit solaire prêt à l’emploi avec onduleur hybride pour bureaux et résidences.',
      seller: 'Benoît Mukendi',
      sellerCert: 'entrepreneur' as const,
      community: 'Tech & Innovation Panafricaine',
      subgroup: 'Intelligence Artificielle & Fintech',
      priceUSD: 450.0,
      stock: 12,
      ordersCount: 8,
      status: 'active',
      date: '2026-03-10',
      buyerInquiries: [
        { id: 'inq_1', buyer: 'Mamadou Diallo', email: 'mamadou@dakar.sn', message: 'La garantie de 2 ans couvre-t-elle le remplacement de batterie ?', status: 'responded', date: '04 Sept 2026' },
        { id: 'inq_2', buyer: 'Sarah Kante', email: 'sarah@abidjan.ci', message: 'Livraison possible sur San Pedro d’ici vendredi ?', status: 'pending', date: '05 Sept 2026' },
      ]
    },
    {
      id: 'prod_2',
      name: 'Formation DevOps & CI/CD Dokploy (En Ligne)',
      description: 'Session intensive de 3 semaines pour conteneuriser et déployer des applications DRF/Node.js.',
      seller: 'Kinshasa Tech Hub',
      sellerCert: 'organization' as const,
      community: 'Tech & Innovation Panafricaine',
      subgroup: 'Systèmes Décentralisés',
      priceUSD: 150.0,
      stock: 40,
      ordersCount: 32,
      status: 'active',
      date: '2026-03-01',
      buyerInquiries: [
        { id: 'inq_3', buyer: 'Cédric Mpolo', email: 'cedric@mpolo.cd', message: 'Les cours sont-ils enregistrés si je manque un créneau ?', status: 'responded', date: '02 Sept 2026' },
      ]
    },
  ];

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.community.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingBag size={28} color="var(--color-primary, #6DBE47)" />
          <span>Supervision Marketplace, Groupes Liés & Interventions Acheteurs</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Espace réservé à l'Agent Marketing : catalogue de produits/services, contrôle des groupes rattachés et interventions des acheteurs.
        </p>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="card-title">Catalogue des Offres & Prestations ({filtered.length})</h3>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Rechercher une offre ou groupe..."
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
                <th>Produit / Service</th>
                <th>Groupe Lié</th>
                <th>Vendeur Certifié</th>
                <th>Prix Déclaré</th>
                <th>Interventions Acheteurs</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const convertedPrice = convertCurrency(p.priceUSD, 'USD', currency);
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.description.slice(0, 48)}...</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', color: '#fff' }}>{p.community}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-primary)' }}>{p.subgroup}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#fff' }}>{p.seller}</span>
                        <CertificationBadge type={p.sellerCert} size="sm" />
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(convertedPrice, currency)}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={12} />
                        {p.buyerInquiries.length} interventions
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} /> Actif
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => setSelectedProduct(p)}
                      >
                        <Eye size={14} />
                        <span>Acheteurs & Détails</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details & Buyer Inquiries Modal */}
      {selectedProduct && (
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
              padding: '28px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
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
                <span className="badge badge-success">{selectedProduct.community}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {selectedProduct.subgroup}</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                {selectedProduct.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Vendeur : {selectedProduct.seller}</span>
                <CertificationBadge type={selectedProduct.sellerCert} size="sm" />
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {selectedProduct.description}
            </p>

            {/* Buyer Inquiries Section */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MessageSquare size={16} color="var(--color-primary)" />
                <span>Interventions & Questions des Acheteurs ({selectedProduct.buyerInquiries.length})</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProduct.buyerInquiries.map((inq: any) => (
                  <div key={inq.id} style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>{inq.buyer} ({inq.email})</div>
                      <span className={`badge ${inq.status === 'responded' ? 'badge-success' : 'badge-warning'}`}>
                        {inq.status === 'responded' ? 'Répondu' : 'En attente'}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                      "{inq.message}"
                    </p>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Date : {inq.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedProduct(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
