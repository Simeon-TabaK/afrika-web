import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Compass, Plus, MessageSquare, Coins } from 'lucide-react';
import type { NavItemKey } from './Navigation';

export interface MobileBottomNavProps {
  activeItem: NavItemKey;
  onNavigate: (item: NavItemKey) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeItem,
  onNavigate,
}) => {
  const { t } = useTranslation();

  const navItems = [
    { key: 'home' as NavItemKey, label: t('home'), icon: Home },
    { key: 'discover' as NavItemKey, label: t('discover'), icon: Compass },
    { key: 'create' as NavItemKey, label: '', icon: Plus, isSpecial: true },
    { key: 'messages' as NavItemKey, label: t('messages'), icon: MessageSquare },
    { key: 'projects' as NavItemKey, label: t('projects'), icon: Coins },
  ];

  return (
    <nav
      className="mobile-bottom-nav-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--color-primary-dark, #4A8A2A)',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'none', // Shown on mobile via CSS media query
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 9999,
        padding: '0 8px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.key;

        if (item.isSpecial) {
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              title={t('create')}
              style={{
                position: 'relative',
                top: '-12px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#FFFFFF',
                color: '#4A8A2A',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.15s ease',
              }}
            >
              <Plus size={26} strokeWidth={2.8} />
            </button>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavigate(item.key)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
              cursor: 'pointer',
              flex: 1,
              padding: '6px 0',
              transition: 'color 0.15s ease',
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.2px',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
