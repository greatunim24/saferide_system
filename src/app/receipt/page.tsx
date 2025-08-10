'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { destinations, rideTypes } from '@/lib/data';
import { ArrowLeft, Car, Gem, MapPin, Printer, User, Users, Wallet, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Skeleton } from '@/components/ui/skeleton';

function ReceiptContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const destinationValue = searchParams.get('destination');
  const rideTypeValue = searchParams.get('rideType');

  const destination = destinations.find((d) => d.value === destinationValue);
  const rideType = rideTypes.find((r) => r.id === rideTypeValue);

  if (!destination || !rideType) {
    return (
       <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle>Invalid Receipt Details</CardTitle>
          <CardDescription>The receipt details are missing or incorrect. Please start a new ride.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push('/login')} className="w-full">
            Start New Ride
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const baseFare = 15;
  const finalFare = baseFare * rideType.priceMultiplier;
  const RideIcon = rideType.id === 'standard' ? Car : rideType.id === 'premium' ? Gem : Users;

  const handlePrint = () => {
    if (isClient) {
      window.print();
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl print:shadow-none print:border-none">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex flex-col items-center gap-4 text-accent">
            <CheckCircle className="h-16 w-16" />
            <CardTitle className="text-4xl font-bold font-headline">Ride Confirmed!</CardTitle>
            <CardDescription className="text-lg">Thank you for riding with SafeRide. Here is your receipt.</CardDescription>
        </div>
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
        </div>
        <Card className="bg-primary text-primary-foreground text-center p-6">
          <CardTitle className="flex items-center justify-center gap-2 text-xl"><Wallet/> Total Fare Paid</CardTitle>
          <p className="text-5xl font-bold tracking-tighter mt-2">R{finalFare.toFixed(2)}</p>
        </Card>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 print:hidden">
        <Button variant="outline" size="lg" className="py-7 text-lg" onClick={handlePrint}>
          <Printer className="mr-2 h-5 w-5" /> Print Receipt
        </Button>
        <Button 
          size="lg" 
          className="py-7 text-lg bg-accent hover:bg-accent/90" 
          onClick={() => router.push('/login')}
        >
          New Ride
        </Button>
      </CardFooter>
    </Card>
  );
}

function ReceiptSkeleton() {
    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
                <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-6 p-8">
                <div className="space-y-4 text-lg">
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

export default function ReceiptPage() {
  return (
    <Suspense fallback={<ReceiptSkeleton/>}>
      <ReceiptContent />
    </Suspense>
  );
}
