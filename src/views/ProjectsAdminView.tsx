import React, { useState } from 'react';
import { CertificationBadge } from '../components/CertificationBadge';
import type { SupportedCurrency } from '../types';
import { formatCurrency, convertCurrency } from '../services/api';
import { 
  FolderGit2, 
  Search, 
  Eye, 
  X, 
  Target, 
  Users, 
  CheckCircle2, 
  Coins,
  Clock
} from 'lucide-react';

interface ProjectsAdminViewProps {
  currency: SupportedCurrency;
}

export const ProjectsAdminView: React.FC<ProjectsAdminViewProps> = ({ currency }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      id: 'proj_1',
      title: 'Électrification Solaire & Tech Hub Kivu',
      description: 'Construction d’un centre d’innovation équipé en énergie solaire autonome à Goma pour former 500 jeunes développeurs par an.',
      owner: 'Benoît Mukendi',
      ownerEmail: 'entrepreneur.benoit@afrika.com',
      ownerCert: 'entrepreneur' as const,
      community: 'Tech & Innovation Panafricaine',
      subgroup: 'Intelligence Artificielle & Fintech',
      goalAmountUSD: 15000,
      raisedAmountUSD: 8500,
      status: 'ongoing',
      membersCount: 42,
      donationsCount: 18,
      createdAt: '2026-02-01',
      milestones: [
        { id: 'm1', title: 'Acquisition des panneaux photovoltaïques & onduleurs 10kVA', targetUSD: 5000, currentUSD: 5000, isCompleted: true, dueDate: '15 Mars 2026' },
        { id: 'm2', title: 'Aménagement de la salle serveur et connexion satellite LEO', targetUSD: 6000, currentUSD: 3500, isCompleted: false, dueDate: '30 Avril 2026' },
        { id: 'm3', title: 'Recrutement des formateurs et première cohorte d’étudiants', targetUSD: 4000, currentUSD: 0, isCompleted: false, dueDate: '30 Juin 2026' },
      ],
      linkedDonations: [
        { id: 'don_1', donor: 'Amara Diallo', amountUSD: 250, date: '04 Sept 2026', cert: 'donor' as const, milestone: 'Salle serveur' },
        { id: 'don_2', donor: 'Fatou Sow', amountUSD: 1200, date: '02 Sept 2026', cert: 'donor' as const, milestone: 'Panneaux solaires' },
        { id: 'don_3', donor: 'Awa Diop NGO', amountUSD: 2000, date: '28 Août 2026', cert: 'organization' as const, milestone: 'Panneaux solaires' },
      ],
      linkedMembers: [
        { id: 'mem_1', name: 'Benoît Mukendi', role: 'Porteur du Projet', cert: 'entrepreneur' as const },
        { id: 'mem_2', name: 'Alain Kasongo', role: 'Ingénieur Solaire', cert: 'none' as const },
        { id: 'mem_3', name: 'Nathalie Ilunga', role: 'Coordinatrice Pédagogique', cert: 'none' as const },
      ]
    },
    {
      id: 'proj_2',
      title: 'Forage Solaire & Centre Agroécologique Sénégal',
      description: 'Pompage solaire et irrigation pour sécuriser la production maraîchère de 3 villages dans le bassin arachidier.',
      owner: 'Fondation Awa Diop',
      ownerEmail: 'contact@awadiop.org',
      ownerCert: 'organization' as const,
      community: 'AgriTech & Souveraineté Alimentaire',
      subgroup: 'Énergie & Forages',
      goalAmountUSD: 20000,
      raisedAmountUSD: 12400,
      status: 'ongoing',
      membersCount: 88,
      donationsCount: 29,
      createdAt: '2026-01-15',
      milestones: [
        { id: 'm4', title: 'Étude géophysique & forage à 80m de profondeur', targetUSD: 8000, currentUSD: 8000, isCompleted: true, dueDate: '20 Fév 2026' },
        { id: 'm5', title: 'Installation de la pompe solaire immergée & château d’eau', targetUSD: 7000, currentUSD: 4400, isCompleted: false, dueDate: '15 Mai 2026' },
        { id: 'm6', title: 'Réseau de distribution goutte-à-goutte sur 5 hectares', targetUSD: 5000, currentUSD: 0, isCompleted: false, dueDate: '15 Juillet 2026' },
      ],
      linkedDonations: [
        { id: 'don_4', donor: 'Samuel Eto’o Media', amountUSD: 5000, date: '01 Sept 2026', cert: 'public_figure' as const, milestone: 'Forage à 80m' },
        { id: 'don_5', donor: 'Koffi Mensah', amountUSD: 450, date: '25 Août 2026', cert: 'donor' as const, milestone: 'Château d’eau' },
      ],
      linkedMembers: [
        { id: 'mem_4', name: 'Awa Diop', role: 'Directrice ONG', cert: 'organization' as const },
        { id: 'mem_5', name: 'Mamadou Ndiaye', role: 'Agronome Référent', cert: 'none' as const },
      ]
    }
  ];

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.community.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FolderGit2 size={28} color="var(--color-primary, #6DBE47)" />
          <span>Gestion des Projets & Audit des Jalons (Milestones)</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Supervision détaillée des projets : progression financière, jalons validés, membres de l’équipe et dons rattachés.
        </p>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="card-title">Projets Déclarés ({filtered.length})</h3>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Rechercher par titre, initiateur ou communauté..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated, #222)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Projet</th>
                <th>Porteur & Certification</th>
                <th>Communauté</th>
                <th>Collecte / Objectif</th>
                <th>Jalons</th>
                <th>Membres</th>
                <th style={{ textAlign: 'right' }}>Détails Liés</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const convertedRaised = convertCurrency(p.raisedAmountUSD, 'USD', currency);
                const convertedGoal = convertCurrency(p.goalAmountUSD, 'USD', currency);
                const percent = Math.round((p.raisedAmountUSD / p.goalAmountUSD) * 100);

                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{p.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Créé le {p.createdAt}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#fff' }}>{p.owner}</span>
                        <CertificationBadge type={p.ownerCert} size="sm" />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.ownerEmail}</div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{p.community}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(convertedRaised, currency)}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        sur {formatCurrency(convertedGoal, currency)} ({percent}%)
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">
                        {p.milestones.filter((m: any) => m.isCompleted).length} / {p.milestones.length} validés
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#fff' }}>{p.membersCount} membres</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => setSelectedProject(p)}
                      >
                        <Eye size={14} />
                        <span>Audit Complet</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
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

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-success">{selectedProject.community}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {selectedProject.subgroup}</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>
                {selectedProject.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Porteur : {selectedProject.owner}</span>
                <CertificationBadge type={selectedProject.ownerCert} size="sm" />
              </div>
            </div>

            {/* Milestones Section */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Target size={16} color="var(--color-primary)" />
                <span>Jalons du Projet (Milestones)</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProject.milestones.map((m: any) => (
                  <div
                    key={m.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-elevated, #222)',
                      border: m.isCompleted ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {m.isCompleted ? (
                          <CheckCircle2 size={16} color="var(--status-success)" />
                        ) : (
                          <Clock size={16} color="var(--text-muted)" />
                        )}
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{m.title}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', marginLeft: '24px' }}>
                        Échéance : {m.dueDate}
                      </div>
                    </div>
                    <span className={`badge ${m.isCompleted ? 'badge-success' : 'badge-neutral'}`}>
                      {formatCurrency(convertCurrency(m.currentUSD, 'USD', currency), currency)} / {formatCurrency(convertCurrency(m.targetUSD, 'USD', currency), currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Donations */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Coins size={16} color="var(--color-accent)" />
                <span>Donations Rattachées ({selectedProject.linkedDonations.length})</span>
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {selectedProject.linkedDonations.map((d: any) => (
                  <div key={d.id} style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{d.donor}</span>
                        <CertificationBadge type={d.cert} size="sm" />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(convertCurrency(d.amountUSD, 'USD', currency), currency)}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Jalon ciblé : {d.milestone} • {d.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Members */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Users size={16} color="#3B82F6" />
                <span>Membres Clés & Équipe du Projet ({selectedProject.linkedMembers.length})</span>
              </h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {selectedProject.linkedMembers.map((mem: any) => (
                  <div key={mem.id} style={{ padding: '8px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{mem.name}</div>
                    <CertificationBadge type={mem.cert} size="sm" />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({mem.role})</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedProject(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
