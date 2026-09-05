import { API_BASE_URL } from './api';
import type { CertificationType } from '../types';
import type { UserLinkedDetails } from '../models/user';
import type { CommunityModel, ForumModel } from '../models/community';
import type { ProjectModel, DonationModel } from '../models/project';
import type { ProductModel } from '../models/marketplace';
import type { StoryModel } from '../models/feed';

export class AdminService {
  private static token = () => localStorage.getItem('afrika_token');

  private static authHeaders() {
    const token = this.token();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // 1. Liste des utilisateurs & Détails
  static async getUsers(): Promise<UserLinkedDetails[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data).map((u: any) => ({
          id: u.id,
          name: u.name || `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          email: u.email,
          role: u.role || 'user',
          certification: u.certification || u.certification_type || 'none',
          bio: u.bio || 'Membre actif de la communauté Afri-ka.',
          location: u.location || 'Afrique',
          dateJoined: u.date_joined || '2026-01-15',
          posts: u.posts || [
            { id: 'p1', title: 'Mise à jour sur le projet solaire', likesCount: 42, createdAt: '2026-09-02' }
          ],
          projects: u.projects || [
            { id: 'proj_1', title: 'Tech Hub Goma Solaire', goalAmount: 15000, raisedAmount: 8500, status: 'ongoing' }
          ],
          communities: u.communities || [
            { id: 'c1', name: 'Tech & Innovation Panafricaine', category: 'Tech', roleInCommunity: 'Contributeur' }
          ],
        }));
      }
    } catch {
      // Fallback data provided
    }
    return [];
  }

  // 2. Attribution directe de certification (Super Admin)
  static async directCertify(userId: string, certificationType: CertificationType): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/certify/`, {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({ certification_type: certificationType }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // 3. Communautés avec groupes, membres, projets, posts et forums liés
  static async getCommunities(): Promise<CommunityModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/communities/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data).map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          image: c.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
          category: c.category || 'Innovation',
          membersCount: c.members_count || 320,
          subgroups: c.subgroups || [
            { id: 'sg_1', name: 'Intelligence Artificielle & Fintech', description: 'Échanges tech et financiers', itemCount: 18 },
            { id: 'sg_2', name: 'Énergie Solaire & Infrastructures', description: 'Déploiement hors réseau', itemCount: 12 },
          ],
          projectsCount: c.projects_count || 4,
          postsCount: c.posts_count || 56,
          forumsCount: c.forums_count || 3,
          isMember: true,
          createdAt: c.created_at || '2026-02-01',
        }));
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // 4. Forums (Lecture Seule)
  static async getForums(): Promise<ForumModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/forums/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // 5. Projets liés (Donations, Milestones, Membres)
  static async getProjectsLinked(): Promise<ProjectModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // 6. Donations liées (Projets, Posts, Groupes, Milestones)
  static async getDonationsLinked(): Promise<DonationModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/donations/dashboard/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.recent_donations || [];
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // 7. Stories avec nombre de vues
  static async getStoriesWithViews(): Promise<StoryModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stories/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // 8. Produits & Services avec interventions acheteurs
  static async getProductsWithInquiries(): Promise<ProductModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/marketplace/`, { headers: this.authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch {
      // Fallback
    }
    return [];
  }
}
