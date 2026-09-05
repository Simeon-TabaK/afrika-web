import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { UserRole, SupportedCurrency } from './types';
import { Navigation, type NavItemKey } from './components/Navigation';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';

// Client Views
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { CreateView } from './views/CreateView';
import { ProjectsView } from './views/ProjectsView';
import { MessagesView } from './views/MessagesView';
import { ProfileView } from './views/ProfileView';
import { AllProjectsView } from './views/AllProjectsView';
import { AllPostsView } from './views/AllPostsView';

// Dedicated Details Pages
import { ProjectDetailsView } from './views/ProjectDetailsView';
import { PostDetailsView } from './views/PostDetailsView';
import { CommunityDetailsView } from './views/CommunityDetailsView';

// Admin Views
import { OverviewDashboard } from './views/OverviewDashboard';
import { UsersAdminView } from './views/UsersAdminView';
import { CertifiedUsersAdminView } from './views/CertifiedUsersAdminView';
import { CommunitiesAdminView } from './views/CommunitiesAdminView';
import { ProjectsAdminView } from './views/ProjectsAdminView';
import { DonationsDashboard } from './views/DonationsDashboard';
import { KYCAdminView } from './views/KYCAdminView';
import { KYCClientView } from './views/KYCClientView';
import { ForumsAdminView } from './views/ForumsAdminView';
import { MarketplaceAdminView } from './views/MarketplaceAdminView';
import { StoriesAdminView } from './views/StoriesAdminView';
import { OpsHealthView } from './views/OpsHealthView';
import { HelpCenterView } from './views/HelpCenterView';
import { SettingsView } from './views/SettingsView';
import { AuthView } from './views/AuthView';
import { AuthService } from './services/authService';

import type { AuthUserProfile } from './models/auth';

