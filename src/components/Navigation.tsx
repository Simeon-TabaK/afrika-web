import { useState } from 'react';
import type { UserRole } from '../types';
import {
  Coins,
  BadgeCheck,
  Users,
  Server,
  HelpCircle,
  Settings as SettingsIcon,
  X,
  LogOut,
  Compass,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  User,
  Home,
  FileText,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { AuthUserProfile } from '../models/auth';

export type NavItemKey = 
  | 'home'
  | 'discover'
  | 'create'
  | 'projects'
  | 'messages'
  | 'profile'
  | 'overview'
  | 'users_admin'
  | 'certified_users_admin'
  | 'kyc_admin'
  | 'kyc_client'
  | 'donations'
  | 'communities_admin'
  | 'forums_admin'
  | 'projects_admin'
  | 'marketplace_admin'
  | 'stories_admin'
  | 'ops'
  | 'settings'
  | 'auth'
  | 'all_projects'
  | 'all_posts'
  | 'help';

interface NavigationProps {
  currentRole: UserRole;
  user?: AuthUserProfile | null;
  activeItem: NavItemKey;
  isOpen: boolean;
  onNavigate: (item: NavItemKey) => void;
  onClose: () => void;
  onLogout?: () => void;
}

export const Navigation = ({
  currentRole,
  user: _user,
  activeItem,
  isOpen,
  onNavigate,
  onClose,
  onLogout,
}: NavigationProps) => {
  const { t } = useTranslation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Permission logic based on user role
  const canAccess = (item: NavItemKey): boolean => {
    // Client role
    if (currentRole === 'user') {
      return ['home', 'discover', 'create', 'projects', 'messages', 'profile', 'donations', 'kyc_client', 'settings', 'auth', 'all_projects', 'all_posts', 'help'].includes(item);
    }
    // Super Admin has access to all admin items (NO client items like home, discover, create, projects, messages)
    if (currentRole === 'super_admin') {
      return ['overview', 'users_admin', 'certified_users_admin', 'communities_admin', 'forums_admin', 'projects_admin', 'donations', 'stories_admin', 'marketplace_admin', 'kyc_admin', 'ops', 'settings', 'help'].includes(item);
    }
    // Specialized Agents
    switch (item) {
      case 'overview':
      case 'settings':
      case 'auth':
      case 'help':
        return true;
      case 'donations':
        return currentRole === 'donations_agent';
      case 'projects_admin':
        return currentRole === 'donations_agent' || currentRole === 'marketing_agent';
      case 'communities_admin':
      case 'forums_admin':
        return currentRole === 'communities_agent';
      case 'marketplace_admin':
      case 'stories_admin':
        return currentRole === 'marketing_agent';
      case 'ops':
      case 'kyc_admin':
        return currentRole === 'ops_agent';
      case 'users_admin':
        return currentRole === 'ops_agent';
      default:
        return false;
    }
  };

  const clientNavItems = [
    // Client items - 5 items matching mockup
    { key: 'home' as NavItemKey, label: t('home'), icon: Home },
    { key: 'discover' as NavItemKey, label: t('discover'), icon: Compass },
    { key: 'create' as NavItemKey, label: t('create'), icon: PlusCircle },
    { key: 'messages' as NavItemKey, label: t('messages'), icon: MessageSquare },
    { key: 'projects' as NavItemKey, label: t('projects'), icon: FileText },

    // Client items - Secondaires
    { key: 'profile' as NavItemKey, label: t('profile'), icon: User },
    { key: 'donations' as NavItemKey, label: t('my_donations'), icon: Coins },
    { key: 'kyc_client' as NavItemKey, label: t('kyc_client'), icon: ShieldCheck },
    { key: 'settings' as NavItemKey, label: t('settings'), icon: SettingsIcon },
    { key: 'help' as NavItemKey, label: t('help'), icon: HelpCircle },
  ];

  const adminNavItems = [
    // Admin items - strictly starting with overview (Vue d'ensemble)
    { key: 'overview' as NavItemKey, label: t('overview'), icon: Home },
    { key: 'users_admin' as NavItemKey, label: t('users_admin'), icon: Users },
    { key: 'certified_users_admin' as NavItemKey, label: t('certified_users_admin'), icon: BadgeCheck },
    { key: 'communities_admin' as NavItemKey, label: t('communities_admin'), icon: Users },
    { key: 'forums_admin' as NavItemKey, label: `${t('forums')} (Audit)`, icon: HelpCircle },
    { key: 'projects_admin' as NavItemKey, label: t('projects_admin'), icon: Coins },
    { key: 'donations' as NavItemKey, label: t('donations'), icon: Coins },
    { key: 'stories_admin' as NavItemKey, label: t('stories'), icon: BadgeCheck },
    { key: 'marketplace_admin' as NavItemKey, label: t('marketplace'), icon: Coins },
    { key: 'kyc_admin' as NavItemKey, label: t('kyc_admin'), icon: BadgeCheck },
    { key: 'ops' as NavItemKey, label: t('ops'), icon: Server },
    { key: 'settings' as NavItemKey, label: t('settings'), icon: SettingsIcon },
    { key: 'help' as NavItemKey, label: t('help'), icon: HelpCircle },
  ];

  const navItems = currentRole === 'user' ? clientNavItems : adminNavItems;
  const visibleItems = navItems.filter((it) => canAccess(it.key));

  // Partition for simple users: 5 primary items matching the mockup
  const userPrimaryKeys: NavItemKey[] = ['home', 'discover', 'create', 'messages', 'projects'];
  const userPrimaryItems = visibleItems.filter((it) => userPrimaryKeys.includes(it.key));

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Desktop / Tablet Sidebar (Mockup faithful: transparent background, white text, pill active state) */}
      <aside
        className="desktop-sidebar mockup-sidebar"
        style={{
          width: '240px',
          minWidth: '240px',
          background: 'transparent',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '8px 16px 24px 16px',
          height: 'calc(100vh - 145px)',
          position: 'sticky',
          top: '135px',
          alignSelf: 'flex-start',
          zIndex: 40,
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* Top: Brand Logo + "Afri'Ka" and Close Button on the SAME line */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 4px 14px 4px',
              marginBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/afrikalogoicon.png"
                alt="Afri'Ka"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.3px',
                }}
              >
                Afri'Ka
              </span>
            </div>

            <button
              onClick={onClose}
              title="Fermer"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <X size={20} color="#FFFFFF" strokeWidth={2.4} />
            </button>
          </div>

          {/* Nav Items List */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentRole === 'user' ? (
              userPrimaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '11px 18px',
                      borderRadius: '12px',
                      border: isActive
                        ? '1.5px solid rgba(255, 255, 255, 0.45)'
                        : '1.5px solid transparent',
                      background: isActive
                        ? 'rgba(255, 255, 255, 0.18)'
                        : 'transparent',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                      fontSize: '16px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                      }
                    }}
                  >
                    <Icon size={20} color="#FFFFFF" strokeWidth={isActive ? 2.4 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })
            ) : (
              visibleItems.filter(it => it.key !== 'help' && it.key !== 'auth').map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '11px 18px',
                      borderRadius: '12px',
                      border: isActive
                        ? '1.5px solid rgba(255, 255, 255, 0.45)'
                        : '1.5px solid transparent',
                      background: isActive
                        ? 'rgba(255, 255, 255, 0.18)'
                        : 'transparent',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                      fontSize: '15px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={19} color="#FFFFFF" strokeWidth={isActive ? 2.4 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })
            )}
          </nav>
        </div>

        {/* Bottom Actions: Aide & Déconnexion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '16px' }}>
          <button
            onClick={() => onNavigate('help')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
            }}
          >
            <HelpCircle size={19} color="#FFFFFF" strokeWidth={1.8} />
            <span>{t('help')}</span>
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
            }}
          >
            <LogOut size={19} color="#FFFFFF" strokeWidth={1.8} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Confirmation Dialog Modal for Logout */}
      {showLogoutModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="afrika-confirm-dialog"
            style={{
              borderRadius: '22px',
              padding: '30px 24px',
              maxWidth: '440px',
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
                margin: '0 auto 16px auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <LogOut size={26} strokeWidth={2.5} />
            </div>

            <h3
              style={{
                fontSize: '19px',
                fontWeight: 800,
                margin: '0 0 10px 0',
              }}
            >
              {t('logout_confirm_title')}
            </h3>

            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.5',
                margin: '0 0 24px 0',
                opacity: 0.92,
              }}
            >
              {t('logout_confirm_message')}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                className="afrika-dialog-cancel-btn"
                onClick={() => setShowLogoutModal(false)}
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
                  setShowLogoutModal(false);
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
    </>
  );
};
