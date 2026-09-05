import { useState } from 'react';
import type { KYCRequest } from '../types';
import { MOCK_KYC_REQUESTS, formatCurrency } from '../services/api';
import { CertificationBadge } from '../components/CertificationBadge';
import { 
  BadgeCheck, 
  Check, 
  X, 
  Eye, 
  Clock, 
  FileText,
} from 'lucide-react';

export const KYCAdminView = () => {
  const [requests, setRequests] = useState<KYCRequest[]>([
    {
      ...MOCK_KYC_REQUESTS[0],
      certification_type: 'public_figure',
      user_name: 'Samuel Eto’o Media',
    },
    {
      ...MOCK_KYC_REQUESTS[1],
      certification_type: 'entrepreneur',
      user_name: 'Kinshasa Tech Hub',
    },
    {
      ...MOCK_KYC_REQUESTS[2],
      certification_type: 'organization',
      user_name: 'Fondation Awa Diop',
    },
  ]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved', updated_at: 'À l’instant' } : req
    ));
  };

  const handleReject = (id: string) => {
    const reason = prompt('Motif du rejet du dossier KYC :') || 'Document non conforme ou illisible';
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected', rejection_reason: reason, updated_at: 'À l’instant' } : req
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BadgeCheck size={28} color="#6DBE47" />
          <span>Gestion des Demandes de Certification (KYC)</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Validation des pièces d’identité, contrôle du règlement des frais et attribution du badge certifié par niveau (Donateur ★, Entrepreneur ★, Personnalité Publique ★, Organisation/ONG ★).
        </p>
      </div>

      {/* Requests Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <span>Dossiers Soumis & Pièces Jointes</span>
          </h3>
          <span className="badge badge-warning">
            {requests.filter(r => r.status === 'submitted' || r.status === 'under_review').length} En attente d’arbitrage
          </span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID Demande</th>
                <th>Membre Demandeur</th>
                <th>Niveau Sollicité</th>
                <th>Type de Pièce</th>
                <th>Justificatif</th>
                <th>Frais Réglés</th>
                <th>Statut</th>
                <th>Dernière MAJ</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{req.id}</td>
                  <td>
                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                      {req.user_name}
                      {req.status === 'approved' && (
                        <CertificationBadge type={req.certification_type} size="sm" />
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{req.user_email}</div>
                  </td>
                  <td>
                    <CertificationBadge type={req.certification_type} showLabel size="md" />
                  </td>
                  <td>
                    <span style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} color="#6DBE47" />
                      {req.id_document_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => setSelectedDoc(req.document_url)}
                    >
                      <Eye size={12} />
                      <span>Inspecter</span>
                    </button>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    {formatCurrency(req.fee_amount, req.fee_currency)}
                  </td>
                  <td>
                    {req.status === 'approved' && (
                      <span className="badge badge-certified">
                        <Check size={12} /> Approuvé
                      </span>
                    )}
                    {(req.status === 'submitted' || req.status === 'under_review') && (
                      <span className="badge badge-warning">
                        <Clock size={12} /> À Réviser
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="badge badge-danger">
                        <X size={12} /> Rejeté
                      </span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{req.updated_at}</td>
                  <td style={{ textAlign: 'right' }}>
                    {req.status !== 'approved' && req.status !== 'rejected' ? (
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px' }} 
                          onClick={() => handleApprove(req.id)}
                          title="Valider et accorder le badge"
                        >
                          <Check size={14} />
                          <span>Approuver</span>
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '6px 12px' }} 
                          onClick={() => handleReject(req.id)}
                          title="Refuser la demande"
                        >
                          <X size={14} />
                          <span>Rejeter</span>
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Clôturé</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Inspector Modal Preview */}
      {selectedDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '650px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                Inspection du Document d'Identité
              </h3>
              <button 
                className="btn btn-outline" 
                style={{ padding: '6px 10px' }}
                onClick={() => setSelectedDoc(null)}
              >
                <X size={14} />
              </button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <img 
                src={selectedDoc} 
                alt="Document KYC" 
                style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: 'var(--radius-md)', objectFit: 'contain' }} 
              />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Vérifiez la concordance du nom officiel, de la date de validité et de la clarté du cliché.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
