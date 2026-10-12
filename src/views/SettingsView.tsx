import React, { useState, useEffect } from 'react';
import type { UserRole, SupportedCurrency } from '../types';
import { CURRENCY_SYMBOLS } from '../services/api';
import { useTranslation } from 'react-i18next';
import { getGMTCurrentTimeString, getUserTimezoneString } from '../utils/dateFormatter';
import { 
  Settings, 
  Languages, 
  Globe, 
  Sun, 
  Moon, 
  Clock, 
  ShieldCheck, 
  UserCog,
  ChevronRight
} from 'lucide-react';

interface SettingsViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currency: SupportedCurrency;
  onCurrencyChange: (currency: SupportedCurrency) => void;
  onNavigateToLanguage?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentRole,
  onRoleChange,
  currency,
  onCurrencyChange,
  onNavigateToLanguage,
}) => {
  const { t, i18n } = useTranslation();
  const [gmtTime, setGmtTime] = useState<string>(getGMTCurrentTimeString());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('afrika_theme') !== 'light';
  });
  const userTz = getUserTimezoneString();

  // Security preferences
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [hideDonationAmounts, setHideDonationAmounts] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGmtTime(getGMTCurrentTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    if (nextTheme) {
      document.body.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('afrika_theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('afrika_theme', 'light');
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('afrika_lang', lng);
  };

  const currencies: SupportedCurrency[] = ['USD', 'EUR', 'CDF', 'XAF', 'XOF', 'RWF', 'KES', 'NGN'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={28} color="var(--color-primary, #6DBE47)" />
          <span>Paramètres & Préférences de l'Écosystème</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
          Gérez votre fuseau horaire, vos devises, votre langue et vos permissions de test.
        </p>
      </div>

      {/* 1. Fuseau Horaire GMT & Horloge Locale */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--color-primary)" />
            <span>Gestion du Temps & Fuseau Horaire GMT</span>
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Horloge Officielle Standard (UTC)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {gmtTime.split(' ').slice(4, 5).join('')} GMT
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '4px' }}>
              Tous les enregistrements en base sont horodatés en UTC.
            </div>
          </div>
          <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-elevated, #222)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Votre Fuseau Local Détecté</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {userTz}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Les dates et jalons s’affichent convertis à votre heure locale.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Langue & Affichage */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Languages size={18} color="var(--color-primary)" />
            <span>Langue d'Affichage de la Plateforme</span>
          </h3>
        </div>

        {/* Dedicated Navigation Tile matching Flutter AllSettingsScreen */}
        {onNavigateToLanguage && (
          <div
            onClick={onNavigateToLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 'var(--radius-sm, 12px)',
              background: 'var(--bg-surface-elevated, #242424)',
              border: '1px solid var(--border-color, #333)',
              marginBottom: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary, #6DBE47)';
              e.currentTarget.style.background = 'rgba(109, 190, 71, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color, #333)';
              e.currentTarget.style.background = 'var(--bg-surface-elevated, #242424)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(109, 190, 71, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary, #6DBE47)',
                }}
              >
                <Languages size={22} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                  {t('language')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Actuelle :</span>
                  <span style={{ fontWeight: 600, color: '#6DBE47' }}>
                    {i18n.language === 'sw' ? '🇹🇿 Kiswahili' : i18n.language === 'en' ? '🇺🇸 English' : '🇫🇷 Français'}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>• Ouvrir l'écran dédié</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary, #6DBE47)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>Gérer</span>
              <ChevronRight size={18} />
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { code: 'fr', label: 'Français', flag: '🇫🇷' },
            { code: 'en', label: 'English', flag: '🇬🇧' },
            { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
          ].map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                border: i18n.language === lang.code ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                background: i18n.language === lang.code ? 'rgba(109, 190, 71, 0.15)' : 'var(--bg-surface-elevated, #222)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              <span style={{ fontSize: '22px' }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Devise de Référence & Thème */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="var(--color-primary)" />
              <span>Devise Préférée</span>
            </h3>
          </div>
          <select
            className="select-input"
            value={currency}
            onChange={e => onCurrencyChange(e.target.value as SupportedCurrency)}
            style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}
          >
            {currencies.map(c => (
              <option key={c} value={c}>
                {c} ({CURRENCY_SYMBOLS[c]})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Tous les montants des projets et dons seront convertis dynamiquement dans cette devise.
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isDarkMode ? <Moon size={18} color="var(--color-primary)" /> : <Sun size={18} color="var(--color-primary)" />}
              <span>Thème Graphique</span>
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => { if (!isDarkMode) toggleTheme(); }}
              className={`btn ${isDarkMode ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '10px' }}
            >
              <Moon size={14} />
              <span>Mode Sombre</span>
            </button>
            <button
              onClick={() => { if (isDarkMode) toggleTheme(); }}
              className={`btn ${!isDarkMode ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '10px' }}
            >
              <Sun size={14} />
              <span>Mode Clair</span>
            </button>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Préférence sauvegardée dans votre navigateur.
          </div>
        </div>
      </div>

      {/* 4. Rôle & Switch d'Administration (Audit RBAC) */}
      <div className="card" style={{ border: '1px solid rgba(109, 190, 71, 0.3)' }}>
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCog size={18} color="var(--color-primary)" />
            <span>Sélection du Rôle Actif (Audit & Démonstration RBAC)</span>
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Basculez instantanément entre les comptes certifiés et les rôles d'agents administratifs pour auditer les permissions du menu latéral :
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {[
            { role: 'super_admin' as UserRole, label: 'Super Admin', desc: 'Accès total + Certif directe' },
            { role: 'donations_agent' as UserRole, label: 'Agent Dons', desc: 'Finance & transactions' },
            { role: 'communities_agent' as UserRole, label: 'Agent Communautés', desc: 'Groupes & forums' },
            { role: 'ops_agent' as UserRole, label: 'Agent Ops / Systèmes', desc: 'Dokploy & santé' },
            { role: 'marketing_agent' as UserRole, label: 'Agent Marketing', desc: 'Marketplace & Stories' },
            { role: 'user' as UserRole, label: 'Membre Client', desc: 'Interface publique standard' },
          ].map(r => (
            <button
              key={r.role}
              onClick={() => onRoleChange(r.role)}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: currentRole === r.role ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                background: currentRole === r.role ? 'rgba(109, 190, 71, 0.2)' : 'var(--bg-surface-elevated, #222)',
                textAlign: 'left',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{r.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{r.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Confidentialité & Sécurité */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="var(--color-primary)" />
            <span>Sécurité & Confidentialité des Données</span>
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Double Authentification (2FA) & Biométrie</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exiger une confirmation biométrique à l’accès sensible</div>
            </div>
            <input
              type="checkbox"
              checked={biometricEnabled}
              onChange={e => setBiometricEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Masquer le montant de mes dons publics</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Apparaître comme Donateur Anonyme sur les projets</div>
            </div>
            <input
              type="checkbox"
              checked={hideDonationAmounts}
              onChange={e => setHideDonationAmounts(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Compte Privé</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Limiter la visibilité des posts aux seuls abonnés</div>
            </div>
            <input
              type="checkbox"
              checked={privateAccount}
              onChange={e => setPrivateAccount(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
