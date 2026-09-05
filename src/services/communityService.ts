import { API_BASE_URL } from './api';

export interface CreateCommunityPayload {
  name: string;
  description: string;
  category?: string;
  location?: string;
  banner?: string;
  rules?: string;
}

export class CommunityService {
  private static token = () => localStorage.getItem('afrika_token');

  static async createCommunity(data: CreateCommunityPayload): Promise<boolean> {
    try {
      const token = this.token();
      const res = await fetch(`${API_BASE_URL}/communities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          category: data.category || 'general',
          location: data.location || 'Kinshasa, RDC',
          banner: data.banner || '',
          rules: data.rules || '',
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
