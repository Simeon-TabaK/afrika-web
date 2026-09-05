import type { UserRole, CertificationType } from '../types';

export interface LoginOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface SocialAuthRequest {
  token: string;
  provider: 'google' | 'apple';
}

export interface AuthTokens {
  access: string;
  refresh: string;
  has_profile?: boolean;
}

export interface AuthUserProfile {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  certification: CertificationType;
  avatar?: string;
  has_profile: boolean;
}
