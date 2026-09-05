import React, { useState } from 'react';
import {
  ChevronLeft,
  Heart,
  MessageSquare,
  Eye,
  MapPin,
  X,
  Send,
  CheckCircle2
} from 'lucide-react';

export interface ProjectDetailsViewProps {
  id: string;
  onBack: () => void;
  projectData?: {
    title?: string;
    hashtag?: string;
    description?: string;
    image?: string;
    location?: string;
    members?: string;
    status?: string;
    likes?: string;
    comments?: string;
    views?: string;
    goalAmount?: number;
    raisedAmount?: number;
  };
}

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: string;
  hasLiked?: boolean;
  replies?: Array<{
    id: string;
    author: string;
    avatar: string;
    time: string;
    content: string;
    likes: string;
    hasLiked?: boolean;
  }>;
}

export const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({
  id: _id,
  onBack,
  projectData,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('25');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [hasLikedProject, setHasLikedProject] = useState(false);
  const [projectLikes, setProjectLikes] = useState(132);

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'comm_1',
      author: 'Ada puling',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      time: '16h',
      content: '😂😂😂😂',
      likes: '132k',
      hasLiked: true,
      replies: [
        {
          id: 'comm_1_rep_1',
          author: 'Grâce Mutima',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
          time: '17h',
          content: '@Ada puling Yeah😂',
          likes: '132k',
          hasLiked: true,
        }
      ]
    },
    {
      id: 'comm_2',
      author: 'Serge Matoyi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      time: '20h',
      content: 'Waoh 🔥',
      likes: '132k',
      hasLiked: false,
    },
  ]);

  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({
    comm_1: true,
  });

  const title = projectData?.title || 'Projet Umoja';
  const hashtag = projectData?.hashtag || '#simamaNaGoma';
  const location = projectData?.location || 'Goma, RDC';
  const members = projectData?.members || '3.4K Membres';
  const status = projectData?.status || 'Actif';
  const commentsCount = projectData?.comments || '32k';
  const viewsCount = projectData?.views || '160k';
  const image = projectData?.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200';

  const fullDescription = projectData?.description ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make...";

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComm: CommentItem = {
      id: `comm_${Date.now()}`,
      author: 'Moi-même',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      time: 'À l\'instant',
      content: commentInput.trim(),
      likes: '1',
      hasLiked: false,
    };

    setComments(prev => [...prev, newComm]);
    setCommentInput('');
  };

  const handleLikeComment = (commentId: string, isReply = false, replyId = '') => {
    setComments(prev => prev.map(c => {
      if (isReply && c.id === commentId && c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => r.id === replyId ? { ...r, hasLiked: !r.hasLiked } : r)
        };
      }
      if (c.id === commentId) {
        return { ...c, hasLiked: !c.hasLiked };
      }
      return c;
    }));
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
      setShowDonateModal(false);
    }, 2000);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', padding: '0 0 60px 0' }}>
      {/* =========================================================================
          TOP NAV BAR : CIRCLE BACK BUTTON (Mockup Screenshot 3)
          ========================================================================= */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={onBack}
          title="Retour"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronLeft size={24} strokeWidth={2.6} />
        </button>
      </div>

      {/* =========================================================================
          MAIN WHITE CARD (Mockup Screenshot 3 Layout)
          ========================================================================= */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '36px 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          color: '#0F172A',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center',
        }}
      >
        {/* =========================================================================
            LEFT COLUMN : BIG PHOTO WITH OVERLAY & DETAILS (Screenshot 3)
            ========================================================================= */}
        <div>
          {/* Photo Card with Golden Hour Kids */}
          <div
            style={{
              width: '100%',
              height: '380px',
              borderRadius: '26px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px',
            }}
          >
            {/* Dark Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
              }}
            />

            {/* Overlay Text */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 4px 0' }}>
                {title}
              </h3>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>
                {hashtag}
              </span>
            </div>
          </div>

          {/* Details below photo */}
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 4px 0' }}>
              {title}
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '13px', marginBottom: '12px' }}>
              <MapPin size={14} />
              <span>{location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B9E41' }}>
                {members} • {status}
              </span>

              {/* Metrics with Clickable Comments */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748B' }}>
                <button
                  type="button"
                  onClick={() => {
                    setHasLikedProject(prev => !prev);
                    setProjectLikes(prev => hasLikedProject ? prev - 1 : prev + 1);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    color: hasLikedProject ? '#EF4444' : '#64748B',
                    fontWeight: 600,
                  }}
                >
                  <Heart size={16} fill={hasLikedProject ? '#EF4444' : 'none'} color={hasLikedProject ? '#EF4444' : '#EF4444'} />
                  <span>{projectLikes}k</span>
                </button>

                {/* Comment Icon Button (Opens Screenshot 4 Comments BottomSheet) */}
                <button
                  type="button"
                  onClick={() => setShowCommentsModal(true)}
                  title="Voir les commentaires"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    color: '#64748B',
                    fontWeight: 600,
                  }}
                >
                  <MessageSquare size={16} />
                  <span>{commentsCount}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                  <Eye size={16} />
                  <span>{viewsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN : DESCRIPTION + SOUTENIR CE PROJET (Screenshot 3)
            ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '0 10px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '0 0 16px 0' }}>
              Description
            </h3>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#64748B',
                margin: 0,
              }}
            >
              {showFullDesc ? fullDescription : fullDescription.slice(0, 310) + '...'}
              {' '}
              <button
                type="button"
                onClick={() => setShowFullDesc(prev => !prev)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                {showFullDesc ? 'Voir moins' : 'Voir plus'}
              </button>
            </p>
          </div>

          {/* Large CTA Button : Green Pill "Soutenir ce projet" (Screenshot 3) */}
          <button
            type="button"
            onClick={() => setShowDonateModal(true)}
            style={{
              background: '#6B9E41',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '22px 32px',
              fontSize: '20px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(107, 158, 65, 0.4)',
              transition: 'transform 0.15s ease, background 0.15s ease',
              textAlign: 'center',
              width: '100%',
              letterSpacing: '-0.2px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Soutenir ce projet
          </button>
        </div>
      </div>

      {/* =========================================================================
          BOTTOMSHEET / MODAL DE COMMENTAIRES (Fidèle à Mockup Screenshot 4)
          ========================================================================= */}
      {showCommentsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 10005,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setShowCommentsModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#FFFFFF',
              borderRadius: '28px 28px 0 0',
              padding: '16px 24px 28px 24px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
              color: '#0F172A',
              animation: 'slideUp 0.25s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle Bar (Screenshot 4) */}
            <div
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                background: '#CBD5E1',
                margin: '0 auto 16px auto',
              }}
            />

            {/* Modal Header Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>
                Commentaires
              </h3>
              <button
                type="button"
                onClick={() => setShowCommentsModal(false)}
                style={{
                  position: 'absolute',
                  right: 0,
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Comments List Body (Screenshot 4) */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '4px' }}>
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Parent Comment */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <img
                      src={c.avatar}
                      alt={c.author}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                              {c.author}
                            </span>
                            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                              {c.time}
                            </span>
                          </div>

                          <p style={{ fontSize: '14px', margin: '4px 0 6px 0', color: '#1E293B', lineHeight: 1.4 }}>
                            {c.content}
                          </p>

                          <button
                            type="button"
                            onClick={() => setCommentInput(`@${c.author} `)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748B',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              padding: 0,
                            }}
                          >
                            Répondre
                          </button>
                        </div>

                        {/* Heart Like */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                          <button
                            type="button"
                            onClick={() => handleLikeComment(c.id)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <Heart size={16} fill={c.hasLiked ? '#EF4444' : 'none'} color="#EF4444" />
                          </button>
                          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
                            {c.likes}
                          </span>
                        </div>
                      </div>

                      {/* Nested Replies Toggle (Screenshot 4: Voir les 2 réponses précédentes) */}
                      {c.replies && c.replies.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setShowReplies(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748B',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              padding: '2px 0 6px 0',
                            }}
                          >
                            {showReplies[c.id] ? 'Masquer les réponses' : `Voir les ${c.replies.length} réponses précédentes`}
                          </button>

                          {/* Nested Replies */}
                          {showReplies[c.id] && c.replies.map(rep => (
                            <div key={rep.id} style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                              <img
                                src={rep.avatar}
                                alt={rep.author}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                                        {rep.author}
                                      </span>
                                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                                        {rep.time}
                                      </span>
                                    </div>
                                    <p style={{ fontSize: '13px', margin: '3px 0 0 0', color: '#1E293B', lineHeight: 1.4 }}>
                                      {rep.content}
                                    </p>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                    <button
                                      type="button"
                                      onClick={() => handleLikeComment(c.id, true, rep.id)}
                                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                    >
                                      <Heart size={14} fill={rep.hasLiked ? '#EF4444' : 'none'} color="#EF4444" />
                                    </button>
                                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 600 }}>
                                      {rep.likes}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Input Area : Pill field + GIF button (Mockup Screenshot 4) */}
            <form
              onSubmit={handleAddComment}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9',
                marginTop: '12px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F1F5F9',
                  borderRadius: '999px',
                  padding: '6px 18px',
                }}
              >
                <input
                  type="text"
                  placeholder="Ajouter un commentaire"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#0F172A',
                    padding: '6px 0',
                  }}
                />

                {commentInput.trim() && (
                  <button
                    type="submit"
                    style={{
                      background: '#6B9E41',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Send size={14} />
                  </button>
                )}
              </div>

              {/* GIF Button (Screenshot 4) */}
              <button
                type="button"
                style={{
                  background: '#F1F5F9',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  fontWeight: 900,
                  color: '#0F172A',
                  cursor: 'pointer',
                }}
              >
                GIF
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE DON : SOUTENIR CE PROJET
          ========================================================================= */}
      {showDonateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            zIndex: 10010,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowDonateModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 28px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              color: '#0F172A',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {donationSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} color="#6B9E41" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>
                  Merci pour votre soutien !
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Votre don de {donationAmount} $ a été transmis au projet {title}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                    Soutenir le projet
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowDonateModal(false)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                    Montant de votre contribution (USD)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
                    {['10', '25', '50', '100'].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(amt)}
                        style={{
                          padding: '10px',
                          borderRadius: '12px',
                          border: `1.5px solid ${donationAmount === amt ? '#6B9E41' : '#E2E8F0'}`,
                          background: donationAmount === amt ? 'rgba(107, 158, 65, 0.12)' : '#F8FAFC',
                          color: donationAmount === amt ? '#6B9E41' : '#0F172A',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {amt} $
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={donationAmount}
                    onChange={e => setDonationAmount(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '15px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#6B9E41',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(107, 158, 65, 0.35)',
                  }}
                >
                  Confirmer le don de {donationAmount} $
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
