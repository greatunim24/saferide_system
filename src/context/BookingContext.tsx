
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type BookingState = {
  destination: string;
  selectedProviders: string[];
  selectedRide: string | null;
};

type BookingContextType = {
  destination: string;
  setDestination: (destination: string) => void;
  selectedProviders: string[];
  setSelectedProviders: (providers: string[]) => void;
  selectedRide: string | null;
  setSelectedRide: (ride: string | null) => void;
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

  const clearBooking = () => {
    setState({
        destination: '',
        selectedProviders: [],
        selectedRide: null,
    });
     if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(BOOKING_STATE_KEY);
     }
  }

  const contextValue = {
    ...state,
    setDestination,
    setSelectedProviders,
    setSelectedRide,
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
