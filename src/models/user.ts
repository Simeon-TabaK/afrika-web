import type { CertificationType, UserRole } from '../types';

export interface UserLinkedDetails {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  certification: CertificationType;
  bio?: string;
  location?: string;
  dateJoined: string;
  posts: Array<{ id: string; title: string; likesCount: number; createdAt: string }>;
  projects: Array<{ id: string; title: string; goalAmount: number; raisedAmount: number; status: string }>;
  communities: Array<{ id: string; name: string; category: string; roleInCommunity: string }>;
}
