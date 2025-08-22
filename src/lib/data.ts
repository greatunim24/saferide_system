
import { Car, Gem, Users, CreditCard, Landmark, Apple } from 'lucide-react';
import { Uber, Bolt, Didi } from '@/components/ProviderIcons';

export const destinations = [
  { value: 'uwc-innovation-hub', label: 'UWC Innovation Hub' },
  { value: 'cput-bellville', label: 'CPUT Bellville Campus' },
  { value: 'sanlam-parow', label: 'Sanlam Center Parow' },
  { value: 'cpt-airport', label: 'Cape Town International Airport (CPT)' },
  { value: 'va-waterfront', label: 'V&A Waterfront' },
  { value: 'table-mountain', label: 'Table Mountain Cableway' },
  { value: 'kirstenbosch', label: 'Kirstenbosch Gardens' },
  { value: 'camps-bay', label: 'Camps Bay Beach' },
  { value: 'ct-icc', label: 'Cape Town International Convention Centre' },
  { value: 'boulders-beach', label: 'Boulders Beach Penguin Colony' },
];

export const providers = [
  { id: 'uber', name: 'Uber', icon: Uber },
  { id: 'bolt', name: 'Bolt', icon: Bolt },
  { id: 'didi', name: 'Didi', icon: Didi },
];

export const paymentMethods = [
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: Landmark },
    { id: 'apple-pay', name: 'Apple Pay', icon: Apple },
]

export type Ride = {
  id: string;
  provider: string;
  name: string;
  description: string;
  icon: React.ElementType;
  priceMultiplier: number;
};

export const allRides: Ride[] = [
  // Uber
  { id: 'uber-economy', provider: 'uber', name: 'Uber Economy', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'uber-comfort', provider: 'uber', name: 'Uber Comfort', description: 'Newer cars with more legroom', icon: Gem, priceMultiplier: 1.4 },
  { id: 'uber-xl', provider: 'uber', name: 'Uber XL', description: 'Rides for groups up to 6', icon: Users, priceMultiplier: 1.8 },
  // Bolt
  { id: 'bolt-economy', provider: 'bolt', name: 'Bolt Economy', description: 'The quick and affordable option', icon: Car, priceMultiplier: 0.95 },
  { id: 'bolt-comfort', provider: 'bolt', name: 'Bolt Comfort', description: 'Executive cars for your comfort', icon: Gem, priceMultiplier: 1.35 },
  { id: 'bolt-xl', provider: 'bolt', name: 'Bolt XL', description: 'For when you need more space', icon: Users, priceMultiplier: 1.7 },
  // Didi
  { id: 'didi-economy', provider: 'didi', name: 'Didi Economy', description: 'Standard rides for your daily needs', icon: Car, priceMultiplier: 0.9 },
  { id: 'didi-comfort', provider: 'didi', name: 'Didi Comfort', description: 'Travel in style and comfort', icon: Gem, priceMultiplier: 1.3 },
  { id: 'didi-xl', provider: 'didi', name: 'Didi XL', description: 'Spacious cars for groups', icon: Users, priceMultiplier: 1.75 },
];

// This is kept for the admin page, but the booking flow will use `allRides`.
export const rideTypes = [
  { id: 'economy', name: 'Economy', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'comfort', name: 'Comfort', description: 'Full-size cars with more legroom', icon: Gem, priceMultiplier: 1.4 },
  { id: 'xl', name: 'XL', description: 'Rides for groups up to 6', icon: Users, priceMultiplier: 1.8 },
];
