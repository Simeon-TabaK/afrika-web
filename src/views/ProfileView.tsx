import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { type CertificationType, CERTIFICATION_CONFIGS } from '../types';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2,
  X
} from 'lucide-react';

interface ProfileViewProps {
  onNavigateToKYC: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigateToKYC }) => {
  // Mock current user profile state (can be toggled for demo)
  const [currentUserCert, setCurrentUserCert] = useState<CertificationType>('entrepreneur');
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  const isCertified = currentUserCert !== 'none';
  const certConfig = CERTIFICATION_CONFIGS[currentUserCert];

  const handleBadgeClick = () => {
    if (isCertified) {
      setShowCertModal(true);
    } else {
      onNavigateToKYC();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '750px', margin: '0 auto' }}>
      {/* Profile Header Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Cover banner */}
        <div
          style={{
            height: '140px',
            background: 'linear-gradient(135deg, rgba(109, 190, 71, 0.4) 0%, rgba(240, 186, 49, 0.25) 100%)',
            borderBottom: '1px solid var(--border-color)',
          }}
        />

        {/* Profile Info Row */}
        <div style={{ padding: '0 28px 24px', marginTop: '-50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
                alt="Amina Kone"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid var(--bg-surface, #181818)',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={() => setCurrentUserCert(prev => prev === 'none' ? 'entrepreneur' : 'none')}
                style={{ fontSize: '12px', padding: '6px 12px' }}
                title="Bascule de test pour simuler un compte certifié vs non-certifié"
              >
                Simuler statut ({isCertified ? 'Certifié' : 'Non certifié'})
              </button>
              <button
                className="btn btn-primary"
                onClick={handleBadgeClick}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                <Award size={16} />
                <span>{isCertified ? 'Mon Badge Certifié' : 'Devenir Certifié'}</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>
                Amina Koné
              </h1>
              {/* Certification Badge clickable */}
              <div onClick={handleBadgeClick} style={{ cursor: 'pointer' }} title="Cliquez pour afficher les détails de certification">
                <CertificationBadge type={currentUserCert} size="md" />
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Fondatrice AgriTech & Membre active de la communauté Afri-ka
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--color-primary, #6DBE47)" />
                Abidjan, Côte d'Ivoire
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="var(--color-primary, #6DBE47)" />
                amina.kone@afrika.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--color-primary, #6DBE47)" />
                Membre depuis Janvier 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Status Box */}
      <div
        className="card"
        style={{
          border: `1.5px solid ${certConfig.color}40`,
          background: isCertified ? `${certConfig.color}0D` : 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <CertificationBadge type={currentUserCert} size="lg" />
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: certConfig.color }}>
              Statut : {certConfig.label} ({certConfig.symbol})
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {isCertified
                ? `Votre compte bénéficie de la certification officielle (${certConfig.colorName}).`
                : 'Obtenez votre étoile de confiance certifiée pour débloquer toutes les fonctionnalités.'}
            </div>
          </div>
        </div>

        <button
          onClick={handleBadgeClick}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '12px', borderColor: certConfig.color, color: certConfig.color }}
        >
          {isCertified ? 'Voir les Avantages' : 'Faire la Demande'}
        </button>
      </div>

      {/* Already Certified Details Modal */}
      {showCertModal && (
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
            style={{
              background: 'var(--bg-surface, #181818)',
              border: `2px solid ${certConfig.color}`,
              borderRadius: 'var(--radius-lg)',
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <button
              onClick={() => setShowCertModal(false)}
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

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: `${certConfig.color}20`,
                  border: `2px solid ${certConfig.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: certConfig.color,
                  fontSize: '28px',
                  fontWeight: 800,
                }}
              >
                {certConfig.symbol}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>
                Vous êtes Déjà Certifié !
              </h2>
              <div style={{ fontSize: '13px', fontWeight: 600, color: certConfig.color, marginTop: '4px' }}>
                Badge : {certConfig.label} ({certConfig.colorName})
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span>Identité officielle vérifiée et auditée.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span>Droit de publication d'offres et d'initiatives sur la Marketplace.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span>Indice de confiance prioritaire auprès des donateurs.</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertModal(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
