
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  phone: string;
};

type BookingState = {
  destination: string;
  selectedProviders: string[];
  selectedRide: string | null;
  isAuthenticated: boolean;
  user: User | null;
};

type BookingContextType = {
  destination: string;
  setDestination: (destination: string) => void;
  selectedProviders: string[];
  setSelectedProviders: (providers: string[]) => void;
  selectedRide: string | null;
  setSelectedRide: (ride: string | null) => void;
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (isAuthenticated: boolean, user: User | null) => void;
  clearBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const BOOKING_STATE_KEY = 'safeRideBookingState';

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [state, setState] = useState<BookingState>({
    destination: '',
    selectedProviders: [],
    selectedRide: null,
    isAuthenticated: false,
    user: null,
  });

  // Load state from sessionStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedState = window.sessionStorage.getItem(BOOKING_STATE_KEY);
        if (savedState) {
          setState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Failed to parse booking state from session storage', error);
      }
      setIsInitialLoad(false);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (!isInitialLoad && typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(BOOKING_STATE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save booking state to session storage', error);
      }
    }
  }, [state, isInitialLoad]);

  const setDestination = (destination: string) => {
    setState((prevState) => ({ ...prevState, destination, selectedRide: null })); // Reset ride when destination changes
  };

  const setSelectedProviders = (providers: string[]) => {
    setState((prevState) => ({ ...prevState, selectedProviders: providers, selectedRide: null })); // Reset ride when providers change
  };

  const setSelectedRide = (ride: string | null) => {
    setState((prevState) => ({ ...prevState, selectedRide: ride }));
  };

  const setAuth = (isAuthenticated: boolean, user: User | null) => {
    setState((prevState) => ({ ...prevState, isAuthenticated, user }));
  };

  const clearBooking = () => {
    // Keep auth state, clear only booking details
    setState((prevState) => ({
      ...prevState,
      destination: '',
      selectedProviders: [],
      selectedRide: null,
    }));
     // Overwrite session storage with the cleared booking but preserved auth state
     if (typeof window !== 'undefined') {
       try {
         const clearedState = { ...state, destination: '', selectedProviders: [], selectedRide: null };
         window.sessionStorage.setItem(BOOKING_STATE_KEY, JSON.stringify(clearedState));
       } catch (error) {
         console.error('Failed to save cleared booking state', error);
       }
     }
  }

  const contextValue = {
    ...state,
    setDestination,
    setSelectedProviders,
    setSelectedRide,
    setAuth,
    clearBooking,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

    