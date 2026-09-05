import type { SupportedCurrency, ExchangeRateMap, Transaction, KYCRequest, SystemHealth, CommunitySubgroup } from '../types';

const defaultHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
export const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${defaultHost}:8000/api/v1`;

// Default static rates against USD
export const DEFAULT_RATES: ExchangeRateMap = {
  USD: 1.0,
  EUR: 0.92,
  CDF: 2850.0,
  XAF: 610.0,
  XOF: 610.0,
  RWF: 1350.0,
  KES: 130.0,
  NGN: 1550.0,
  ZAR: 18.5,
};

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  USD: '$',
  EUR: '€',
  CDF: 'FC',
  XAF: 'FCFA',
  XOF: 'CFA',
  RWF: 'FRw',
  KES: 'KSh',
  NGN: '₦',
  ZAR: 'R',
};

export const convertCurrency = (
  amount: number,
  from: SupportedCurrency,
  to: SupportedCurrency,
  rates: ExchangeRateMap = DEFAULT_RATES
): number => {
  if (from === to) return amount;
  const rateFrom = rates[from] || 1.0;
  const rateTo = rates[to] || 1.0;
  // Convert from origin to USD, then USD to destination
  const inUSD = amount / rateFrom;
  const inTarget = inUSD * rateTo;
  return Math.round(inTarget * 100) / 100;
};

export const formatCurrency = (amount: number, currency: SupportedCurrency): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: ['CDF', 'XAF', 'XOF', 'RWF', 'NGN'].includes(currency) ? 0 : 2,
    minimumFractionDigits: ['CDF', 'XAF', 'XOF', 'RWF', 'NGN'].includes(currency) ? 0 : 2,
  }).format(amount);
  return `${formatted} ${symbol}`;
};

// Mock Initial Data
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    reference: 'DON-2026-0081',
    donor_name: 'Amara Diallo',
    donor_email: 'amara@example.com',
    purpose: 'donation',
    amount_charged: 50.0,
    currency_charged: 'USD',
    amount_base: 50.0,
    currency_base: 'USD',
    payment_method: 'stripe',
    payment_provider: 'card_visa',
    status: 'succeeded',
    created_at: '2026-09-04 18:32',
  },
  {
    id: 'tx_02',
    reference: 'KYC-2026-0042',
    donor_name: 'Benoît Mukendi',
    donor_email: 'benoit.m@example.cd',
    purpose: 'certification',
    amount_charged: 28500.0,
    currency_charged: 'CDF',
    amount_base: 10.0,
    currency_base: 'USD',
    payment_method: 'mobile_money',
    payment_provider: 'pawapay_orange_cd',
    status: 'succeeded',
    created_at: '2026-09-04 17:15',
  },
  {
    id: 'tx_03',
    reference: 'DON-2026-0080',
    donor_name: 'Fatou Ndiaye',
    donor_email: 'fatou.n@example.sn',
    purpose: 'donation',
    amount_charged: 15000.0,
    currency_charged: 'XOF',
    amount_base: 24.59,
    currency_base: 'USD',
    payment_method: 'mobile_money',
    payment_provider: 'pawapay_wave_sn',
    status: 'succeeded',
    created_at: '2026-09-04 15:40',
  },
  {
    id: 'tx_04',
    reference: 'DON-2026-0079',
    donor_name: 'Jean-Pierre Laurent',
    donor_email: 'jp.laurent@example.fr',
    purpose: 'donation',
    amount_charged: 100.0,
    currency_charged: 'EUR',
    amount_base: 108.7,
    currency_base: 'USD',
    payment_method: 'paypal',
    payment_provider: 'paypal_express',
    status: 'succeeded',
    created_at: '2026-09-04 14:10',
  },
  {
    id: 'tx_05',
    reference: 'KYC-2026-0041',
    donor_name: 'Kagame Claudine',
    donor_email: 'claudine@example.rw',
    purpose: 'certification',
    amount_charged: 13500.0,
    currency_charged: 'RWF',
    amount_base: 10.0,
    currency_base: 'USD',
    payment_method: 'mobile_money',
    payment_provider: 'pawapay_mtn_rw',
    status: 'pending',
    created_at: '2026-09-04 12:05',
  },
];

export const MOCK_KYC_REQUESTS: KYCRequest[] = [
  {
    id: 'kyc_req_01',
    user_id: 101,
    user_name: 'Samuel Eto’o Media',
    user_email: 'samuel@cameroon.cm',
    certification_type: 'public_figure',
    id_document_type: 'passport',
    document_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600',
    fee_amount: 10.0,
    fee_currency: 'USD',
    status: 'under_review',
    created_at: '2026-09-04 09:30',
    updated_at: '2026-09-04 10:15',
  },
  {
    id: 'kyc_req_02',
    user_id: 102,
    user_name: 'Kinshasa Tech Hub',
    user_email: 'contact@kintech.cd',
    certification_type: 'entrepreneur',
    id_document_type: 'national_id',
    document_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
    fee_amount: 28500.0,
    fee_currency: 'CDF',
    status: 'submitted',
    created_at: '2026-09-04 11:20',
    updated_at: '2026-09-04 11:20',
  },
  {
    id: 'kyc_req_03',
    user_id: 103,
    user_name: 'Awa Diop NGO',
    user_email: 'contact@awadiop.org',
    certification_type: 'organization',
    id_document_type: 'passport',
    document_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600',
    fee_amount: 10.0,
    fee_currency: 'USD',
    status: 'approved',
    created_at: '2026-09-03 14:00',
    updated_at: '2026-09-03 16:30',
  },
];

export const MOCK_SUBGROUPS: CommunitySubgroup[] = [
  {
    id: 'sg_1',
    name: 'Discussions & Débats',
    slug: 'discussions',
    description: 'Échanges ouverts autour de projets panafricains et initiatives locales.',
    item_count: 142,
    icon_name: 'MessageSquare',
  },
  {
    id: 'sg_2',
    name: 'Événements & Meetups',
    slug: 'evenements',
    description: 'Webinaires, rassemblements en présentiel et ateliers.',
    item_count: 18,
    icon_name: 'Calendar',
  },
  {
    id: 'sg_3',
    name: 'Offres d’Emploi & Projets',
    slug: 'emplois',
    description: 'Opportunités professionnelles et partenariats communautaires.',
    item_count: 9,
    icon_name: 'Briefcase',
  },
  {
    id: 'sg_4',
    name: 'Produits & Services',
    slug: 'produits-services',
    description: 'Catalogue d’offres et prestations publiées par les membres certifiés.',
    item_count: 0, // Set to 0 to demonstrate dynamic conditional rendering!
    icon_name: 'ShoppingBag',
  },
];

export const MOCK_SYSTEM_HEALTH: SystemHealth = {
  status: 'healthy',
  uptime: '99.98% (42j 18h)',
  dokploy_cluster: 'prod-cluster-ams1 (Dokploy v0.8.2)',
  containers: [
    { name: 'afrika_backend_drf', image: 'afrika/backend:v1.4.2', status: 'running', cpu: '4.2%', memory: '248MB / 1GB' },
    { name: 'afrika_postgres_db', image: 'postgres:15-alpine', status: 'running', cpu: '2.8%', memory: '412MB / 2GB' },
    { name: 'afrika_redis_cache', image: 'redis:7-alpine', status: 'running', cpu: '0.4%', memory: '42MB / 512MB' },
    { name: 'afrika_celery_worker', image: 'afrika/backend:v1.4.2', status: 'running', cpu: '1.1%', memory: '180MB / 1GB' },
  ],
  services: [
    { name: 'Stripe Webhook Gateway', status: 'operational', latency: '42ms' },
    { name: 'PayPal IPN / Orders API', status: 'operational', latency: '110ms' },
    { name: 'PawaPay Mobile Money Gateway', status: 'operational', latency: '185ms' },
    { name: 'Firebase Cloud Messaging (FCM)', status: 'operational', latency: '65ms' },
    { name: 'Currency OpenExchange Feeder', status: 'operational', latency: '95ms' },
  ],
};
