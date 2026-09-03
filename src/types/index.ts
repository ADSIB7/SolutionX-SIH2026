export type Language = 'en' | 'hi' | 'mr';

export interface SubService {
  id: string;
  name: string;
  basePrice: number;
  timeEst: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  iconName: 'Zap' | 'Droplet' | 'Sparkles' | 'Hammer' | 'Paintbrush' | 'Wrench' | 'LayoutGrid';
  description: string;
  hindiDescription: string;
  marathiDescription: string;
  minPrice: number;
  turnaround: string;
  popularTag?: string;
  guarantee: string;
  activeWorkers: number;
  subServices: SubService[];
}

export interface WorkerMember {
  id: string;
  name: string;
  trade: string;
  coopRole: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  location: string;
  experienceYears: number;
  dividendEarned: number;
  badge: string;
  image: string;
  quote: string;
}

export interface CooperativeStat {
  id: string;
  value: string;
  numericVal: number;
  label: string;
  hindiLabel: string;
  marathiLabel: string;
  description: string;
  icon: string;
  trend: string;
}

export interface ComparisonItem {
  feature: string;
  cooperative: string;
  traditional: string;
  isHighlight?: boolean;
}

export interface SearchState {
  serviceId: string;
  location: string;
  date: string;
  timeSlot: string;
}

export type ModalType = 'none' | 'booking' | 'worker-join' | 'login' | 'charter';
