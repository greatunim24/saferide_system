'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';

import { destinations, rideTypes } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { Separator } from '@/components/ui/separator';

export default function BookingPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [destination, setDestination] = React.useState('');
  const [rideType, setRideType] = React.useState('');

  const handleBooking = () => {
    if (destination && rideType) {
      router.push(`/confirmation?destination=${destination}&rideType=${rideType}`);
    }
  };

  const selectedDestination = destinations.find((d) => d.value === destination);

  return (
    <Card className="w-full max-w-2xl shadow-2xl">
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
                  {destination ? destinations.find((d) => d.value === destination)?.label : 'Select destination...'}
                </div>
                <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Search destination..." className="h-12 text-lg" />
                <CommandEmpty>No destination found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {destinations.map((d) => (
                      <CommandItem
                        key={d.value}
                        value={d.value}
                        onSelect={(currentValue) => {
                          setDestination(currentValue === destination ? '' : currentValue);
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

        {destination && <Separator />}

        {/* Step 2: Ride Type */}
        {destination && (
          <div className="space-y-4">
             <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold font-headline">Choose your ride</h3>
                <p className="text-muted-foreground">Select a ride that fits your needs</p>
              </div>
            </div>
            <RadioGroup
              value={rideType}
              onValueChange={setRideType}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {rideTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id}>
                    <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                    <Label
                      htmlFor={type.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Icon className="mb-3 h-12 w-12 text-primary" />
                      <p className="text-xl font-bold font-headline">{type.name}</p>
                      <p className="text-sm text-muted-foreground text-center">{type.description}</p>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Book */}
        {destination && rideType && (
          <div className="pt-4">
            <Button onClick={handleBooking} className="w-full py-8 text-2xl font-bold transition-transform hover:scale-105">
              Book Ride to {selectedDestination?.label}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
