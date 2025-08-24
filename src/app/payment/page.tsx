
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { allRides, destinations, providers, paymentMethods } from '@/lib/data';
import { ArrowLeft, Wallet, CreditCard, Banknote } from 'lucide-react';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/Logo';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destinationValue = searchParams.get('destination');
  const rideId = searchParams.get('rideId');
  const guestName = searchParams.get('guestName');

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Only allow 'card' and 'cash' payment methods
  const allowedPaymentMethods = paymentMethods.filter((m) => m.id === 'card' || m.id === 'cash');

  // Icon mapping for payment methods
  const paymentIcons: Record<string, React.ElementType> = {
    card: CreditCard,
    cash: Banknote,
  };

  const ride = useMemo(() => allRides.find((r) => r.id === rideId), [rideId]);
  const destination = useMemo(() => destinations.find((d) => d.value === destinationValue), [destinationValue]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!destination || !ride || isLoading) {
    return <PaymentSkeleton />;
  }

  const baseFare = 15;
  const finalFare = baseFare * ride.priceMultiplier;

  // Provider and icons
  const provider = providers.find((p) => p.id === ride.provider);
  const providerIconPath = provider?.icon;
  const RideIcon = ride.icon;

  const handleProceedToReceipt = () => {
    const params = new URLSearchParams({
      destination: destinationValue!,
      rideId: rideId!,
      payment: paymentMethod!,
      fare: finalFare.toFixed(2),
    });
    if (guestName) {
      params.append('guestName', guestName);
    }
    router.push(`/receipt?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-4xl font-bold font-headline">Confirm Payment</CardTitle>
        <CardDescription className="text-lg">Please select your payment method.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Ride details */}
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">From</span>
            <span>Current Location</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">To</span>
            <span>{destination.label}</span>
          </div>
          {guestName && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2">Rider</span>
                <span>{guestName}</span>
              </div>
            </>
          )}
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">Provider</span>
            <span className="flex items-center gap-2 font-semibold">{provider?.name} {providerIconPath && (<img src={providerIconPath} alt={provider?.name} style={{height: 24, width: 'auto', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle'}} />)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">Ride Type</span>
            <span className="flex items-center gap-2 font-semibold"><RideIcon className="h-6 w-6 text-primary" /> {ride.name}</span>
          </div>
          
        </div>

        

        <div>
          <h3 className="text-2xl font-semibold font-headline mb-4 flex items-center gap-2"><CreditCard /> Payment Method</h3>
          <RadioGroup value={paymentMethod ?? ''} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
            {allowedPaymentMethods.map((method) => {
              const Icon = paymentIcons[method.id] || CreditCard;
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

        <Separator />

        <Card className="bg-primary text-primary-foreground text-center p-6">
          <CardTitle className="flex items-center justify-center gap-2 text-xl"><Wallet/> Price to Pay</CardTitle>
          <p className="text-5xl font-bold tracking-tighter mt-2">R{finalFare.toFixed(2)}</p>
        </Card>

        <Separator />

      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg" className="py-7 text-lg" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          size="lg"
          className="py-7 text-lg transition-transform hover:scale-105"
          disabled={!paymentMethod}
          onClick={handleProceedToReceipt}
        >
          Confirm & Book
        </Button>
      </CardFooter>
    </Card>
  );
}

function PaymentSkeleton() {
    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
                <Skeleton className="h-16 w-48 mx-auto mb-4" />
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-6 p-8">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-32 w-full" />
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </CardFooter>
        </Card>
    )
}


export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentSkeleton />}>
      <PaymentContent />
    </Suspense>
  );
}