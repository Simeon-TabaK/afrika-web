import type { CertificationType, SupportedCurrency } from '../types';

export interface BuyerInquiryModel {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerAvatar?: string;
  buyerCertification: CertificationType;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
}

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: SupportedCurrency;
  sellerName: string;
  sellerEmail: string;
  sellerCertification: CertificationType;
  category: string;
  communityName: string;
  subgroupName: string;
  images: string[];
  status: 'active' | 'pending_review' | 'out_of_stock' | 'flagged';
  viewsCount: number;
  inquiriesCount: number;
  inquiries: BuyerInquiryModel[];
  createdAt: string;
}
