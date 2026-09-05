import { useState } from 'react';
import { MOCK_SYSTEM_HEALTH } from '../services/api';
import { 
  Server, 
  Cpu, 
  Activity, 
  Bell, 
  Send, 
  CheckCircle2, 
  Terminal, 
  HardDrive, 
  Layers
} from 'lucide-react';

export const OpsHealthView = () => {
  const [fcmTarget, setFcmTarget] = useState<'all' | 'certified' | 'donors'>('all');
  const [fcmTitle, setFcmTitle] = useState('Campagne Urgence Eau Kinshasa');
  const [fcmBody, setFcmBody] = useState('Objectif atteint à 85% ! Merci pour vos contributions généreuses.');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendFCM = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 4000);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Server size={28} color="#3B82F6" />
          <span>Supervision Système & Déploiement Dokploy</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Cluster de conteneurs Docker Dokploy, état des passerelles et centre d'expédition push FCM.
        </p>
      </div>

      {/* Dokploy Cluster Health Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Cluster Dokploy</span>
            <Layers size={18} color="#3B82F6" />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
            {MOCK_SYSTEM_HEALTH.dokploy_cluster}
          </div>
          <div className="metric-subtitle" style={{ color: 'var(--status-success)' }}>
            ✓ Swarm synchronisé
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Disponibilité Globale</span>
            <Activity size={18} color="#10B981" />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>
            {MOCK_SYSTEM_HEALTH.uptime}
          </div>
          <div className="metric-subtitle">
            SLA annuel respecté (&gt; 99.9%)
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Conteneurs Actifs</span>
            <Cpu size={18} color="#F0BA31" />
          </div>
          <div className="metric-value">
            {MOCK_SYSTEM_HEALTH.containers.length} / {MOCK_SYSTEM_HEALTH.containers.length}
          </div>
          <div className="metric-subtitle">
            0 conteneur en anomalie
          </div>
        </div>
      </div>

      {/* Dokploy Containers Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Terminal size={18} color="#6B9E41" />
            <span>Conteneurs Docker Actifs sous Dokploy</span>
          </h3>
          <span className="badge badge-success">Dokploy Managed</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nom du Conteneur</th>
                <th>Image Docker</th>
                <th>Statut</th>
                <th>Usage CPU</th>
                <th>Usage Mémoire</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SYSTEM_HEALTH.containers.map((c) => (
                <tr key={c.name}>
                  <td style={{ fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{c.name}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '12px' }}>{c.image}</td>
                  <td>
                    <span className="badge badge-success">
                      <CheckCircle2 size={12} /> Running
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.cpu}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.memory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services & Third-Party Gateways Status */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <HardDrive size={18} color="#F0BA31" />
            <span>Santé des Passerelles Externes & Webhooks</span>
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '14px'
        }}>
          {MOCK_SYSTEM_HEALTH.services.map((srv) => (
            <div
              key={srv.name}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{srv.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--status-success)', marginTop: '2px' }}>
                  ● Opérationnel
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {srv.latency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FCM Push Notification Dispatch Center */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Bell size={18} color="#EF4444" />
            <span>Console d'Émission Notifications Push FCM</span>
          </h3>
          <span className="badge badge-warning">Dokploy Celery Worker Ready</span>
        </div>

        {sendSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            color: 'var(--status-success)',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <CheckCircle2 size={18} />
            <span>Notification envoyée à 1,482 appareils enregistrés avec succès !</span>
          </div>
        )}

        <form onSubmit={handleSendFCM} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Audience Cible
              </label>
              <select
                className="select-input"
                style={{ width: '100%' }}
                value={fcmTarget}
                onChange={(e) => setFcmTarget(e.target.value as any)}
              >
                <option value="all">Tous les Membres Actifs (1,482)</option>
                <option value="certified">Membres Certifiés Uniquement (24)</option>
                <option value="donors">Donateurs Récents (312)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Titre du Push
              </label>
              <input
                type="text"
                className="select-input"
                style={{ width: '100%' }}
                value={fcmTitle}
                onChange={(e) => setFcmTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Corps du Message
            </label>
            <textarea
              className="select-input"
              style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
              value={fcmBody}
              onChange={(e) => setFcmBody(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSending}
              style={{ padding: '10px 20px' }}
            >
              <Send size={14} />
              <span>{isSending ? 'Transmission aux passerelles FCM...' : 'Diffuser la Notification Push'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
