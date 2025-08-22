'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, MapPin, Wallet, Car, User } from 'lucide-react';

import { destinations, providers, allRides, Ride } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';

const baseFare = 15; // R15 base fare

export default function BookingPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [destination, setDestination] = React.useState('');
  const [customDestination, setCustomDestination] = React.useState('');
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>([]);
  const [selectedRide, setSelectedRide] = React.useState<string | null>(null);

  const handleBooking = () => {
    const finalDestination = customDestination || destination;
    if (finalDestination && selectedRide) {
      router.push(`/confirmation?destination=${finalDestination}&rideId=${selectedRide}`);
    }
  };
  
  const displayedRides = React.useMemo(() => {
    const rides = selectedProviders.length > 0 
      ? allRides.filter(ride => selectedProviders.includes(ride.provider))
      : allRides;
    
    return rides.sort((a, b) => a.priceMultiplier - b.priceMultiplier);
  }, [selectedProviders]);

  const getDestinationLabel = () => {
    if (customDestination) return customDestination;
    if (destination) {
      return destinations.find((d) => d.value === destination)?.label;
    }
    return 'Select or type destination...';
  }

  const finalDestinationValue = customDestination || destination;
  const selectedRideData = allRides.find(r => r.id === selectedRide);
  const selectedDestination = destinations.find((d) => d.value === destination);
  const destinationLabel = customDestination || selectedDestination?.label;


  return (
    <Card className="w-full max-w-3xl shadow-2xl relative">
       <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/login')}>
            <User className="h-6 w-6" />
            <span className="sr-only">Login</span>
          </Button>
        </div>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-4xl font-bold font-headline">Book Your Ride</CardTitle>
        <CardDescription className="text-lg">Select your destination and ride preference.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Step 1: Destination */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold font-headline">Where are you going?</h3>
              <p className="text-muted-foreground">Search or select your destination</p>
            </div>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-16 text-lg"
              >
                <div className="flex items-center">
                  <MapPin className="mr-4 h-6 w-6 text-muted-foreground" />
                  {getDestinationLabel()}
                </div>
                <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0 md:w-auto">
              <Command>
                 <CommandInput 
                  placeholder="Type or select a destination..." 
                  className="h-12 text-lg" 
                  value={customDestination}
                  onValueChange={(value) => {
                    setCustomDestination(value);
                    if(destination) setDestination('');
                  }}
                />
                <CommandEmpty>No destination found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {destinations.map((d) => (
                      <CommandItem
                        key={d.value}
                        value={d.value}
                        onSelect={(currentValue) => {
                          setDestination(currentValue === destination ? '' : currentValue);
                          setCustomDestination('');
                          setOpen(false);
                        }}
                        className="py-3 text-lg"
                      >
                        <Check className={cn('mr-2 h-5 w-5', destination === d.value ? 'opacity-100' : 'opacity-0')} />
                        {d.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {finalDestinationValue && <Separator />}

        {/* Step 2: E-hailing Provider */}
        {finalDestinationValue && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold font-headline">Choose your provider</h3>
                <p className="text-muted-foreground">Select one or more to see options</p>
              </div>
            </div>
            <ToggleGroup type="multiple" value={selectedProviders} onValueChange={setSelectedProviders} className="grid grid-cols-3 gap-4">
              {providers.map((p) => {
                const ProviderIcon = p.icon;
                return (
                  <ToggleGroupItem
                    key={p.id}
                    value={p.id}
                    aria-label={`Select ${p.name}`}
                    className="flex flex-col h-24 p-4 border-2 data-[state=on]:border-primary transition-all"
                  >
                    <ProviderIcon className="h-10 w-auto" />
                    <span className="mt-2 text-lg font-semibold">{p.name}</span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        )}

        {finalDestinationValue && <Separator />}

        {/* Step 3: Ride Type */}
        {finalDestinationValue && (
          <div className="space-y-4">
             <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold font-headline">Choose your ride</h3>
                <p className="text-muted-foreground">Sorted from cheapest to most expensive</p>
              </div>
            </div>
            <RadioGroup
              value={selectedRide ?? ''}
              onValueChange={setSelectedRide}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayedRides.map((ride) => {
                const RideIcon = ride.icon;
                const ProviderIcon = providers.find(p => p.id === ride.provider)?.icon;
                const finalFare = baseFare * ride.priceMultiplier;
                
                return (
                  <div key={ride.id}>
                    <RadioGroupItem value={ride.id} id={ride.id} className="peer sr-only" />
                    <Label
                      htmlFor={ride.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                    >
                      <div className='flex justify-between w-full items-start'>
                        {ProviderIcon && <ProviderIcon className="h-6 w-auto text-muted-foreground" />}
                        <RideIcon className="h-10 w-10 text-primary" />
                      </div>
                      <p className="text-xl font-bold font-headline mt-2">{ride.name}</p>
                      <p className="text-sm text-muted-foreground text-center flex-grow">{ride.description}</p>
                      <p className="text-2xl font-bold tracking-tighter mt-2">R{finalFare.toFixed(2)}</p>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Book */}
        {finalDestinationValue && selectedRide && (
          <div className="pt-4">
            <Button onClick={handleBooking} className="w-full py-8 text-2xl font-bold transition-transform hover:scale-105">
              Book {selectedRideData?.name} to {destinationLabel}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
