import { API_BASE_URL } from './api';
import type { ProjectModel, MilestoneModel } from '../models/project';

export class ProjectService {
  private static token = () => localStorage.getItem('afrika_token');

  static async getProjects(): Promise<ProjectModel[]> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/projects/`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data).map((p: any) => ({
          id: p.id,
          ownerId: p.owner?.id || p.owner_id || 'u_owner',
          ownerFirstName: p.owner?.first_name || p.owner_first_name || 'Initiateur',
          ownerLastName: p.owner?.last_name || p.owner_last_name || '',
          ownerImage: p.owner?.image || p.owner_image,
          ownerCertification: p.owner?.certification || 'entrepreneur',
          communityId: p.community?.id || p.community_id,
          communityName: p.community?.name || p.community_name,
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          objectives: p.objectives,
          image: p.image,
          location: p.location || 'Kinshasa, RDC',
          scope: p.scope || 'national',
          status: p.status || 'ongoing',
          goalAmount: Number(p.goal_amount || p.target_amount || 10000),
          raisedAmount: Number(p.raised_amount || 0),
          currency: p.currency || 'USD',
          createdAt: p.created_at || new Date().toISOString(),
          likesCount: p.likes_count || 0,
          followerCount: p.follower_count || 0,
          likedByMe: p.liked_by_me || false,
          donationsCount: p.donations_count || 0,
          membersCount: p.members_count || 0,
          milestones: (p.milestones || []).map((m: any, idx: number): MilestoneModel => ({
            id: m.id || `m_${idx}`,
            projectId: p.id,
            title: m.title || `Jalon ${idx + 1}`,
            description: m.description || '',
            targetAmount: Number(m.target_amount || 0),
            currentAmount: Number(m.current_amount || 0),
            dueDate: m.due_date || '',
            isCompleted: Boolean(m.is_completed),
            order: m.order || idx + 1,
          })),
        }));
      }
    } catch {
      // Handled via fallback
    }
    return [];
  }

  static async donateToProject(projectId: string, amount: number, currency: string): Promise<boolean> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/donations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ project: projectId, amount, currency }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  static async createProject(projectData: {
    title: string;
    subtitle?: string;
    description: string;
    goalAmount: number;
    currency: string;
    location?: string;
    image?: string;
    milestones?: Array<{ title: string; targetAmount: number }>;
  }): Promise<boolean> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: projectData.title,
          subtitle: projectData.subtitle || '',
          description: projectData.description,
          goal_amount: projectData.goalAmount,
          currency: projectData.currency,
          location: projectData.location || 'Kinshasa, RDC',
          image: projectData.image || '',
          milestones: projectData.milestones || [],
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
