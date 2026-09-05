import type { CertificationType } from '../types';

export interface FeedModel {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  createdAt: string;
  type: 'post' | 'project' | string;
  viewsCount: number;
  likesCount: number;
  commentsCount?: number;
  sharesCount?: number;
  amount?: number; // spécifique aux projets
  progress?: number; // pourcentage atteint
  hasLiked: boolean;
  hasViewed: boolean;
  author?: {
    id: string;
    name: string;
    avatar?: string;
    certification?: CertificationType;
  };
}

export interface FeedDiscoverModel {
  id: string;
  type: 'project' | 'community' | string;
  title: string;
  subtitle?: string;
  image?: string;
  createdAt: string;
  viewsCount?: number; // présent si type === 'project'
  likesCount?: number; // présent si type === 'project'
  followersCount?: number; // présent si type === 'community'
  membersCount?: number;
  category?: string;
}

export interface StoryModel {
  id: string;
  title?: string;
  subtitle?: string;
  media: string;
  mediaType?: 'image' | 'video';
  userFirstName: string;
  userLastName?: string;
  userImage?: string;
  userCertification?: CertificationType;
  storyType?: 'project' | 'post' | string;
  objectId?: string;
  viewsCount: number;
  sharesCount?: number;
  hasViewed: boolean;
  expiresAt?: string;
  createdAt?: string;
}

export interface PostModel {
  id: string;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  authorCertification?: CertificationType;
  title?: string;
  subtitle?: string;
  content: string;
  mediaUrl?: string;
  image?: string;
  likesCount: number;
  commentsCount: number;
  viewsCount?: number;
  sharesCount: number;
  likedByMe: boolean;
  communityName?: string;
  createdAt: string;
}
