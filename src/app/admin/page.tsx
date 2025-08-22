
'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { destinations, rideTypes } from "@/lib/data";
import { Car, Gem, MapPin, Users, PlusCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const rideTypeIcons: { [key: string]: React.ElementType } = {
  standard: Car,
  premium: Gem,
  shared: Users,
};

export default function AdminPage() {
  const router = useRouter();
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
       <Button variant="outline" onClick={() => router.push('/booking')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4"/> Back to App
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Admin Panel</CardTitle>
          <CardDescription>Manage destinations and ride types for the SafeRide app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="destinations">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="rideTypes">Ride Types</TabsTrigger>
            </TabsList>

            <TabsContent value="destinations" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manage Destinations</CardTitle>
                    <CardDescription>Add or edit available destinations.</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><PlusCircle className="mr-2 h-4 w-4"/> Add Destination</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Destination</DialogTitle>
                        <DialogDescription>Enter the details for the new destination.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dest-name" className="text-right">Name</Label>
                          <Input id="dest-name" value="New Place" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save (Mock)</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Icon</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>Value Key</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {destinations.map((dest) => (
                        <TableRow key={dest.value}>
                          <TableCell><MapPin className="h-5 w-5 text-muted-foreground" /></TableCell>
                          <TableCell className="font-medium">{dest.label}</TableCell>
                          <TableCell className="font-mono">{dest.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rideTypes" className="mt-4">
               <Card>
                <CardHeader>
                  <CardTitle>Manage Ride Types</CardTitle>
                  <CardDescription>View and manage ride type properties.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price Multiplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rideTypes.map((type) => {
                        const Icon = rideTypeIcons[type.id] || Car;
                        return(
                          <TableRow key={type.id}>
                            <TableCell><Icon className="h-5 w-5 text-muted-foreground" /></TableCell>
                            <TableCell className="font-medium">{type.name}</TableCell>
                            <TableCell>{type.description}</TableCell>
                            <TableCell className="text-right font-mono">{type.priceMultiplier.toFixed(2)}x</TableCell>
                          </TableRow>
                        )
                       })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
