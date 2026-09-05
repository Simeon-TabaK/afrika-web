import { useState } from 'react';
import type { SupportedCurrency, CertificationType } from '../types';
import { CERTIFICATION_CONFIGS } from '../types';
import { convertCurrency, formatCurrency } from '../services/api';
import { CertificationBadge } from '../components/CertificationBadge';
import { 
  UploadCloud, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface KYCClientViewProps {
  currency: SupportedCurrency;
}

export const KYCClientView = ({ currency }: KYCClientViewProps) => {
  const [certType, setCertType] = useState<CertificationType>('entrepreneur');
  const [docType, setDocType] = useState<'passport' | 'national_id' | 'driver_license' | 'business_license'>('passport');
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'paypal' | 'mobile_money'>('mobile_money');
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // 10 USD fixed certification fee converted dynamically
  const feeUSD = 10.0;
  const feeLocal = convertCurrency(feeUSD, 'USD', currency);

  const availableTiers: CertificationType[] = ['donor', 'entrepreneur', 'public_figure', 'organization'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '850px', margin: '0 auto' }}>
      {/* Title & Trust Banner */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(109, 190, 71, 0.15)', 
          color: 'var(--color-primary)', 
          padding: '6px 14px', 
          borderRadius: 'var(--radius-full)', 
          fontSize: '12px', 
          fontWeight: 700, 
          marginBottom: '12px' 
        }}>
          <Sparkles size={16} />
          <span>Certification Officielle Afri-ka</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff' }}>
          Demande de Certification de Profil
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '600px', margin: '6px auto 0' }}>
          Obtenez votre étoile de confiance certifiée, débloquez des fonctionnalités exclusives et renforcez votre crédibilité auprès de la communauté.
        </p>
      </div>

      {isSubmitted ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--status-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
            Demande & Paiement Transmis avec Succès !
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '10px', maxWidth: '500px', margin: '10px auto 24px' }}>
            Votre dossier est désormais en cours d'examen par notre équipe de modération. Vous recevrez une notification push dès que votre badge sera activé.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface-elevated)', border: `1.5px solid ${CERTIFICATION_CONFIGS[certType].color}` }}>
            <CertificationBadge type={certType} showLabel size="lg" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Step 1: Certification Tier Selection */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span>1. Choisissez votre Type de Certification</span>
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {availableTiers.map((tier) => {
                const conf = CERTIFICATION_CONFIGS[tier];
                const isSelected = certType === tier;
                return (
                  <div
                    key={tier}
                    onClick={() => setCertType(tier)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? conf.color : 'var(--border-color)'}`,
                      background: isSelected ? `${conf.color}15` : 'var(--bg-surface-elevated)',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: conf.color }}>
                        {conf.label}
                      </span>
                      <CertificationBadge type={tier} size="md" />
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {conf.description}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: conf.color, marginTop: 'auto' }}>
                      {conf.colorName} ({conf.symbol})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Document Selection & Upload */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span>2. Pièce Justificative Requise</span>
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Sélectionnez le type de document
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                  {[
                    { id: 'passport', label: 'Passeport' },
                    { id: 'national_id', label: 'Carte Nationale (CNI)' },
                    { id: 'driver_license', label: 'Permis de Conduire' },
                    { id: 'business_license', label: 'Statuts / RCCM / ONG' },
                  ].map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setDocType(doc.id as any)}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${docType === doc.id ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        background: docType === doc.id ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                        color: docType === doc.id ? '#fff' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'var(--transition)'
                      }}
                    >
                      {doc.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => setFileUploaded(true)}
                style={{
                  border: `2px dashed ${fileUploaded ? 'var(--color-primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                  textAlign: 'center',
                  background: fileUploaded ? 'rgba(107, 158, 65, 0.05)' : 'var(--bg-surface-elevated)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <UploadCloud size={32} color={fileUploaded ? '#6B9E41' : '#888'} style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                  {fileUploaded ? 'piece_justificative_recto_verso.jpg sélectionnée' : 'Cliquez pour téléverser votre document'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Formats acceptés : PDF, PNG, JPEG (Max 10 Mo)
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Multi-Currency Payment Box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span>2. Règlement des Frais de Vérification</span>
              </h3>
              <div className="badge badge-warning">
                Frais Unique : {formatCurrency(10, 'USD')}
              </div>
            </div>

            {/* Dynamic Local Conversion Highlight */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(107, 158, 65, 0.2), rgba(240, 186, 49, 0.1))',
              border: '1px solid rgba(107, 158, 65, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Montant calculé au cours du jour ({currency})
                </span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                  {formatCurrency(feeLocal, currency)}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                Pas de frais cachés.<br />Taux garanti 15 minutes.
              </div>
            </div>

            {/* Payment Gateway Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div
                onClick={() => setPaymentGateway('mobile_money')}
                style={{
                  border: `1px solid ${paymentGateway === 'mobile_money' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                  background: paymentGateway === 'mobile_money' ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Smartphone size={22} color="#F0BA31" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Mobile Money</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>M-Pesa, Orange, Wave, MTN</div>
                </div>
              </div>

              <div
                onClick={() => setPaymentGateway('stripe')}
                style={{
                  border: `1px solid ${paymentGateway === 'stripe' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                  background: paymentGateway === 'stripe' ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <CreditCard size={22} color="#6B9E41" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Carte Bancaire</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Visa, Mastercard via Stripe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px' }}
            >
              <Lock size={16} />
              <span>Régler {formatCurrency(feeLocal, currency)} & Soumettre</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
