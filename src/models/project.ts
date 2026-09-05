import type { CertificationType, SupportedCurrency } from '../types';

export interface MilestoneModel {
  id: string;
  projectId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  isCompleted: boolean;
  order: number;
}

export interface DonationModel {
  id: string;
  projectId: string;
  projectTitle: string;
  donorName: string;
  donorEmail: string;
  donorCertification: CertificationType;
  amount: number;
  currency: SupportedCurrency;
  gateway: 'stripe' | 'paypal' | 'pawapay' | 'mobile_money';
  status: 'completed' | 'pending' | 'failed';
  isAnonymous: boolean;
  milestoneTitle?: string;
  groupName?: string;
  postTitle?: string;
  createdAt: string;
}

export interface ProjectModel {
  id: string;
  ownerId: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerImage?: string;
  ownerCertification: CertificationType;
  communityId?: string;
  communityName?: string;
  subgroupId?: string;
  subgroupName?: string;
  title: string;
  subtitle?: string;
  description: string;
  objectives?: string;
  image?: string;
  location?: string;
  beneficiaries?: string;
  impactArea?: string;
  scope: 'local' | 'regional' | 'national' | 'international';
  status: 'planned' | 'ongoing' | 'completed' | 'suspended';
  goalAmount: number;
  raisedAmount: number;
  currency: SupportedCurrency;
  deadline?: string;
  createdAt: string;
  likesCount: number;
  followerCount: number;
  likedByMe: boolean;
  milestones: MilestoneModel[];
  donationsCount: number;
  membersCount: number;
}
