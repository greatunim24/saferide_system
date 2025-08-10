import { Car, Gem, Users, MapPin } from 'lucide-react';

export const destinations = [
  { value: 'airport', label: 'City Airport (AIR)' },
  { value: 'downtown', label: 'Downtown Central Station' },
  { value: 'mall', label: 'Grand Shopping Mall' },
  { value: 'stadium',label: 'National Sports Stadium' },
  { value: 'university', label: 'Metropolis University' },
  { value: 'techpark', label: 'Innovatech Tech Park' },
  { value: 'museum', label: 'Museum of Modern Art' },
];

export const rideTypes = [
  { id: 'standard', name: 'Standard', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'premium', name: 'Premium', description: 'High-end cars, top drivers', icon: Gem, priceMultiplier: 1.8 },
  { id: 'shared', name: 'Shared', description: 'Share with others, save money', icon: Users, priceMultiplier: 0.7 },
];
