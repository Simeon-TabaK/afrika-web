import type { CertificationType } from '../types';

export interface SubGroupModel {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

export interface ThreadPostModel {
  id: string;
  authorName: string;
  authorCertification: CertificationType;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface ThreadModel {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorCertification: CertificationType;
  postsCount: number;
  createdAt: string;
  posts: ThreadPostModel[];
}

export interface ForumModel {
  id: string;
  title: string;
  communityId: string;
  communityName: string;
  subgroupId: string;
  subgroupName: string;
  threadsCount: number;
  postsCount: number;
  authorName: string;
  authorCertification: CertificationType;
  lastActivity: string;
  threads: ThreadModel[];
}

export interface CommunityModel {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: string;
  membersCount: number;
  subgroups: SubGroupModel[];
  projectsCount: number;
  postsCount: number;
  forumsCount: number;
  isMember: boolean;
  createdAt: string;
}
