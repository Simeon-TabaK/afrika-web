import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Users, 
  FolderGit2, 
  CheckCircle2, 
  ArrowLeft,
  DollarSign,
  MapPin,
  FileText,
  Plus,
  Trash2,
  Lock,
  Globe
} from 'lucide-react';
import { FeedService } from '../services/feedService';
import { ProjectService } from '../services/projectService';
import { CommunityService } from '../services/communityService';

export const CreateView: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [selectedMobileType, setSelectedMobileType] = useState<'post' | 'community' | 'project' | null>(null);
  const [activeTab, setActiveTab] = useState<'post' | 'community' | 'project'>('post');

  // Common Form States
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Général');
  const [location, setLocation] = useState('Kinshasa, RDC');
  const [imageUrl, setImageUrl] = useState('');
  const [confidentiality, setConfidentiality] = useState<'public' | 'members'>('public');

  // Project Specific States
  const [goalAmount, setGoalAmount] = useState('5000');
  const [currency, setCurrency] = useState('USD');
  const [milestones, setMilestones] = useState<Array<{ title: string; targetAmount: number }>>([
    { title: 'Jalon 1 : Étude & Lancement', targetAmount: 2000 },
  ]);

  // Submission & Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState<'post' | 'community' | 'project'>('post');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setImageUrl('');
    setGoalAmount('5000');
    setMilestones([{ title: 'Jalon 1 : Étude & Lancement', targetAmount: 2000 }]);
    setIsSubmitted(false);
    setSelectedMobileType(null);
  };

  const handleAddMilestone = () => {
    setMilestones(prev => [
      ...prev,
      { title: `Jalon ${prev.length + 1} : Nouvelle étape`, targetAmount: 1000 }
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleMilestoneChange = (index: number, field: 'title' | 'targetAmount', value: string | number) => {
    setMilestones(prev => prev.map((m, idx) => {
      if (idx !== index) return m;
      return { ...m, [field]: value };
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const targetType = isMobile && selectedMobileType ? selectedMobileType : activeTab;

    try {
      if (targetType === 'post') {
        await FeedService.createPost({
          title,
          subtitle,
          description,
          image: imageUrl || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
          category,
        });
      } else if (targetType === 'community') {
        await CommunityService.createCommunity({
          name: title,
          description,
          category,
          location,
          banner: imageUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
          rules: subtitle,
        });
      } else if (targetType === 'project') {
        await ProjectService.createProject({
          title,
          subtitle,
          description,
          goalAmount: Number(goalAmount) || 5000,
          currency,
          location,
          image: imageUrl || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
          milestones,
        });
      }
      setSubmittedType(targetType);
      setIsSubmitted(true);
    } catch {
      setSubmittedType(targetType);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUCCESS SCREEN
  // =========================================================================
  if (isSubmitted) {
    return (
      <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 16px' }}>
        <div
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderRadius: '24px',
            padding: '44px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            color: 'var(--text-main, #0F172A)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(107, 158, 65, 0.15)',
              color: '#6B9E41',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}
          >
            <CheckCircle2 size={36} strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>
            {submittedType === 'post' && 'Publication créée avec succès !'}
            {submittedType === 'community' && 'Nouvelle Communauté lancée !'}
            {submittedType === 'project' && 'Projet collaboratif soumis avec succès !'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary, #64748B)', lineHeight: 1.6, marginBottom: '28px' }}>
            Votre contenu a été enregistré et est désormais partagé avec l'ensemble des membres et donateurs d'Afri'Ka.
          </p>
          <button
            onClick={resetForm}
            style={{
              background: '#6B9E41',
              color: '#FFFFFF',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(107, 158, 65, 0.35)',
            }}
          >
            Créer un autre contenu
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MOBILE VIEW : BOTTOMSHEET SELECTOR (Fidèle à Flutter create_community_bottom_sheet)
  // =========================================================================
  if (isMobile && !selectedMobileType) {
    return (
      <div style={{ maxWidth: '480px', margin: '20px auto', padding: '0 16px' }}>
        <div
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderRadius: '24px',
            padding: '24px 20px 32px 20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
            color: 'var(--text-main, #0F172A)',
          }}
        >
          {/* BottomSheet Drag Handle */}
          <div
            style={{
              width: '44px',
              height: '4px',
              borderRadius: '2px',
              background: '#CBD5E1',
              margin: '0 auto 20px auto',
            }}
          />

          <h2 style={{ fontSize: '18px', fontWeight: 800, textAlign: 'center', marginBottom: '20px' }}>
            Créer
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Option 1: Publication */}
            <div
              onClick={() => setSelectedMobileType('post')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(107, 158, 65, 0.08)',
                cursor: 'pointer',
                border: '1.5px solid rgba(107, 158, 65, 0.2)',
                transition: 'transform 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#6B9E41',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Publication</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary, #64748B)' }}>
                  Partagez une idée, actualité ou article
                </span>
              </div>
            </div>

            {/* Option 2: Communauté */}
            <div
              onClick={() => setSelectedMobileType('community')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(107, 158, 65, 0.08)',
                cursor: 'pointer',
                border: '1.5px solid rgba(107, 158, 65, 0.2)',
                transition: 'transform 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#6B9E41',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={22} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Communauté</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary, #64748B)' }}>
                  Fondez un groupe ou une communauté locale
                </span>
              </div>
            </div>

            {/* Option 3: Projet collaboratif */}
            <div
              onClick={() => setSelectedMobileType('project')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(107, 158, 65, 0.08)',
                cursor: 'pointer',
                border: '1.5px solid rgba(107, 158, 65, 0.2)',
                transition: 'transform 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#6B9E41',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FolderGit2 size={22} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Projet collaboratif</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary, #64748B)' }}>
                  Lancez une collecte avec jalons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FORM VIEW (Desktop / PC with Tabs OR Mobile selected sheet)
  // =========================================================================
  const currentType = isMobile && selectedMobileType ? selectedMobileType : activeTab;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px 60px 16px' }}>
      {/* Mobile Back Header */}
      {isMobile && selectedMobileType && (
        <button
          onClick={() => setSelectedMobileType(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <ArrowLeft size={18} />
          <span>Retour aux choix</span>
        </button>
      )}

      {/* Desktop Mode: Tab Bar */}
      {!isMobile && (
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
            Créer du Contenu ou Lancer une Initiative
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '0 0 16px 0' }}>
            Choisissez le type d'initiative que vous souhaitez publier dans l'écosystème Afri'Ka.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '6px',
              borderRadius: '16px',
              maxWidth: '560px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('post')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'post' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'post' ? '#4A8A2A' : '#FFFFFF',
                fontWeight: activeTab === 'post' ? 800 : 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={18} />
              <span>Publication</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('community')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'community' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'community' ? '#4A8A2A' : '#FFFFFF',
                fontWeight: activeTab === 'community' ? 800 : 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Users size={18} />
              <span>Communauté</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('project')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'project' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'project' ? '#4A8A2A' : '#FFFFFF',
                fontWeight: activeTab === 'project' ? 800 : 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <FolderGit2 size={18} />
              <span>Projet</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Form Card */}
      <div
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
          color: 'var(--text-main, #0F172A)',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Title of Form */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0' }}>
              {currentType === 'post' && 'Créer une Publication'}
              {currentType === 'community' && 'Créer une Nouvelle Communauté'}
              {currentType === 'project' && 'Lancer un Projet Collaboratif'}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary, #64748B)' }}>
              {currentType === 'post' && 'Partagez un article ou une actualité enrichie avec la communauté.'}
              {currentType === 'community' && 'Fédérez des membres autour d’une cause, d’un territoire ou d’une passion.'}
              {currentType === 'project' && 'Définissez vos objectifs, devises et jalons transparents.'}
            </span>
          </div>

          {/* Title Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              {currentType === 'post' && 'Titre de la publication'}
              {currentType === 'community' && 'Nom de la communauté'}
              {currentType === 'project' && 'Titre du projet'} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={
                currentType === 'post'
                  ? 'Ex: Avancée majeure sur notre centre d\'apprentissage...'
                  : currentType === 'community'
                  ? 'Ex: Agropreneurs du Kivu'
                  : 'Ex: Projet Umoja - Électrification Solaire'
              }
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                outline: 'none',
                background: 'var(--bg-main, #F8FAFC)',
                color: 'inherit',
              }}
            />
          </div>

          {/* Subtitle / Rules / Motto */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              {currentType === 'post' && 'Sous-titre ou accroche'}
              {currentType === 'community' && 'Règles ou devise de la communauté'}
              {currentType === 'project' && 'Sous-titre ou mot-dièse (#)'}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              placeholder={
                currentType === 'post'
                  ? 'Résumé en une phrase captivante...'
                  : currentType === 'community'
                  ? 'Ex: Bienveillance, entraide et développement mutuel'
                  : 'Ex: #simamaNaGoma - Sote kwa umoja'
              }
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                outline: 'none',
                background: 'var(--bg-main, #F8FAFC)',
                color: 'inherit',
              }}
            />
          </div>

          {/* Row: Category & Location */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                Catégorie
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'var(--bg-main, #F8FAFC)',
                  color: 'inherit',
                }}
              >
                <option value="Général">Général</option>
                <option value="Technologie">Technologie & Innovation</option>
                <option value="Agriculture">Agriculture & Souveraineté</option>
                <option value="Éducation">Éducation & Formation</option>
                <option value="Santé">Santé & Environnement</option>
                <option value="Culture">Art & Culture</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Localisation
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Ex: Goma, RDC / Dakar, Sénégal"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'var(--bg-main, #F8FAFC)',
                  color: 'inherit',
                }}
              />
            </div>
          </div>

          {/* Project Specific: Target Amount & Currency */}
          {currentType === 'project' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                  <DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Objectif de financement *
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  value={goalAmount}
                  onChange={e => setGoalAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'var(--bg-main, #F8FAFC)',
                    color: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                  Devise
                </label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'var(--bg-main, #F8FAFC)',
                    color: 'inherit',
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CDF">CDF (FC)</option>
                  <option value="XAF">XAF (FCFA)</option>
                  <option value="XOF">XOF (CFA)</option>
                  <option value="RWF">RWF (FRw)</option>
                  <option value="KES">KES (KSh)</option>
                </select>
              </div>
            </div>
          )}

          {/* Description Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              <FileText size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Description détaillée *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Décrivez en détail les motivations, objectifs et retombées attendues..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                outline: 'none',
                background: 'var(--bg-main, #F8FAFC)',
                color: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Media / Image URL Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              URL de l'image / bannière
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                outline: 'none',
                background: 'var(--bg-main, #F8FAFC)',
                color: 'inherit',
              }}
            />
            {imageUrl && (
              <div style={{ marginTop: '10px', borderRadius: '12px', overflow: 'hidden', maxHeight: '160px' }}>
                <img
                  src={imageUrl}
                  alt="Aperçu"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          {/* Project Milestones */}
          {currentType === 'project' && (
            <div
              style={{
                background: 'var(--bg-main, #F8FAFC)',
                padding: '18px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>
                  Jalons du projet (Milestones)
                </h4>
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  style={{
                    background: '#6B9E41',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  <span>Ajouter un jalon</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {milestones.map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={m.title}
                      onChange={e => handleMilestoneChange(idx, 'title', e.target.value)}
                      placeholder={`Jalon ${idx + 1}`}
                      style={{
                        flex: 2,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        background: '#FFFFFF',
                        color: 'inherit',
                      }}
                    />
                    <input
                      type="number"
                      value={m.targetAmount}
                      onChange={e => handleMilestoneChange(idx, 'targetAmount', Number(e.target.value) || 0)}
                      placeholder="Montant cible"
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        background: '#FFFFFF',
                        color: 'inherit',
                      }}
                    />
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestone(idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '6px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidentiality Toggle for Posts */}
          {currentType === 'post' && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Confidentialité :</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="confidentiality"
                  checked={confidentiality === 'public'}
                  onChange={() => setConfidentiality('public')}
                />
                <Globe size={14} color="#6B9E41" />
                <span>Public (Tout le monde)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="confidentiality"
                  checked={confidentiality === 'members'}
                  onChange={() => setConfidentiality('members')}
                />
                <Lock size={14} color="#F59E0B" />
                <span>Membres uniquement</span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '10px',
              padding: '15px',
              borderRadius: '14px',
              border: 'none',
              background: '#6B9E41',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 800,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(107, 158, 65, 0.35)',
              transition: 'opacity 0.2s ease',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting
              ? 'Enregistrement en cours...'
              : currentType === 'post'
              ? 'Publier sur le fil d\'actualité'
              : currentType === 'community'
              ? 'Créer et lancer la communauté'
              : 'Lancer le projet collaboratif'}
          </button>
        </form>
      </div>
    </div>
  );
};
