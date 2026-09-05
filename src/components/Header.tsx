import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { UserRole, CertificationType } from '../types';
import type { AuthUserProfile } from '../models/auth';
import type { NavItemKey } from './Navigation';
import {
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Coins,
  FileText,
  Users,
  HelpCircle,
  Settings as SettingsIcon,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Server,
  Store,
  Film,
  BadgeCheck,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  user?: AuthUserProfile | null;
  title: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onNavigate: (item: NavItemKey) => void;
  onLogout?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onFilterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  user,
  title,
  isSidebarOpen: _isSidebarOpen = true,
  onToggleSidebar: _onToggleSidebar,
  onNavigate,
  onLogout,
  searchQuery = '',
  onSearchChange,
  onFilterClick,
}) => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem('afrika_theme') !== 'light');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Privacy states
  const [hideAmounts, setHideAmounts] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  const handleToggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.body.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('afrika_theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('afrika_theme', 'light');
    }
  };

  // Current logged in user display
  const userProfile = {
    name: user?.username || (currentRole === 'super_admin' ? 'Super Admin' : 'Benoît Mukendi'),
    email: user?.email || (currentRole === 'super_admin' ? 'superadmin@afrika.com' : 'entrepreneur@kintech.cd'),
    certification: (user?.certification || (currentRole === 'super_admin' ? 'organization' : 'entrepreneur')) as CertificationType,
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return t('role_super_admin');
      case 'donations_agent': return t('role_donations');
      case 'communities_agent': return t('role_communities');
      case 'ops_agent': return t('role_ops');
      case 'marketing_agent': return t('role_marketing');
      case 'user': return t('role_user');
    }
  };

  // Admin modules accessible on mobile drawer for admins
  const getAdminMenuItems = () => {
    const all = [
      { key: 'overview' as NavItemKey, label: t('overview'), icon: LayoutDashboard, roles: ['super_admin'] },
      { key: 'users_admin' as NavItemKey, label: t('users_admin'), icon: Users, roles: ['super_admin', 'ops_agent'] },
      { key: 'certified_users_admin' as NavItemKey, label: t('certified_users_admin'), icon: BadgeCheck, roles: ['super_admin'] },
      { key: 'communities_admin' as NavItemKey, label: t('communities_admin'), icon: Users, roles: ['super_admin', 'communities_agent'] },
      { key: 'forums_admin' as NavItemKey, label: `${t('forums')} (Audit)`, icon: HelpCircle, roles: ['super_admin', 'communities_agent'] },
      { key: 'projects_admin' as NavItemKey, label: t('projects_admin'), icon: Coins, roles: ['super_admin', 'donations_agent', 'marketing_agent'] },
      { key: 'donations' as NavItemKey, label: t('donations'), icon: Coins, roles: ['super_admin', 'donations_agent'] },
      { key: 'stories_admin' as NavItemKey, label: t('stories'), icon: Film, roles: ['super_admin', 'marketing_agent'] },
      { key: 'marketplace_admin' as NavItemKey, label: t('marketplace'), icon: Store, roles: ['super_admin', 'marketing_agent'] },
      { key: 'kyc_admin' as NavItemKey, label: t('kyc_admin'), icon: BadgeCheck, roles: ['super_admin', 'ops_agent'] },
      { key: 'ops' as NavItemKey, label: t('ops'), icon: Server, roles: ['super_admin', 'ops_agent'] },
      { key: 'settings' as NavItemKey, label: t('settings'), icon: SettingsIcon, roles: ['super_admin', 'donations_agent', 'communities_agent', 'ops_agent', 'marketing_agent'] },
      { key: 'help' as NavItemKey, label: t('help'), icon: HelpCircle, roles: ['super_admin', 'donations_agent', 'communities_agent', 'ops_agent', 'marketing_agent'] },
    ];
    return all.filter(item => item.roles.includes(currentRole));
  };

  return (
    <>
      {/* =========================================================================
          HEADER 1 : PINNED TOP APP BAR (Plein écran de gauche à droite)
          Photo de profil à gauche, Notifications & Menu burger à droite
          ========================================================================= */}
      <header
        className="dual-header-top"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 28px',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Left: User Profile Picture (Circular image) */}
        <div
          onClick={() => onNavigate('profile')}
          title="Mon profil"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '12px',
          }}
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(255, 255, 255, 0.85)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

        {/* Right: Theme switch + Notification Bell + Hamburger Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Dark/Light mode toggle */}
          <button
            onClick={handleToggleTheme}
            title={isDark ? "Passer en mode vert clair" : "Passer en mode sombre"}
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)')}
          >
            {isDark ? <Sun size={18} color="#FFD700" /> : <Moon size={18} color="#FFFFFF" />}
          </button>

          {/* Notification Bell with Badge */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)')}
          >
            <Bell size={20} color="#FFFFFF" />
            <span
              style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#F0BA31',
                border: '1.5px solid #FFFFFF',
              }}
            />
          </button>

          {/* Hamburger Menu button (Opens right menu drawer on Phone, Tablet and PC) */}
          <button
            onClick={() => {
              if (currentRole === 'user') {
                setShowUserMenu(true);
              } else {
                setShowAdminMenu(true);
              }
            }}
            title={t('menu')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Menu size={32} strokeWidth={2.5} color="#FFFFFF" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          HEADER 2 : PINNED SUB-HEADER (Titre à gauche & Barre de recherche + filtre à droite)
          Exactement comme sur le mockup
          ========================================================================= */}
      <section
        className="dual-header-sub"
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 28px 18px',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Left: Bold Title (ex: "Tendance et Projets à découvrir") */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '-0.4px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
          }}
        >
          {title}
        </h1>

        {/* Right: White pill search bar + Sliders icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* White Pill Search Bar */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '9999px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              padding: '0 18px',
              height: '46px',
              width: '320px',
              maxWidth: '85vw',
            }}
          >
            <Search size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder={t('whats_new_placeholder')}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#0F172A',
                fontSize: '14px',
                fontWeight: 500,
                width: '100%',
              }}
            />
          </div>

          {/* Filter Sliders Icon */}
          <button
            onClick={onFilterClick}
            title="Filtres"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '10px',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <SlidersHorizontal size={26} color="#FFFFFF" strokeWidth={2.2} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          RIGHT DRAWER / MENU POUR UTILISATEUR SIMPLE (Phone, Tablette & PC)
          Les textes ne sont JAMAIS blancs sur fond clair
          ========================================================================= */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setShowUserMenu(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '350px',
              height: '100%',
              background: isDark ? '#1E1E1E' : '#FFFFFF',
              borderLeft: isDark ? '1px solid #2E2E2E' : '1px solid #E2E8F0',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 35px rgba(0,0,0,0.3)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #6B9E41',
                  }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0F172A' }}>
                    {userProfile.name}
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#9CA3AF' : '#64748B' }}>
                    {userProfile.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowUserMenu(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? '#9CA3AF' : '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu List with high-contrast text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('profile');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <User size={19} color="#6B9E41" />
                <span style={{ fontWeight: 600 }}>{t('profile')}</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('donations');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <Coins size={19} color="#F0BA31" />
                <span style={{ fontWeight: 600 }}>{t('my_donations')}</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('profile');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <FileText size={19} color="#70C04F" />
                <span style={{ fontWeight: 600 }}>{t('my_posts')}</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('communities_admin');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <Users size={19} color="#38BDF8" />
                <span style={{ fontWeight: 600 }}>{t('my_communities')}</span>
              </button>

              <div
                style={{
                  height: '1px',
                  background: isDark ? '#2E2E2E' : '#E2E8F0',
                  margin: '10px 0',
                }}
              />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('help');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <HelpCircle size={19} color={isDark ? '#9CA3AF' : '#64748B'} />
                <span style={{ fontWeight: 600 }}>{t('help_support')}</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('settings');
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <SettingsIcon size={19} color={isDark ? '#9CA3AF' : '#64748B'} />
                <span style={{ fontWeight: 600 }}>{t('settings')}</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  setShowPrivacyModal(true);
                }}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                <ShieldCheck size={19} color="#10B981" />
                <span style={{ fontWeight: 600 }}>{t('privacy')}</span>
              </button>

              {/* Theme toggle in drawer */}
              <button
                onClick={handleToggleTheme}
                className="btn-drawer-item"
                style={{
                  ...drawerItemBaseStyle,
                  color: isDark ? '#F1F5F9' : '#1E293B',
                }}
              >
                {isDark ? <Sun size={19} color="#FFD700" /> : <Moon size={19} color="#6B9E41" />}
                <span style={{ fontWeight: 600 }}>{isDark ? "Mode Clair" : "Mode Sombre"}</span>
              </button>
            </div>

            {/* Bottom: Déconnexion */}
            <div style={{ borderTop: isDark ? '1px solid #2E2E2E' : '1px solid #E2E8F0', paddingTop: '16px', marginTop: '12px' }}>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  setShowLogoutConfirm(true);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: '#EF4444',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <LogOut size={18} />
                <span>{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          RIGHT DRAWER / MENU POUR ADMINISTRATEUR (Phone, Tablette & PC)
          ========================================================================= */}
      {showAdminMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setShowAdminMenu(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '350px',
              height: '100%',
              background: isDark ? '#1E1E1E' : '#FFFFFF',
              borderLeft: isDark ? '1px solid #2E2E2E' : '1px solid #E2E8F0',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 35px rgba(0,0,0,0.3)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  Modules Administrateur
                </h3>
                <span style={{ fontSize: '12px', color: '#6B9E41', fontWeight: 700 }}>
                  {getRoleDisplayName(currentRole)}
                </span>
              </div>
              <button
                onClick={() => setShowAdminMenu(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? '#9CA3AF' : '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {getAdminMenuItems().map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setShowAdminMenu(false);
                      onNavigate(item.key);
                    }}
                    style={{
                      ...drawerItemBaseStyle,
                      color: isDark ? '#F1F5F9' : '#1E293B',
                    }}
                  >
                    <Icon size={18} color="#6B9E41" />
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: isDark ? '1px solid #2E2E2E' : '1px solid #E2E8F0', paddingTop: '16px', marginTop: '12px' }}>
              <button
                onClick={() => {
                  setShowAdminMenu(false);
                  setShowLogoutConfirm(true);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: '#EF4444',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={18} />
                <span>{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE CONFIDENTIALITÉ
          ========================================================================= */}
      {showPrivacyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface, #1D1D1D)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '28px 24px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {t('privacy_title')}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Afri'Ka Security Protocol</span>
                </div>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              {t('privacy_desc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface-elevated, #222)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Masquer le montant de mes dons
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Vos dons apparaîtront anonymes sur les projets
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hideAmounts}
                  onChange={(e) => setHideAmounts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary, #6B9E41)', cursor: 'pointer' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface-elevated, #222)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Compte Protégé / Privé
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Seuls vos abonnés approuvés voient vos activités
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={privateAccount}
                  onChange={(e) => setPrivateAccount(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary, #6B9E41)', cursor: 'pointer' }}
                />
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(107, 158, 65, 0.12)',
                  border: '1px solid rgba(107, 158, 65, 0.25)',
                  fontSize: '11px',
                  color: 'var(--color-primary, #6B9E41)',
                  lineHeight: '1.4',
                }}
              >
                ✓ Chiffrement SSL/TLS 256 bits et authentification OTP sécurisée actifs sur votre compte.
              </div>
            </div>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '12px',
                fontWeight: 700,
                background: 'var(--color-primary, #6B9E41)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Enregistrer les préférences
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE CONFIRMATION DE DÉCONNEXION
          ========================================================================= */}
      {showLogoutConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 10002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="afrika-confirm-dialog"
            style={{
              borderRadius: '22px',
              padding: '28px 24px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="afrika-dialog-icon-wrap"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <LogOut size={26} strokeWidth={2.5} />
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 10px 0' }}>
              {t('logout_confirm_title')}
            </h3>

            <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '0 0 24px 0', opacity: 0.92 }}>
              {t('logout_confirm_message')}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="afrika-dialog-cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                {t('cancel')}
              </button>

              <button
                type="button"
                className="afrika-dialog-confirm-btn"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    onNavigate('auth');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.15s ease',
                }}
              >
                {t('confirm_logout')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PANNEAU NOTIFICATIONS
          ========================================================================= */}
      {showNotifications && (
        <div
          className="header-popover-card"
          style={{
            position: 'fixed',
            top: '70px',
            right: '20px',
            zIndex: 9998,
            width: '320px',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            padding: '16px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800 }}>Notifications</span>
            <button
              onClick={() => setShowNotifications(false)}
              style={{ background: 'transparent', border: 'none', color: 'inherit', opacity: 0.7, cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="popover-item" style={{ padding: '10px', borderRadius: '10px', fontSize: '12px' }}>
              🎉 <strong>Bienvenue sur Afri'Ka !</strong> Votre session est chiffrée et synchronisée.
            </div>
            <div className="popover-item" style={{ padding: '10px', borderRadius: '10px', fontSize: '12px' }}>
              🌱 <strong>Nouveau jalon</strong> atteint sur le projet AgriTech Kivu.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const drawerItemBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '12px 14px',
  borderRadius: '12px',
  background: 'transparent',
  border: 'none',
  fontSize: '14px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: 'background 0.2s ease, transform 0.15s ease',
};

