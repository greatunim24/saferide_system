import { Car, Gem, Users, MapPin } from 'lucide-react';
import { Uber, Bolt, Didi } from '@/components/ProviderIcons';

export const destinations = [
  { value: 'airport', label: 'City Airport (AIR)' },
  { value: 'downtown', label: 'Downtown Central Station' },
  { value: 'mall', label: 'Grand Shopping Mall' },
  { value: 'stadium',label: 'National Sports Stadium' },
  { value: 'university', label: 'Metropolis University' },
  { value: 'techpark', label: 'Innovatech Tech Park' },
  { value: 'museum', label: 'Museum of Modern Art' },
];

export const providers = [
  { id: 'uber', name: 'Uber', icon: Uber },
  { id: 'bolt', name: 'Bolt', icon: Bolt },
  { id: 'didi', name: 'Didi', icon: Didi },
];

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
  { id: 'uber-x', provider: 'uber', name: 'UberX', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'uber-black', provider: 'uber', name: 'Uber Black', description: 'Premium rides in luxury cars', icon: Gem, priceMultiplier: 1.8 },
  { id: 'uber-share', provider: 'uber', name: 'Uber Share', description: 'Share your ride and save', icon: Users, priceMultiplier: 0.7 },
  // Bolt
  { id: 'bolt-standard', provider: 'bolt', name: 'Bolt', description: 'The quick and affordable option', icon: Car, priceMultiplier: 0.95 },
  { id: 'bolt-premium', provider: 'bolt', name: 'Bolt Premium', description: 'Executive cars for your comfort', icon: Gem, priceMultiplier: 1.7 },
  { id: 'bolt-share', provider: 'bolt', name: 'Bolt Share', description: 'Eco-friendly shared rides', icon: Users, priceMultiplier: 0.65 },
  // Didi
  { id: 'didi-express', provider: 'didi', name: 'Didi Express', description: 'Standard rides for your daily needs', icon: Car, priceMultiplier: 0.9 },
  { id: 'didi-max', provider: 'didi', name: 'Didi Max', description: 'Spacious cars for groups', icon: Users, priceMultiplier: 1.2 },
  { id: 'didi-premium', provider: 'didi', name: 'Didi Premium', description: 'Travel in style and comfort', icon: Gem, priceMultiplier: 1.75 },
];

// This is kept for the admin page, but the booking flow will use `allRides`.
export const rideTypes = [
  { id: 'standard', name: 'Standard', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'premium', name: 'Premium', description: 'High-end cars, top drivers', icon: Gem, priceMultiplier: 1.8 },
  { id: 'shared', name: 'Shared', description: 'Share with others, save money', icon: Users, priceMultiplier: 0.7 },
];
