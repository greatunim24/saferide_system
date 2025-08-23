
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { allRides, destinations, providers, paymentMethods } from '@/lib/data';
import { ArrowLeft, Car, User, Wallet, Building, MapPin, CreditCard, Users } from 'lucide-react';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/Logo';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destinationValue = searchParams.get('destination');
  const rideId = searchParams.get('rideId');
  const guestName = searchParams.get('guestName');

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [bookingToken, setBookingToken] = useState<string | null>(null);

  useEffect(() => {
    // Generate token only on the client-side to prevent hydration errors
    const token = Math.floor(10000 + Math.random() * 90000).toString();
    setBookingToken(token);
  }, []);


  const destinationLabel = useMemo(() => {
    const predefined = destinations.find((d) => d.value === destinationValue);
    return predefined?.label || destinationValue;
  }, [destinationValue]);

  const ride = allRides.find((r) => r.id === rideId);
  const provider = providers.find((p) => p.id === ride?.provider);

  if (!destinationLabel || !ride || !provider) {
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

  const baseFare = 15;
  const finalFare = baseFare * ride.priceMultiplier;

  const driver = {
    name: 'Jonga S.',
    plate: 'CA 987-654',
    rating: 4.9,
  };
  
  const RideIcon = ride.icon;
  const providerIconPath = provider.icon;

  const handleConfirmAndPay = () => {
    const params = new URLSearchParams({
        destination: destinationValue,
        rideId: rideId,
        token: bookingToken!,
        payment: paymentMethod!,
        driverName: driver.name,
    });
    if (guestName) {
      params.append('guestName', guestName);
    }

    router.push(`/receipt?${params.toString()}`);
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-4xl font-bold font-headline">Confirm Your Ride</CardTitle>
        <CardDescription className="text-lg">Please review the details and confirm payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div className="p-4 border-2 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground font-semibold">Your Booking Token</p>
          {bookingToken ? (
             <p className="text-4xl font-bold tracking-widest text-primary font-mono">{bookingToken}</p>
          ) : (
            <Skeleton className="h-10 w-48 mx-auto mt-1" />
          )}
        </div>
        
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><MapPin className="text-muted-foreground"/> From</span>
            <span>Current Location</span>
          </div>
           <Separator />
           <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><MapPin className="text-muted-foreground"/> To</span>
            <span>{destinationLabel}</span>
          </div>
        </div>

        <Separator />
        
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><Building className="text-muted-foreground"/> Provider</span>
            <span className="flex items-center gap-2 font-semibold">{provider.name} <img src={providerIconPath} alt={provider.name} style={{height: 24, width: 'auto', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle'}} /></span>
          </div>
           <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><RideIcon className="text-muted-foreground"/> Ride Type</span>
            <span>{ride.name}</span>
          </div>
           <Separator />
           {guestName && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2"><Users className="text-muted-foreground"/> Rider</span>
                <span>{guestName}</span>
              </div>
              <Separator />
            </>
           )}
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><User className="text-muted-foreground"/> Driver</span>
            <span>
              {driver.name} ({driver.rating} <span className="text-yellow-400">★</span>)
            </span>
          </div>
           <Separator />
           <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2"><Car className="text-muted-foreground"/> License Plate</span>
            <span className="font-mono bg-muted px-2 py-1 rounded-md">{driver.plate}</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-2xl font-semibold font-headline mb-4 flex items-center gap-2"><CreditCard /> Payment Method</h3>
          <RadioGroup value={paymentMethod ?? ''} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id}>
                    <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                    <Label
                      htmlFor={method.id}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-24"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                      <p className="text-lg font-semibold mt-2">{method.name}</p>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
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
          disabled={!paymentMethod || !bookingToken}
          onClick={handleConfirmAndPay}
        >
          Confirm & Pay
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
                <Skeleton className="h-20 w-full" />
                <div className="space-y-4 text-lg">
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                    <Skeleton className="h-8 w-full" />
                    <Separator/>
                     <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
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
