import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Send,
  Eye,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { CertificationBadge } from '../components/CertificationBadge';

export interface PostDetailsViewProps {
  id: string;
  onBack: () => void;
  postData?: {
    title?: string;
    content?: string;
    image?: string;
    likesCount?: number;
    viewsCount?: number;
    commentsCount?: number;
    sharesCount?: number;
    authorName?: string;
    authorAvatar?: string;
    authorCertification?: string;
    hasLiked?: boolean;
    createdAt?: string;
  };
}

export const PostDetailsView: React.FC<PostDetailsViewProps> = ({
  id: _id,
  onBack,
  postData,
}) => {
  const { t } = useTranslation();
  const [hasLiked, setHasLiked] = useState(postData?.hasLiked || false);
  const [likesCount, setLikesCount] = useState(postData?.likesCount || 142);
  const [comments, setComments] = useState([
    { id: '1', author: 'Amina Diallo', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', text: 'Excellente initiative ! Comment pouvons-nous y contribuer sur le terrain ?', time: 'Il y a 2h' },
    { id: '2', author: 'Kofi Mensah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', text: 'C\'est exactement le genre de solution dont la région a besoin. Félicitations à toute l\'équipe.', time: 'Il y a 4h' },
  ]);
  const [newComment, setNewComment] = useState('');

  const title = postData?.title || 'Lancement de notre nouveau programme d\'autonomie agropastorale';
  const content = postData?.content ||
    'Nous sommes fiers de vous annoncer le déploiement de 12 nouvelles serres connectées au Nord-Kivu. Grâce aux capteurs IoT à énergie solaire développés localement par notre communauté d\'ingénieurs, les coopératives agricoles partenaires augmentent leurs rendements maraîchers de 40% tout en préservant 60% d\'eau d\'irrigation.\n\nRejoignez le mouvement pour l\'indépendance alimentaire durable !';
  const image = postData?.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200';
  const authorName = postData?.authorName || 'Coopérative AgriTech';
  const authorAvatar = postData?.authorAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200';
  const authorCert = (postData?.authorCertification || 'organization') as any;

  const handleToggleLike = () => {
    const next = !hasLiked;
    setHasLiked(next);
    setLikesCount(prev => prev + (next ? 1 : -1));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments(prev => [
        ...prev,
        {
          id: String(Date.now()),
          author: 'Vous',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          text: newComment.trim(),
          time: 'À l\'instant',
        },
      ]);
      setNewComment('');
    }
  };

  return (
    <div
      className="post-details-page"
      style={{
        width: '100%',
        maxWidth: '860px',
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
              alert("Lien de la publication copié !");
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

      {/* Main Post Card Container */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '26px',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18)',
          color: '#0F172A',
        }}
      >
        {/* Post Author Header */}
        <div style={{ padding: '24px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={authorAvatar}
              alt={authorName}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #6B9E41',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{authorName}</span>
                <CertificationBadge type={authorCert} size="sm" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '12px', marginTop: '2px' }}>
                <Calendar size={13} />
                <span>Publié aujourd'hui • Public</span>
              </div>
            </div>
          </div>

          <span
            style={{
              padding: '5px 12px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              background: 'rgba(107, 158, 65, 0.12)',
              color: '#6B9E41',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={12} />
            <span>Nouveauté</span>
          </span>
        </div>

        {/* Post Content */}
        <div style={{ padding: '20px 28px' }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#0F172A',
              margin: '0 0 14px 0',
              lineHeight: 1.35,
            }}
          >
            {title}
          </h1>

          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-line', margin: '0 0 20px 0' }}>
            {content}
          </p>
        </div>

        {/* Media Banner */}
        {image && (
          <div style={{ width: '100%', maxHeight: '420px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
            <img
              src={image}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Interaction Actions Bar */}
        <div
          style={{
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F1F5F9',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={handleToggleLike}
              style={{
                background: hasLiked ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                border: 'none',
                color: hasLiked ? '#EF4444' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={18} fill={hasLiked ? '#EF4444' : 'none'} color={hasLiked ? '#EF4444' : '#64748B'} />
              <span>{likesCount} J'aime</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
              <MessageCircle size={18} />
              <span>{comments.length} Commentaires</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
              <Eye size={18} />
              <span>{postData?.viewsCount || 380} Vues</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div style={{ padding: '24px 28px', background: '#F8FAFC' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
            Commentaires ({comments.length})
          </h3>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Écrivez un commentaire constructif..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#6B9E41',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Send size={16} />
              <span>Publier</span>
            </button>
          </form>

          {/* Comments List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {comments.map((cmt) => (
              <div
                key={cmt.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={cmt.avatar}
                      alt={cmt.author}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{cmt.author}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{cmt.time}</span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.5, paddingLeft: '36px' }}>
                  {cmt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
