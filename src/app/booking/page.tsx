import { Suspense } from 'react';
import BookingPageContent from './bookingPageContent';

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";