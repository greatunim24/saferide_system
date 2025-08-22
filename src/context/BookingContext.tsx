
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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

// Inactivity timeouts in milliseconds
const LOGOUT_TIMEOUT = 10 * 1000; // 10 seconds
const APP_RESET_TIMEOUT = 40 * 1000; // 40 seconds

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [state, setState] = useState<BookingState>({
    destination: '',
    selectedProviders: [],
    selectedRide: null,
    isAuthenticated: false,
    user: null,
  });
  const router = useRouter();
  const { toast } = useToast();

  const setAuth = useCallback((isAuthenticated: boolean, user: User | null) => {
    setState((prevState) => ({ ...prevState, isAuthenticated, user }));
  }, []);

  const clearBooking = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      destination: '',
      selectedProviders: [],
      selectedRide: null,
    }));
     if (typeof window !== 'undefined') {
       try {
         const clearedState = { ...state, destination: '', selectedProviders: [], selectedRide: null };
         window.sessionStorage.setItem(BOOKING_STATE_KEY, JSON.stringify(clearedState));
       } catch (error) {
         console.error('Failed to save cleared booking state', error);
       }
     }
  }, [state]);


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

  // Inactivity timeout logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let logoutTimer: NodeJS.Timeout;
    let resetTimer: NodeJS.Timeout;

    const handleLogout = () => {
       if (state.isAuthenticated) {
          setAuth(false, null);
          toast({
            title: "Session Expired",
            description: "You have been logged out due to inactivity.",
          });
       }
    };

    const handleReset = () => {
        clearBooking();
        router.push('/booking');
         toast({
            title: "App Reset",
            description: "The booking has been cleared due to inactivity.",
        });
    }

    const resetTimers = () => {
      clearTimeout(logoutTimer);
      clearTimeout(resetTimer);
      logoutTimer = setTimeout(handleLogout, LOGOUT_TIMEOUT);
      resetTimer = setTimeout(handleReset, APP_RESET_TIMEOUT);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimers));
    
    resetTimers(); // Initialize timers

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(resetTimer);
      events.forEach(event => window.removeEventListener(event, resetTimers));
    };
  }, [state.isAuthenticated, setAuth, clearBooking, router, toast]);

  const setDestination = (destination: string) => {
    setState((prevState) => ({ ...prevState, destination, selectedRide: null })); // Reset ride when destination changes
  };

  const setSelectedProviders = (providers: string[]) => {
    setState((prevState) => ({ ...prevState, selectedProviders: providers, selectedRide: null })); // Reset ride when providers change
  };

  const setSelectedRide = (ride: string | null) => {
    setState((prevState) => ({ ...prevState, selectedRide: ride }));
  };

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
