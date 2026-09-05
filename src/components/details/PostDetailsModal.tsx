import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Send, Calendar } from 'lucide-react';
import { CertificationBadge } from '../CertificationBadge';

export interface PostDetailsModalProps {
  id: string;
  onClose: () => void;
  postData?: {
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    authorName?: string;
    authorAvatar?: string;
    authorCertification?: string;
    likesCount?: number;
    viewsCount?: number;
    createdAt?: string;
    hasLiked?: boolean;
  };
}

export const PostDetailsModal: React.FC<PostDetailsModalProps> = ({
  onClose,
  postData,
}) => {
  const [hasLiked, setHasLiked] = useState<boolean>(postData?.hasLiked || false);
  const [likesCount, setLikesCount] = useState<number>(postData?.likesCount || 142);
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Benoît Mukendi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      text: 'Excellente initiative ! Tout notre soutien pour ce déploiement panafricain.',
      time: 'Il y a 2h',
    },
    {
      id: 'c2',
      author: 'Awa Diop',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      text: 'Bravo à toute l’équipe pour l’impact concret sur le terrain.',
      time: 'Il y a 30m',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    setHasLiked(prev => !prev);
    setLikesCount(prev => prev + (hasLiked ? -1 : 1));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        author: 'Vous',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        text: newComment.trim(),
        time: 'À l’instant',
      },
    ]);
    setNewComment('');
  };

  const title = postData?.title || 'Publication Afri\'Ka';
  const subtitle = postData?.subtitle || '';
  const content = postData?.content || subtitle || 'Cette publication met en avant les initiatives et projets communautaires en plein essor à travers le continent africain. Découvrez les avancées, soutenez les porteurs de projets et participez aux échanges constructifs pour transformer nos territoires.';
  const image = postData?.image || 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800';
  const authorName = postData?.authorName || 'Fatou Sow';
  const authorAvatar = postData?.authorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200';
  const authorCert = (postData?.authorCertification || 'organization') as any;

  return (
    <div
      className="details-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '750px',
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
            transition: 'background 0.2s ease',
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
          {/* Titre sur l'image */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span
              style={{
                display: 'inline-block',
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
              Publication
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
              {title}
            </h1>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Author Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={authorAvatar}
                alt={authorName}
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                    {authorName}
                  </span>
                  <CertificationBadge type={authorCert} size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                  <Calendar size={13} />
                  <span>Publié récemment</span>
                </div>
              </div>
            </div>

            {/* Like & Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={toggleLike}
                style={{
                  background: hasLiked ? 'rgba(239, 68, 68, 0.12)' : '#F1F5F9',
                  border: 'none',
                  color: hasLiked ? '#EF4444' : '#475569',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Heart size={18} fill={hasLiked ? '#EF4444' : 'none'} />
                <span>{likesCount} J'aime</span>
              </button>

              <button
                onClick={() => alert('Lien copié dans le presse-papier !')}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  color: '#475569',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Share2 size={16} />
                <span>Partager</span>
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155' }}>
            <p style={{ margin: 0 }}>{content}</p>
          </div>

          {/* Comments Section */}
          <div style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageCircle size={18} color="#6B9E41" />
              <span>Commentaires ({comments.length})</span>
            </h3>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {comments.map(c => (
                <div
                  key={c.id}
                  style={{
                    background: '#F8FAFC',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={c.avatar} alt={c.author} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{c.author}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{c.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire constructif..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  color: '#0F172A',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#6B9E41',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 20px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Envoyer</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
