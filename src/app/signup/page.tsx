'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup and redirect
    router.push('/booking');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleSignup}>
          <CardHeader className="text-center space-y-4 pt-8">
            <div className="mx-auto">
              <Logo size="large" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Create Account</CardTitle>
            <CardDescription className="text-lg">Join SafeRide to book your rides easily.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
             <div className="space-y-2">
              <Label htmlFor="name" className="text-md">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required className="py-6 text-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-md">Email or Phone</Label>
              <Input id="email" type="text" placeholder="you@example.com" required className="py-6 text-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-md">Choose a 4-Digit PIN</Label>
              <Input id="pin" type="password" placeholder="••••" required className="py-6 text-lg" maxLength={4} />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 p-8 pt-0">
            <Button type="submit" className="w-full py-7 text-xl font-bold transition-transform hover:scale-105">
              Sign Up
            </Button>
             <Button variant="link" size="sm" className="w-full" onClick={() => router.push('/login')}>
               Already have an account? Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
