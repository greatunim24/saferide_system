'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { destinations, rideTypes } from '@/lib/data';
import { ArrowLeft, Car, Gem, MapPin, User, Users, Wallet } from 'lucide-react';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/Logo';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationValue = searchParams.get('destination');
  const rideTypeValue = searchParams.get('rideType');

  const destination = destinations.find((d) => d.value === destinationValue);
  const rideType = rideTypes.find((r) => r.id === rideTypeValue);

  if (!destination || !rideType) {
    return (
       <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle>Invalid Ride Details</CardTitle>
          <CardDescription>The ride details are missing or incorrect. Please go back and try again.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push('/booking')} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const baseFare = 15; // A mock base fare
  const finalFare = baseFare * rideType.priceMultiplier;

  const driver = {
    name: 'John D.',
    plate: '5F-387',
    rating: 4.9,
  };
  
  const RideIcon = rideType.id === 'standard' ? Car : rideType.id === 'premium' ? Gem : Users;

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-4xl font-bold font-headline">Confirm Your Ride</CardTitle>
        <CardDescription className="text-lg">Please review the details below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><MapPin className="text-muted-foreground"/> Destination</span>
            <span>{destination.label}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><RideIcon className="text-muted-foreground"/> Ride Type</span>
            <span>{rideType.name}</span>
          </div>
           <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><User className="text-muted-foreground"/> Driver</span>
            <span>{driver.name} ({driver.rating} ★)</span>
          </div>
           <Separator />
           <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><Car className="text-muted-foreground"/> License Plate</span>
            <span className="font-mono bg-muted px-2 py-1 rounded-md">{driver.plate}</span>
          </div>
        </div>
        <Card className="bg-primary text-primary-foreground text-center p-6">
          <CardTitle className="flex items-center justify-center gap-2 text-xl"><Wallet/> Estimated Fare</CardTitle>
          <p className="text-5xl font-bold tracking-tighter mt-2">R{finalFare.toFixed(2)}</p>
        </Card>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg" className="py-7 text-lg" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button 
          size="lg" 
          className="py-7 text-lg transition-transform hover:scale-105" 
          onClick={() => router.push(`/receipt?destination=${destinationValue}&rideType=${rideTypeValue}`)}
        >
          Confirm Ride
        </Button>
      </CardFooter>
    </Card>
  );
}

function ConfirmationSkeleton() {
    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
                <Skeleton className="h-16 w-48 mx-auto mb-4" />
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-6 p-8">
                <div className="space-y-4 text-lg">
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                </div>
                 <Skeleton className="h-32 w-full" />
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </CardFooter>
        </Card>
    )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationSkeleton />}>
      <ConfirmationContent />
    </Suspense>
  );
}
