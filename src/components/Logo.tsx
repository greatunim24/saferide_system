import { ShieldCheck } from 'lucide-react';
import React from 'react';

export function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const isLarge = size === 'large';
  return (
    <div className="flex items-center justify-center gap-3 text-primary select-none">
      <ShieldCheck className={isLarge ? "h-12 w-12" : "h-8 w-8"} />
      <h1 className={`font-headline font-bold tracking-tighter ${isLarge ? 'text-5xl' : 'text-3xl'}`}>
        SafeRide
      </h1>
    </div>
  );
}