export function App() {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<AuthUserProfile | null>(() => AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AuthService.isAuthenticated());
  const [currentRole, setCurrentRole] = useState<UserRole>(() => currentUser?.role || 'user');
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');
  const [activeItem, setActiveItem] = useState<NavItemKey>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Search & Filter Category for Mockup Alignment
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'projects' | 'communities'>('all');

  // Dedicated detail pages state
  const [selectedPost, setSelectedPost] = useState<{ id: string; data?: any } | null>(null);
  const [selectedProject, setSelectedProject] = useState<{ id: string; data?: any } | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<{ id: string; data?: any } | null>(null);

  const clearDetails = () => {
    setSelectedPost(null);
    setSelectedProject(null);
    setSelectedCommunity(null);
  };

  const handleNavigate = (item: NavItemKey) => {
    clearDetails();
    setActiveItem(item);
  };

  const handleRoleChange = (role: UserRole) => {
    clearDetails();
    setCurrentRole(role);
    if (role === 'user') {
      setActiveItem('home');
    } else if (role === 'donations_agent') {
      setActiveItem('donations');
    } else if (role === 'ops_agent') {
      setActiveItem('ops');
    } else if (role === 'communities_agent') {
      setActiveItem('communities_admin');
    } else if (role === 'marketing_agent') {
      setActiveItem('marketplace_admin');
    } else {
      setActiveItem('overview');
    }
  };

  const getPageTitle = (): string => {
    if (selectedProject) return selectedProject.data?.title || 'Détails du Projet';
    if (selectedPost) return selectedPost.data?.title || 'Détails de la Publication';
    if (selectedCommunity) return selectedCommunity.data?.name || 'Détails de la Communauté';

    if (activeItem === 'home' || activeItem === 'discover') {
      return t('trending_discover'); // "Tendance et Projets à découvrir"
    }
    switch (activeItem) {
      case 'create': return t('create_initiative');
      case 'projects': return `${t('projects')} & ${t('crowdfunding')}`;
      case 'messages': return `${t('messages')} & ${t('community_forums')}`;
      case 'profile': return t('profile');
      case 'overview': return t('overview');
      case 'users_admin': return t('users_admin');
      case 'certified_users_admin': return t('certified_users_admin');
      case 'communities_admin': return t('communities_admin');
      case 'forums_admin': return t('forums_admin_title');
      case 'projects_admin': return t('projects_admin');
      case 'donations': return t('donations');
      case 'kyc_admin': return t('kyc_admin');
      case 'kyc_client': return t('kyc_client');
      case 'marketplace_admin': return t('marketplace');
      case 'stories_admin': return t('stories');
      case 'ops': return t('ops');
      case 'settings': return t('settings_title');
      case 'auth': return t('auth_title');
      case 'all_projects': return 'Tout les projets';
      case 'all_posts': return 'Publications & Nouveautés';
      case 'help': return t('help');
      default: return t(activeItem);
    }
  };

  const handleAuthSuccess = (user: AuthUserProfile, role: UserRole) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setCurrentRole(role);
    clearDetails();
    if (role === 'super_admin') {
      setActiveItem('overview');
    } else if (role === 'donations_agent') {
      setActiveItem('donations');
    } else if (role === 'communities_agent') {
      setActiveItem('communities_admin');
    } else if (role === 'marketing_agent') {
      setActiveItem('marketplace_admin');
    } else if (role === 'ops_agent') {
      setActiveItem('ops');
    } else {
      setActiveItem('home');
    }
  };

  const handleLogout = () => {
    AuthService.clearSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
    clearDetails();
    setActiveItem('home');
  };

  if (!isAuthenticated) {
    return <AuthView onAuthSuccess={handleAuthSuccess} />;
  }

  const isShowingDetails = !!(selectedProject || selectedPost || selectedCommunity);
  const isClientFeedView = !isShowingDetails && ['home', 'discover', 'all_projects', 'all_posts'].includes(activeItem);

  return (
    <div
      className={`app-container ${currentRole !== 'user' ? 'admin-mode' : ''} ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dual Sticky Headers pinned at top */}
      <Header
        currentRole={currentRole}
        user={currentUser}
        title={getPageTitle()}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => {
          if (filterCategory === 'all') setFilterCategory('projects');
          else if (filterCategory === 'projects') setFilterCategory('communities');
          else setFilterCategory('all');
        }}
      />

      {/* Main Layout Area below the pinned headers */}
      <div
        className="app-main-layout"
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          padding: '0 24px 40px 16px',
          gap: '24px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: Transparent Sidebar Navigation */}
        <Navigation
          currentRole={currentRole}
          user={currentUser}
          activeItem={activeItem}
          isOpen={isSidebarOpen}
          onNavigate={handleNavigate}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />

        {/* Center: Dedicated Content Page or Feed Area */}
        <main
          className="page-body"
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: isShowingDetails
              ? '960px'
              : activeItem === 'home'
              ? '100%'
              : isClientFeedView
              ? '740px'
              : '100%',
            margin: (isShowingDetails || isClientFeedView) ? '0 auto' : '0',
            padding: '0',
          }}
        >
          {/* =========================================================================
              DEDICATED FULL-PAGE DETAILS (Projet, Post, Community dans leur page respectif)
              ========================================================================= */}
          {selectedProject && (
            <ProjectDetailsView
              id={selectedProject.id}
              projectData={selectedProject.data}
              onBack={() => setSelectedProject(null)}
            />
          )}

          {selectedPost && (
            <PostDetailsView
              id={selectedPost.id}
              postData={selectedPost.data}
              onBack={() => setSelectedPost(null)}
            />
          )}

          {selectedCommunity && (
            <CommunityDetailsView
              id={selectedCommunity.id}
              communityData={selectedCommunity.data}
              onBack={() => setSelectedCommunity(null)}
            />
          )}

          {/* Regular Client Views (When not viewing details) */}
          {!isShowingDetails && (
            <>
              {activeItem === 'home' && (
                <HomeView
                  currency={currency}
                  onNavigateToCreate={() => setActiveItem('create')}
                  onNavigateToProjects={() => setActiveItem('projects')}
                  onNavigateToAllProjects={() => setActiveItem('all_projects')}
                  onNavigateToAllPosts={() => setActiveItem('all_posts')}
                  onSelectPost={(id, data) => setSelectedPost({ id, data })}
                  onSelectProject={(id, data) => setSelectedProject({ id, data })}
                  filterCategory={filterCategory}
                  onSelectFilterCategory={setFilterCategory}
                  searchQuery={searchQuery}
                />
              )}
              {activeItem === 'discover' && (
                <DiscoverView
                  currency={currency}
                  onSelectProject={(id, data) => setSelectedProject({ id, data })}
                  onSelectCommunity={(id, data) => setSelectedCommunity({ id, data })}
                  filterCategory={filterCategory}
                  searchQuery={searchQuery}
                />
              )}
              {activeItem === 'all_projects' && (
                <AllProjectsView
                  currency={currency}
                  onBack={() => setActiveItem('home')}
                  onNavigateToCreate={() => setActiveItem('create')}
                  onSelectProject={(id, data) => setSelectedProject({ id, data })}
                />
              )}
              {activeItem === 'all_posts' && (
                <AllPostsView
                  onBack={() => setActiveItem('home')}
                  onNavigateToCreate={() => setActiveItem('create')}
                  onSelectPost={(id, data) => setSelectedPost({ id, data })}
                />
              )}
              {activeItem === 'create' && <CreateView />}
              {activeItem === 'projects' && (
                <ProjectsView
                  currency={currency}
                  onSelectProject={(id, data) => setSelectedProject({ id, data })}
                  onNavigateToCreate={() => setActiveItem('create')}
                  onNavigateToAll={() => setActiveItem('all_projects')}
                />
              )}
              {activeItem === 'messages' && <MessagesView />}
              {activeItem === 'profile' && (
                <ProfileView onNavigateToKYC={() => setActiveItem('kyc_client')} />
              )}

              {/* Admin views */}
              {activeItem === 'overview' && <OverviewDashboard currency={currency} />}
              {activeItem === 'users_admin' && <UsersAdminView />}
              {activeItem === 'certified_users_admin' && <CertifiedUsersAdminView currentRole={currentRole} />}
              {activeItem === 'communities_admin' && <CommunitiesAdminView />}
              {activeItem === 'forums_admin' && <ForumsAdminView />}
              {activeItem === 'projects_admin' && <ProjectsAdminView currency={currency} />}
              {activeItem === 'donations' && <DonationsDashboard currency={currency} />}
              {activeItem === 'kyc_admin' && <KYCAdminView />}
              {activeItem === 'kyc_client' && <KYCClientView currency={currency} />}
              {activeItem === 'marketplace_admin' && <MarketplaceAdminView currency={currency} />}
              {activeItem === 'stories_admin' && <StoriesAdminView />}
              {activeItem === 'ops' && <OpsHealthView />}
              {activeItem === 'settings' && (
                <SettingsView
                  currentRole={currentRole}
                  onRoleChange={handleRoleChange}
                  currency={currency}
                  onCurrencyChange={setCurrency}
                />
              )}
              {activeItem === 'help' && <HelpCenterView />}
            </>
          )}
        </main>

        {/* Right: Vertical Filter Pill Column (Tous, Projets, Communauté) */}
        {isClientFeedView && activeItem !== 'home' && (
          <aside
            className="right-filters-column"
            style={{
              width: '160px',
              minWidth: '160px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              position: 'sticky',
              top: '160px',
              height: 'fit-content',
            }}
          >
            {/* Filter 1: Tous */}
            <button
              onClick={() => setFilterCategory('all')}
              style={{
                background: filterCategory === 'all' ? '#F0BA31' : '#FFFFFF',
                color: filterCategory === 'all' ? '#1E293B' : '#64748B',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '9999px',
                padding: '13px 20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: filterCategory === 'all'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {t('all')}
            </button>

            {/* Filter 2: Projets */}
            <button
              onClick={() => setFilterCategory('projects')}
              style={{
                background: filterCategory === 'projects' ? '#F0BA31' : '#FFFFFF',
                color: filterCategory === 'projects' ? '#1E293B' : '#64748B',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '9999px',
                padding: '13px 20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: filterCategory === 'projects'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {t('projects')}
            </button>

            {/* Filter 3: Communauté */}
            <button
              onClick={() => setFilterCategory('communities')}
              style={{
                background: filterCategory === 'communities' ? '#F0BA31' : '#FFFFFF',
                color: filterCategory === 'communities' ? '#1E293B' : '#64748B',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '9999px',
                padding: '13px 20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: filterCategory === 'communities'
                  ? '0 6px 16px rgba(240, 186, 49, 0.35)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {t('community_tag')}
            </button>
          </aside>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar (Phone Mode) */}
      {currentRole === 'user' && (
        <MobileBottomNav
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
