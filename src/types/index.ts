export type UserRole = 
  | 'super_admin'
  | 'donations_agent'
  | 'communities_agent'
  | 'ops_agent'
  | 'marketing_agent'
  | 'user';

export type CertificationType = 
  | 'none'
  | 'donor'
  | 'entrepreneur'
  | 'public_figure'
  | 'organization';

export interface CertificationConfig {
  type: CertificationType;
  label: string;
  symbol: string;
  color: string;
  colorName: string;
  description: string;
}

export const CERTIFICATION_CONFIGS: Record<CertificationType, CertificationConfig> = {
  none: {
    type: 'none',
    label: 'Non certifié',
    symbol: '•',
    color: '#9E9E9E',
    colorName: 'Gris / Neutre',
    description: 'Utilisateur standard',
  },
  donor: {
    type: 'donor',
    label: 'Donateur',
    symbol: '★',
    color: '#2196F3',
    colorName: 'Bleu',
    description: 'Membre contributeur / donateur régulier',
  },
  entrepreneur: {
    type: 'entrepreneur',
    label: 'Entrepreneur',
    symbol: '★',
    color: '#4CAF50',
    colorName: 'Vert',
    description: 'Porteur de projet / entrepreneur / business',
  },
  public_figure: {
    type: 'public_figure',
    label: 'Personnalité Publique',
    symbol: '★',
    color: '#FFD700',
    colorName: 'Or / Jaune',
    description: 'Influenceur, artiste, leader d’opinion',
  },
  organization: {
    type: 'organization',
    label: 'Organisation / ONG',
    symbol: '★',
    color: '#9C27B0',
    colorName: 'Violet',
    description: 'Association, ONG, institution, entreprise',
  },
};

export type SupportedCurrency = 'USD' | 'EUR' | 'CDF' | 'XAF' | 'XOF' | 'RWF' | 'KES' | 'NGN' | 'ZAR';

export interface ExchangeRateMap {
  [currency: string]: number;
}

export interface Transaction {
  id: string;
  reference: string;
  donor_name: string;
  donor_email: string;
  donor_certification_type?: CertificationType;
  purpose: 'donation' | 'certification' | 'marketplace' | 'general';
  amount_charged: number;
  currency_charged: SupportedCurrency;
  amount_base: number;
  currency_base: string;
  payment_method: 'stripe' | 'paypal' | 'mobile_money';
  payment_provider: string;
  status: 'succeeded' | 'pending' | 'failed';
  created_at: string;
}

export interface KYCRequest {
  id: string;
  user_id: number | string;
  user_name: string;
  user_email: string;
  certification_type: CertificationType;
  target_badge_color?: string;
  target_badge_symbol?: string;
  target_badge_label?: string;
  id_document_type: 'passport' | 'national_id' | 'driver_license' | 'business_license';
  document_url: string;
  fee_amount: number;
  fee_currency: SupportedCurrency;
  status: 'draft' | 'pending_payment' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunitySubgroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  item_count: number;
  icon_name: string;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  dokploy_cluster: string;
  containers: {
    name: string;
    image: string;
    status: 'running' | 'stopped';
    cpu: string;
    memory: string;
  }[];
  services: {
    name: string;
    status: 'operational' | 'incident';
    latency: string;
  }[];
}
