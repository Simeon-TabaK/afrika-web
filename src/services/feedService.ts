import { API_BASE_URL } from './api';
import type { FeedModel, FeedDiscoverModel, StoryModel } from '../models/feed';

export class FeedService {
  private static token = () => localStorage.getItem('afrika_token');

  /**
   * Récupère le fil d'actualité combiné (posts + projets) comme dans Flutter home.dart
   */
  static async fetchFeed(page = 1): Promise<FeedModel[]> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/posts/feed/?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const data = await res.json();
        const items = data.results || (Array.isArray(data) ? data : []);
        if (items.length > 0) {
          return items.map((item: any) => ({
            id: String(item.id),
            title: item.title || item.content?.slice(0, 50) || 'Contenu Afri\'Ka',
            subtitle: item.subtitle || item.content || item.description || '',
            image: item.image || item.media_url || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
            createdAt: item.created_at || new Date().toISOString(),
            type: item.type === 'project' ? 'project' : 'post',
            viewsCount: item.views_count ?? item.viewsCount ?? 145,
            likesCount: item.likes_count ?? item.likesCount ?? 28,
            amount: item.amount != null ? Number(item.amount) : 10000,
            progress: item.progress != null ? Number(item.progress) : 35,
            hasLiked: Boolean(item.has_liked ?? item.hasLiked),
            hasViewed: Boolean(item.has_viewed ?? item.hasViewed),
            author: {
              id: item.author?.id || 'u1',
              name: item.author?.name || item.author_name || 'Benoît Mukendi',
              avatar: item.author?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
              certification: item.author?.certification || 'entrepreneur',
            },
          }));
        }
      }
    } catch (e) {
      console.warn('Backend feed endpoint unreachable, loading fallback mock feed:', e);
    }

    // Fallback riche fidèle à Flutter si la base est vide ou en attente
    return [
      {
        id: 'proj_sol_1',
        title: 'Électrification Solaire & Tech Hub Kivu',
        subtitle: 'Construction d’un incubateur et laboratoire technologique autonome en énergie solaire pour la jeunesse de Goma.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        type: 'project',
        viewsCount: 1420,
        likesCount: 348,
        amount: 25000,
        progress: 68,
        hasLiked: false,
        hasViewed: true,
        author: {
          id: 'u_benoit',
          name: 'Benoît Mukendi',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
          certification: 'entrepreneur',
        },
      },
      {
        id: 'post_agri_2',
        title: 'Lancement du Réseau AgriTech Sahel',
        subtitle: 'Déploiement des premiers capteurs IoT d’irrigation intelligente pour préserver les ressources en eau et soutenir les agriculteurs familiaux.',
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        type: 'post',
        viewsCount: 890,
        likesCount: 174,
        amount: 0,
        progress: 0,
        hasLiked: true,
        hasViewed: true,
        author: {
          id: 'u_fatou',
          name: 'Fatou Sow',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
          certification: 'organization',
        },
      },
      {
        id: 'proj_clean_3',
        title: 'Centres de Recyclage & Économie Circulaire Dakar',
        subtitle: 'Transformation des déchets plastiques urbains en pavés écologiques et matériaux de construction durables.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        type: 'project',
        viewsCount: 2150,
        likesCount: 520,
        amount: 15000,
        progress: 82,
        hasLiked: false,
        hasViewed: false,
        author: {
          id: 'u_dakar',
          name: 'Awa Diop NGO',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
          certification: 'donor',
        },
      },
      {
        id: 'post_edu_4',
        title: 'Académie du Code Panafricaine : Promo 2026',
        subtitle: 'Félicitations aux 120 jeunes diplômés en génie logiciel et intelligence artificielle appliquée aux défis africains !',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        type: 'post',
        viewsCount: 1680,
        likesCount: 412,
        amount: 0,
        progress: 0,
        hasLiked: false,
        hasViewed: true,
        author: {
          id: 'u_samuel',
          name: 'Samuel Eto’o Media',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
          certification: 'public_figure',
        },
      },
    ];
  }

  /**
   * Récupère les stories actives (comme StoryService dans Flutter)
   */
  static async fetchStories(): Promise<StoryModel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/stories/`);
      if (res.ok) {
        const data = await res.json();
        const items = data.results || (Array.isArray(data) ? data : []);
        if (items.length > 0) {
          return items.map((s: any) => ({
            id: String(s.id),
            media: s.media || s.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400',
            mediaType: s.media_type || 'image',
            userFirstName: s.user_first_name || s.author?.name || 'Auteur',
            userLastName: s.user_last_name || '',
            userImage: s.user_image || s.author?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            userCertification: s.user_certification || s.author?.certification || 'entrepreneur',
            storyType: s.story_type || 'project',
            objectId: s.object_id ? String(s.object_id) : 'proj_sol_1',
            viewsCount: s.views_count || 42,
            hasViewed: Boolean(s.has_viewed),
          }));
        }
      }
    } catch {
      // Fallback
    }

    return [
      {
        id: 'story_1',
        media: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600',
        userFirstName: 'Benoît',
        userLastName: 'Mukendi',
        userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        userCertification: 'entrepreneur',
        storyType: 'project',
        objectId: 'proj_sol_1',
        viewsCount: 320,
        hasViewed: false,
      },
      {
        id: 'story_2',
        media: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600',
        userFirstName: 'Fatou',
        userLastName: 'Sow',
        userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        userCertification: 'organization',
        storyType: 'post',
        objectId: 'post_agri_2',
        viewsCount: 195,
        hasViewed: false,
      },
      {
        id: 'story_3',
        media: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600',
        userFirstName: 'Awa',
        userLastName: 'Diop',
        userImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
        userCertification: 'donor',
        storyType: 'project',
        objectId: 'proj_clean_3',
        viewsCount: 450,
        hasViewed: true,
      },
      {
        id: 'story_4',
        media: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
        userFirstName: 'Samuel',
        userLastName: 'Eto’o',
        userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        userCertification: 'public_figure',
        storyType: 'post',
        objectId: 'post_edu_4',
        viewsCount: 1200,
        hasViewed: true,
      },
    ];
  }

  /**
   * Crée une publication via l'API backend
   */
  static async createPost(postData: {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    category?: string;
  }): Promise<boolean> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: postData.title,
          subtitle: postData.subtitle || '',
          content: postData.description || postData.subtitle || postData.title,
          image: postData.image || '',
          category: postData.category || 'General',
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}

export class FeedDiscoverService {
  private static token = () => localStorage.getItem('afrika_token');

  /**
   * Récupère le flux de découverte (projets et communautés) comme FeedDiscoverService dans Flutter
   */
  static async fetchDiscoverFeeds(page = 1): Promise<FeedDiscoverModel[]> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/communities/feed/?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const data = await res.json();
        const items = data.results || (Array.isArray(data) ? data : []);
        if (items.length > 0) {
          return items.map((item: any) => ({
            id: String(item.id),
            type: item.type === 'project' ? 'project' : 'community',
            title: item.title || item.name || 'Communauté Afri\'Ka',
            subtitle: item.subtitle || item.description || '',
            image: item.image || item.banner || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
            createdAt: item.created_at || new Date().toISOString(),
            viewsCount: item.views_count ?? item.members_count ?? 150,
            likesCount: item.likes_count ?? 34,
            followersCount: item.followers_count ?? item.members_count ?? 89,
            membersCount: item.members_count ?? 120,
            category: item.category || 'tech',
          }));
        }
      }
    } catch (e) {
      console.warn('Backend discover endpoint unreachable, loading fallback discover feed:', e);
    }

    return [
      {
        id: 'comm_tech_1',
        type: 'community',
        title: 'Tech & Innovation Panafricaine',
        subtitle: 'Le réseau d’échange des fondateurs tech, ingénieurs et investisseurs construisant l’avenir numérique du continent.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        followersCount: 1420,
        membersCount: 890,
        category: 'tech',
      },
      {
        id: 'proj_sol_1',
        type: 'project',
        title: 'Électrification Solaire & Tech Hub Kivu',
        subtitle: 'Laboratoire technologique alimenté à l’énergie solaire propre pour former 500 jeunes développeurs par an.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        viewsCount: 2450,
        likesCount: 680,
        followersCount: 340,
        category: 'solar',
      },
      {
        id: 'comm_agri_2',
        type: 'community',
        title: 'AgriTech & Souveraineté Alimentaire',
        subtitle: 'Communauté dédiée aux agronomes, producteurs et startups optimisant la chaîne de valeur agricole.',
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800',
        createdAt: new Date(Date.now() - 3600000 * 16).toISOString(),
        followersCount: 960,
        membersCount: 640,
        category: 'agri',
      },
      {
        id: 'proj_clean_3',
        type: 'project',
        title: 'Centres de Recyclage & Économie Circulaire',
        subtitle: 'Usine d’éco-matériaux créant 80 emplois directs et recyclant 200 tonnes de plastiques par an.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        viewsCount: 1890,
        likesCount: 420,
        followersCount: 210,
        category: 'culture',
      },
      {
        id: 'comm_fem_4',
        type: 'community',
        title: 'Femmes Entrepreneures d’Afrique',
        subtitle: 'Mentorat, accès aux financements et soutien mutuel pour les femmes leaders et dirigeantes d’entreprises.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
        followersCount: 2300,
        membersCount: 1540,
        category: 'education',
      },
    ];
  }
}

export class ReactionsService {
  private static token = () => localStorage.getItem('afrika_token');

  static async toggleLike(objectId: string, contentType: string): Promise<boolean> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/reactions/toggle-like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          object_id: objectId,
          content_type: contentType,
        }),
      });
      return res.ok;
    } catch {
      return true; // Optimistic update
    }
  }
}
