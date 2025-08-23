
import { Car, Gem, Users, CreditCard, Apple } from 'lucide-react';


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
  { id: 'uber', name: 'Uber', icon: '/assets/providers/uber.png' },
  { id: 'bolt', name: 'Bolt', icon: '/assets/providers/bolt.png' },
  { id: 'indrive', name: 'inDrive', icon: '/assets/providers/indriver_logo.png' },
  { id: 'maxima', name: 'Maxima', icon: '/assets/providers/maxim_logo.png' },
];

export const paymentMethods = [
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: CreditCard },
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
  // inDrive
  { id: 'indrive-economy', provider: 'indrive', name: 'inDrive Economy', description: 'You set the fare', icon: Car, priceMultiplier: 0.85 },
  { id: 'indrive-comfort', provider: 'indrive', name: 'inDrive Comfort', description: 'Comfortable rides at your price', icon: Gem, priceMultiplier: 1.25 },
  { id: 'indrive-xl', provider: 'indrive', name: 'inDrive XL', description: 'Large group rides, your fare', icon: Users, priceMultiplier: 1.65 },
  // Maxima
  { id: 'maxima-economy', provider: 'maxima', name: 'Maxima Economy', description: 'Cost-effective local rides', icon: Car, priceMultiplier: 0.8 },
  { id: 'maxima-comfort', provider: 'maxima', name: 'Maxima Comfort', description: 'Relax in a better car', icon: Gem, priceMultiplier: 1.2 },
  { id: 'maxima-xl', provider: 'maxima', name: 'Maxima XL', description: 'For the whole family', icon: Users, priceMultiplier: 1.6 },
];

// This is kept for the admin page, but the booking flow will use `allRides`.
export const rideTypes = [
  { id: 'economy', name: 'Economy', description: 'Affordable, everyday rides', icon: Car, priceMultiplier: 1.0 },
  { id: 'comfort', name: 'Comfort', description: 'Full-size cars with more legroom', icon: Gem, priceMultiplier: 1.4 },
  { id: 'xl', name: 'XL', description: 'Rides for groups up to 6', icon: Users, priceMultiplier: 1.8 },
];
