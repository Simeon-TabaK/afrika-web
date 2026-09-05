import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Users,
  MessageSquare,
  ShieldCheck,
  Share2,
  Check,
  Plus,
} from 'lucide-react';

export interface CommunityDetailsViewProps {
  id: string;
  onBack: () => void;
  communityData?: {
    name?: string;
    description?: string;
    image?: string;
    category?: string;
    membersCount?: number;
    followersCount?: number;
    isMember?: boolean;
  };
}

export const CommunityDetailsView: React.FC<CommunityDetailsViewProps> = ({
  id: _id,
  onBack,
  communityData,
}) => {
  const { t } = useTranslation();
  const [isMember, setIsMember] = useState(communityData?.isMember || false);
  const [membersCount, setMembersCount] = useState(communityData?.membersCount || 890);

  const name = communityData?.name || 'Communauté AgriTech & Innovation Rurale';
  const category = communityData?.category || 'Agriculture & Technologie';
  const description = communityData?.description ||
    'Bienvenue dans l\'espace dédié aux innovateurs, agronomes et développeurs travaillant pour la modernisation de l\'agriculture africaine. Cet espace thématique permet de co-créer des solutions concrètes, d\'échanger des retours d\'expérience de terrain et de financer collectivement des micro-projets pilotes.';
  const image = communityData?.image || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200';

  const topics = [
    { title: 'Comment optimiser les capteurs d\'humidité en saison sèche ?', author: 'Dr. Kabila', replies: 18, time: 'Il y a 3h' },
    { title: 'Subventions & financements participatifs ouverts ce trimestre', author: 'Équipe Afri\'Ka', replies: 42, time: 'Hier' },
    { title: 'Partage de semences bio certifiées dans la région des Grands Lacs', author: 'Sarah N.', replies: 9, time: 'Il y a 2 jours' },
  ];

  const handleToggleJoin = () => {
    const next = !isMember;
    setIsMember(next);
    setMembersCount(prev => prev + (next ? 1 : -1));
  };

  return (
    <div
      className="community-details-page"
      style={{
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '0 0 60px 0',
      }}
    >
      {/* Top Back Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.22)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)')}
        >
          <ArrowLeft size={18} />
          <span>{t('back', 'Retour')}</span>
        </button>

        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
              alert("Lien de la communauté copié !");
            }
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.22)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <Share2 size={16} />
          <span>Partager</span>
        </button>
      </div>

      {/* Main Community Card Container */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '26px',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18)',
          color: '#0F172A',
        }}
      >
        {/* Cover Banner */}
        <div style={{ position: 'relative', width: '100%', height: '320px', backgroundColor: '#1E3A8A' }}>
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Users size={14} />
            <span>{category}</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '28px',
              right: '28px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                  lineHeight: 1.3,
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                {name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={15} />
                  <strong>{membersCount.toLocaleString()}</strong> membres
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  Communauté active
                </span>
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={handleToggleJoin}
              style={{
                background: isMember ? 'rgba(255, 255, 255, 0.25)' : '#6B9E41',
                border: isMember ? '2px solid #FFFFFF' : 'none',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {isMember ? <Check size={18} /> : <Plus size={18} />}
              <span>{isMember ? 'Membre Rejoint' : 'Rejoindre la Communauté'}</span>
            </button>
          </div>
        </div>

        {/* Community Body */}
        <div style={{ padding: '28px 32px' }}>
          {/* About */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              À propos de cet espace
            </h3>
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
              {description}
            </p>
          </div>

          {/* Guidelines / Rules */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '14px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <ShieldCheck size={24} color="#6B9E41" />
            <div style={{ fontSize: '13px', color: '#475569' }}>
              <strong style={{ color: '#0F172A' }}>Espace sécurisé & modéré :</strong> Seuls les membres vérifiés peuvent initier des sondages et lancer des propositions de financement.
            </div>
          </div>

          {/* Active Discussions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={20} color="#6B9E41" />
                <span>Discussions & Sujets Actifs</span>
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topics.map((t, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                      {t.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      Initié par {t.author} • {t.time}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B9E41', fontWeight: 700, fontSize: '13px' }}>
                    <MessageSquare size={16} />
                    <span>{t.replies} réponses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
