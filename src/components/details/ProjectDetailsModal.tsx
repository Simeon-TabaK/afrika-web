import React, { useState } from 'react';
import { X, Heart, Share2, Coins, CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { CertificationBadge } from '../CertificationBadge';

export interface ProjectDetailsModalProps {
  id: string;
  onClose: () => void;
  projectData?: {
    title?: string;
    description?: string;
    image?: string;
    goalAmount?: number;
    raisedAmount?: number;
    progress?: number;
    authorName?: string;
    authorAvatar?: string;
    authorCertification?: string;
    likesCount?: number;
    viewsCount?: number;
    donorsCount?: number;
  };
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  onClose,
  projectData,
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(projectData?.likesCount || 348);
  const [raised, setRaised] = useState(projectData?.raisedAmount || 17000);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState('50');

  const goal = projectData?.goalAmount || 25000;
  const progressPercent = Math.min(100, Math.round((raised / goal) * 100));

  const title = projectData?.title || 'Électrification Solaire & Tech Hub Kivu';
  const description = projectData?.description || 'Ce projet vise à équiper un centre technologique et d\'innovation de 1 200 m² à Goma en panneaux solaires photovoltaïques et batteries lithium de haute capacité. Il permettra d\'assurer une alimentation électrique 100% propre et ininterrompue pour former 500 jeunes développeurs, incuber 20 startups locales et fournir un accès internet satellitaire haut débit gratuit.';
  const image = projectData?.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800';
  const authorName = projectData?.authorName || 'Benoît Mukendi';
  const authorAvatar = projectData?.authorAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200';
  const authorCert = (projectData?.authorCertification || 'entrepreneur') as any;

  const milestones = [
    { title: 'Jalon 1 : Étude de faisabilité & Acquisition des panneaux', amount: '8 500 $', completed: true },
    { title: 'Jalon 2 : Installation des onduleurs & stockage batterie', amount: '10 000 $', completed: raised >= 18500 },
    { title: 'Jalon 3 : Aménagement des postes de travail & Réseau LAN', amount: '6 500 $', completed: raised >= 25000 },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(donationAmount);
    if (!isNaN(val) && val > 0) {
      setRaised(prev => prev + val);
      setShowDonateForm(false);
      alert(`Merci pour votre généreuse contribution de ${val} $ à ce projet !`);
    }
  };

  return (
    <div
      className="details-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        className="details-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.55)',
            border: 'none',
            color: '#FFFFFF',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Fermer"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            }}
          />
          {/* Titre et type */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#6B9E41',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <Coins size={12} />
              <span>Projet Crowdfunding</span>
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
              {title}
            </h1>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Financial Progress Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Fonds Collectés
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#6B9E41' }}>
                    {raised.toLocaleString()} $
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>
                    / {goal.toLocaleString()} $
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
                  {progressPercent}%
                </span>
                <div style={{ fontSize: '12px', color: '#64748B' }}>financé</div>
              </div>
            </div>

            {/* Barre de progression */}
            <div
              style={{
                width: '100%',
                height: '10px',
                borderRadius: '6px',
                background: '#CBD5E1',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: '6px',
                  background: 'linear-gradient(90deg, #6B9E41, #8ED059)',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>

            {/* Statistiques Rapides */}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '13px', color: '#475569' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={15} color="#6B9E41" />
                <strong>128 donateurs</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={15} color="#6B9E41" />
                <strong>Jalon 1 Validé</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} color="#6B9E41" />
                <strong>Fonds Sécurisés</strong>
              </span>
            </div>
          </div>

          {/* Action Row : Donate & Like */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setShowDonateForm(!showDonateForm)}
              style={{
                flex: 1,
                background: '#6B9E41',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(107, 158, 65, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <Coins size={18} />
              <span>Soutenir ce Projet (Faire un Don)</span>
            </button>

            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                setLikesCount(prev => prev + (hasLiked ? -1 : 1));
              }}
              style={{
                background: hasLiked ? 'rgba(239, 68, 68, 0.12)' : '#F1F5F9',
                border: 'none',
                color: hasLiked ? '#EF4444' : '#475569',
                padding: '14px 18px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Heart size={18} fill={hasLiked ? '#EF4444' : 'none'} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => alert('Lien du projet copié !')}
              style={{
                background: '#F1F5F9',
                border: 'none',
                color: '#475569',
                padding: '14px 18px',
                borderRadius: '14px',
                cursor: 'pointer',
              }}
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Quick Donation Form */}
          {showDonateForm && (
            <form
              onSubmit={handleDonate}
              style={{
                background: '#F8FAFC',
                border: '1px solid #6B9E41',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Choisir le montant de votre don
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['20', '50', '100', '250'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDonationAmount(val)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: donationAmount === val ? '2px solid #6B9E41' : '1px solid #CBD5E1',
                      background: donationAmount === val ? 'rgba(107, 158, 65, 0.12)' : '#FFFFFF',
                      color: donationAmount === val ? '#6B9E41' : '#0F172A',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {val} $
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Autre montant..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#6B9E41',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 20px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Confirmer le Don
                </button>
              </div>
            </form>
          )}

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              À propos de cette initiative
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              {description}
            </p>
          </div>

          {/* Jalons de financement */}
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              Jalons de Financement & Transparence
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: m.completed ? 'rgba(107, 158, 65, 0.10)' : '#F8FAFC',
                    border: m.completed ? '1px solid rgba(107, 158, 65, 0.3)' : '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color={m.completed ? '#6B9E41' : '#94A3B8'} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: m.completed ? '#2E7D32' : '#334155' }}>
                      {m.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    {m.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Porteur de Projet */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '16px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={authorAvatar}
                alt={authorName}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Porteur de projet</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{authorName}</span>
                  <CertificationBadge type={authorCert} size="sm" />
                </div>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B9E41', background: 'rgba(107, 158, 65, 0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              Vérifié Afri'Ka
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
