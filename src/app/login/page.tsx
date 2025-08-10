'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    router.push('/booking');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto">
              <Logo size="large" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
            <CardDescription className="text-lg">Enter your credentials to book a ride.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-md">Email or Phone</Label>
              <Input id="email" type="text" placeholder="you@example.com" required className="py-6 text-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-md">PIN</Label>
              <Input id="pin" type="password" placeholder="••••" required className="py-6 text-lg" maxLength={4} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full py-7 text-xl font-bold transition-transform hover:scale-105">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
