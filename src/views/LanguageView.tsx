import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Globe, 
  Sparkles,
  Info
} from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  speakers: string;
}

interface LanguageViewProps {
  onBack?: () => void;
}

export const LanguageView: React.FC<LanguageViewProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const languages: LanguageOption[] = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
      region: 'Afrique Francophone, France & International',
      speakers: '+300 millions de locuteurs',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      region: 'Anglophone Africa, USA, UK & Global',
      speakers: '+1.5 billion speakers worldwide',
    },
    {
      code: 'sw',
      name: 'Kiswahili',
      nativeName: 'Kiswahili',
      flag: '🇰🇪',
      region: 'Jumuiya ya Afrika Mashariki (DRC, Kenya, Tanzania, Rwanda, Uganda)',
      speakers: '+200 milioni ya wazungumzaji',
    },
  ];

  const filteredLanguages = languages.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.region.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const currentLanguageCode = i18n.language || 'fr';

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('afrika_lang', code);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px', margin: '0 auto', width: '100%' }}>
      {/* Top Header with Back Button and Title */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(109, 190, 71, 0.25) 0%, rgba(240, 186, 49, 0.15) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(109, 190, 71, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {onBack && (
            <button
              onClick={onBack}
              title={t('back') || 'Retour'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={24} color="#6DBE47" />
              <span>{t('language')}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: '4px 0 0' }}>
              Sélectionnez votre langue d'affichage pour l'ensemble de l'application Afri'Ka.
            </p>
          </div>
        </div>

        <div 
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(109, 190, 71, 0.2)',
            border: '1px solid rgba(109, 190, 71, 0.4)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#6DBE47',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={14} />
          <span>Multilingue</span>
        </div>
      </div>

      {/* Search Bar - Matching Flutter's CustomSearchField */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Search 
          size={18} 
          color="var(--text-muted)" 
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search') || 'Rechercher une langue...'}
          style={{
            width: '100%',
            padding: '14px 16px 14px 46px',
            background: 'var(--bg-surface, #1e1e1e)',
            border: '1px solid var(--border-color, #333)',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#6DBE47';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109, 190, 71, 0.2)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color, #333)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 8px',
            }}
          >
            Effacer
          </button>
        )}
      </div>

      {/* Language List - Similar to Flutter's ListView.separated with ListTile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredLanguages.length === 0 ? (
          <div 
            style={{ 
              padding: '40px 20px', 
              textAlign: 'center', 
              color: 'var(--text-muted)',
              background: 'var(--bg-surface, #1e1e1e)',
              borderRadius: '14px',
              border: '1px solid var(--border-color, #333)'
            }}
          >
            <Info size={32} style={{ marginBottom: '8px', opacity: 0.6 }} />
            <p style={{ margin: 0, fontSize: '14px' }}>Aucune langue ne correspond à "{searchQuery}"</p>
          </div>
        ) : (
          filteredLanguages.map((lang) => {
            const isSelected = currentLanguageCode === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 22px',
                  borderRadius: '14px',
                  background: isSelected 
                    ? 'rgba(109, 190, 71, 0.12)' 
                    : 'var(--bg-surface, #1e1e1e)',
                  border: isSelected 
                    ? '2px solid #6DBE47' 
                    : '1px solid var(--border-color, #333)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected 
                    ? '0 6px 20px rgba(109, 190, 71, 0.15)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(109, 190, 71, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-color, #333)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                {/* Left: Flag + Labels */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div 
                    style={{ 
                      fontSize: '32px',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {lang.flag}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                        {lang.name}
                      </span>
                      {lang.nativeName !== lang.name && (
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          ({lang.nativeName})
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {lang.region}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {lang.speakers}
                    </div>
                  </div>
                </div>

                {/* Right: Checkmark Icon (Matching FontAwesome circle_check_solid in blue/green) */}
                <div>
                  {isSelected ? (
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#6DBE47',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(109, 190, 71, 0.4)',
                      }}
                    >
                      <CheckCircle2 size={20} color="#fff" />
                    </div>
                  ) : (
                    <div 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        border: '2px solid var(--border-color, #444)' 
                      }} 
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info card at bottom */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          background: 'var(--bg-surface-elevated, #242424)',
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
          color: 'var(--text-secondary)',
          fontSize: '12px',
        }}
      >
        <Info size={18} color="#6DBE47" style={{ flexShrink: 0 }} />
        <span>
          Le changement de langue prend effet instantanément sur tous les écrans, boutons, formulaires et notifications sans rechargement de page.
        </span>
      </div>
    </div>
  );
};
