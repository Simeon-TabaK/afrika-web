import React from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import { 
  Sparkles, 
  Eye
} from 'lucide-react';

export const StoriesAdminView: React.FC = () => {
  const stories = [
    {
      id: 'st_1',
      author: 'Samuel Eto’o Media',
      authorCert: 'public_figure' as const,
      caption: 'Visite des futurs locaux du Hub Afri-ka à Yaoundé !',
      mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      viewsCount: 1420,
      sharesCount: 185,
      status: 'active',
      publishedAt: 'Il y a 6h',
      expiresIn: '18h restantes',
    },
    {
      id: 'st_2',
      author: 'Benoît Mukendi',
      authorCert: 'entrepreneur' as const,
      caption: 'Test réussi pour l’onduleur solaire hybride 500W.',
      mediaUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400',
      viewsCount: 890,
      sharesCount: 62,
      status: 'active',
      publishedAt: 'Il y a 10h',
      expiresIn: '14h restantes',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={28} color="var(--color-primary, #6DBE47)" />
          <span>Supervision des Stories & Statistiques de Vues</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Suivi des contenus éphémères, engagement communautaire et modération des médias.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {stories.map(s => (
          <div key={s.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '220px', position: 'relative' }}>
              <img src={s.mediaUrl} alt={s.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.75)', padding: '4px 10px', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(4px)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{s.author}</span>
                <CertificationBadge type={s.authorCert} size="sm" />
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.75)', color: 'var(--color-accent)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={14} />
                <span>{s.viewsCount} vues</span>
              </div>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, lineHeight: '1.4' }}>
                "{s.caption}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <span>{s.publishedAt}</span>
                <span style={{ color: 'var(--color-primary)' }}>{s.expiresIn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
