import React, { useState } from 'react';
import { X, Users, MessageSquare, Share2, Layers, Check } from 'lucide-react';

export interface CommunityDetailsModalProps {
  id: string;
  onClose: () => void;
  communityData?: {
    name?: string;
    description?: string;
    image?: string;
    category?: string;
    membersCount?: number;
    followersCount?: number;
    visibility?: string;
  };
}

export const CommunityDetailsModal: React.FC<CommunityDetailsModalProps> = ({
  onClose,
  communityData,
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const [membersCount, setMembersCount] = useState(communityData?.membersCount || 890);

  const name = communityData?.name || 'Tech & Innovation Panafricaine';
  const description = communityData?.description || 'Le grand rassemblement des développeurs, concepteurs, entrepreneurs et passionnés d\'innovation en Afrique. Notre mission est d\'accélérer les synergies panafricaines, partager les opportunités de financement, organiser des hackathons et créer des projets open-source concrets.';
  const image = communityData?.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800';
  const followers = communityData?.followersCount || 1420;

  const subGroups = [
    { id: 'sg1', name: 'Intelligence Artificielle & Data', members: 420 },
    { id: 'sg2', name: 'Fintech & Systèmes de Paiement', members: 310 },
    { id: 'sg3', name: 'Développement Web & Mobile', members: 580 },
  ];

  const forums = [
    { id: 'f1', title: 'Quel stack technique pour une app mobile multi-pays ?', replies: 34, lastActive: 'Il y a 1h' },
    { id: 'f2', title: 'Partenariats de distribution en Afrique Centrale', replies: 19, lastActive: 'Il y a 3h' },
  ];

  const toggleJoin = () => {
    setIsJoined(prev => !prev);
    setMembersCount(prev => prev + (isJoined ? -1 : 1));
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

        {/* Hero Banner */}
        <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#3B82F6',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <Users size={12} />
              <span>Communauté Officielle</span>
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
              {name}
            </h1>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Action & Stats Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  {membersCount.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Membres actifs</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: '#CBD5E1' }} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  {followers.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Abonnés</div>
              </div>
            </div>

            {/* Join Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={toggleJoin}
                style={{
                  background: isJoined ? '#F1F5F9' : '#6B9E41',
                  color: isJoined ? '#2E7D32' : '#FFFFFF',
                  border: isJoined ? '1px solid #CBD5E1' : 'none',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                {isJoined ? <Check size={16} /> : <Users size={16} />}
                <span>{isJoined ? 'Membre' : 'Rejoindre la Communauté'}</span>
              </button>

              <button
                onClick={() => alert('Lien de la communauté copié !')}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  color: '#475569',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                <Share2 size={17} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Présentation
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              {description}
            </p>
          </div>

          {/* Sous-groupes */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Layers size={18} color="#6B9E41" />
              <span>Sous-groupes Thématiques</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {subGroups.map(sg => (
                <div
                  key={sg.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                    {sg.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                    {sg.members} membres
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Forums Actifs */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageSquare size={18} color="#6B9E41" />
              <span>Discussions & Forums</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {forums.map(f => (
                <div
                  key={f.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                    {f.title}
                  </span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {f.replies} réponses • {f.lastActive}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
